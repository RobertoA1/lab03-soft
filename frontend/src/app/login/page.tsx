'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/lib/trpc';

export default function LoginPage() {
  const [email, setEmail] = useState('agronomo@agrotech.com');
  const [password, setPassword] = useState('agrotech2025');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const setAuth = (data: { access_token: string; user: any }) => {
    localStorage.setItem('agrotech-token', data.access_token);
    localStorage.setItem('agrotech-user', JSON.stringify(data.user));
    document.cookie = `agrotech-token=${data.access_token}; path=/; max-age=86400`;
  };

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess(data) {
      setAuth(data);
      router.push('/');
    },
    onError(err) {
      setError(err.message);
    },
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess(data) {
      setAuth(data);
      router.push('/');
    },
    onError(err) {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'login') {
      loginMutation.mutate({ email, password });
    } else {
      registerMutation.mutate({ email, password, nombre });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800">
          AgroTech {mode === 'login' ? 'Iniciar Sesión' : 'Registro'}
        </h1>
        {error && <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" />
          </div>
          <button type="submit" disabled={loginMutation.isPending || registerMutation.isPending} className="w-full rounded bg-emerald-600 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">
            {mode === 'login' ? 'Ingresar' : 'Registrarse'}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          {mode === 'login' ? (
            <button onClick={() => setMode('register')} className="text-emerald-600 hover:underline">¿No tienes cuenta? Regístrate</button>
          ) : (
            <button onClick={() => setMode('login')} className="text-emerald-600 hover:underline">¿Ya tienes cuenta? Inicia sesión</button>
          )}
        </div>
      </div>
    </div>
  );
}
