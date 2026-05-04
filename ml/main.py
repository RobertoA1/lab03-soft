from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, VotingRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import joblib
from pathlib import Path

app = FastAPI(title="AgroTech ML Service", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

CULTIVO_MAP = {"Soja": 0, "Maíz": 1, "Trigo": 2, "Girasol": 3}
BASE_REND = {"Soja": 3.8, "Maíz": 9.0, "Trigo": 4.2, "Girasol": 2.8}
MODEL_PATH = Path(__file__).parent / "ensemble_model.pkl"


def _generate_synthetic_data(n=800, seed=42):
    rng = np.random.default_rng(seed)
    records = []
    for _ in range(n):
        cultivo = rng.choice(list(CULTIVO_MAP.keys()))
        humedad = rng.uniform(15, 65)
        ph = rng.uniform(4.5, 8.5)
        nitrogeno = rng.uniform(5, 50)
        fosforo = rng.uniform(5, 40)
        temp_max = rng.uniform(24, 42)
        temp_min = temp_max - rng.uniform(5, 15)
        precip = rng.uniform(0, 400)
        superficie = rng.uniform(1, 50)

        base = BASE_REND[cultivo]
        ajuste = 0.0
        if humedad < 35:
            ajuste -= 0.4 * (35 - humedad) / 35
        elif humedad > 70:
            ajuste -= 0.1
        if 6.0 <= ph <= 7.0:
            ajuste += 0.1
        elif ph < 5.5 or ph > 7.8:
            ajuste -= 0.2
        if nitrogeno < 20:
            ajuste -= 0.15
        elif nitrogeno > 30:
            ajuste += 0.08
        if temp_max > 36:
            ajuste -= 0.1
        if precip < 50:
            ajuste -= 0.1
        elif precip > 250:
            ajuste -= 0.05

        rend = base * (1 + ajuste) + rng.normal(0, 0.15)
        rend = max(0.5, rend)
        records.append({
            "cultivo": CULTIVO_MAP[cultivo],
            "humedad": humedad,
            "ph": ph,
            "nitrogeno": nitrogeno,
            "fosforo": fosforo,
            "temp_max": temp_max,
            "temp_min": temp_min,
            "precip": precip,
            "superficie": superficie,
            "rend": rend,
        })
    return pd.DataFrame(records)


def _train_and_save():
    df = _generate_synthetic_data()
    X = df.drop(columns=["rend"])
    y = df["rend"]

    rf = RandomForestRegressor(n_estimators=120, random_state=42, n_jobs=-1)
    gb = GradientBoostingRegressor(n_estimators=100, learning_rate=0.08, random_state=42)
    ensemble = VotingRegressor([("rf", rf), ("gb", gb)])

    pipe = Pipeline([("scaler", StandardScaler()), ("ensemble", ensemble)])
    pipe.fit(X, y)
    joblib.dump(pipe, MODEL_PATH)
    return pipe


def _get_model():
    if MODEL_PATH.exists():
        return joblib.load(MODEL_PATH)
    return _train_and_save()


model = _get_model()


class PredInput(BaseModel):
    humedad: float
    ph: float
    nitrogeno: float
    fosforo: float
    temp_max_prom: float
    temp_min_prom: float
    precipitacion_total: float
    cultivo: str
    superficie_ha: Optional[float] = 1.0


class PredOutput(BaseModel):
    rendimiento_pred_tn_ha: float
    confianza: float
    factores_principales: list[str]


def _explain(inp: PredInput) -> list[str]:
    factores = []
    if inp.humedad < 35:
        factores.append(f"Déficit hídrico (humedad={inp.humedad:.1f}%)")
    elif inp.humedad > 70:
        factores.append("Exceso de humedad")
    if inp.ph < 5.5 or inp.ph > 7.8:
        factores.append(f"pH subóptimo ({inp.ph:.2f})")
    if inp.nitrogeno < 20:
        factores.append(f"N disponible bajo ({inp.nitrogeno:.1f} ppm)")
    if inp.temp_max_prom > 36:
        factores.append(f"Estrés térmico (Tmax prom={inp.temp_max_prom:.1f}°C)")
    if inp.precipitacion_total < 50:
        factores.append("Precipitación acumulada baja")
    if not factores:
        factores.append("Condiciones normales de cultivo")
    return factores[:3]


def predecir_rendimiento(inp: PredInput) -> PredOutput:
    cultivo_code = CULTIVO_MAP.get(inp.cultivo, 0)
    X = pd.DataFrame([{
        "cultivo": cultivo_code,
        "humedad": inp.humedad,
        "ph": inp.ph,
        "nitrogeno": inp.nitrogeno,
        "fosforo": inp.fosforo,
        "temp_max": inp.temp_max_prom,
        "temp_min": inp.temp_min_prom,
        "precip": inp.precipitacion_total,
        "superficie": inp.superficie_ha or 1.0,
    }])
    pred = float(model.predict(X)[0])
    pred = round(max(0.5, pred), 2)
    factores = _explain(inp)
    n_factores = len([f for f in factores if f != "Condiciones normales de cultivo"])
    confianza = round(max(0.60, min(0.95, 0.85 - 0.05 * n_factores)), 2)
    return PredOutput(rendimiento_pred_tn_ha=pred, confianza=confianza, factores_principales=factores)


@app.get("/health")
def health():
    return {"status": "ok", "service": "agrotech-ml", "model": "ensemble-v1.1"}


@app.post("/predict/rendimiento", response_model=PredOutput)
def predict_rendimiento(inp: PredInput):
    return predecir_rendimiento(inp)


@app.post("/predict/batch")
def predict_batch(inputs: list[PredInput]):
    return [predecir_rendimiento(i) for i in inputs]
