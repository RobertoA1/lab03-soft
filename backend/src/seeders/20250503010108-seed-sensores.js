'use strict';

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'agrotech-jwt-secret-dev';

function signSensorToken(sensorId, tipo, loteId) {
  return jwt.sign(
    { sub: sensorId, tipo, loteId },
    JWT_SECRET,
    { audience: 'sensor', expiresIn: '3650d' },
  );
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Cada fila debe coincidir con el id auto-asignado. Si la tabla está
    // vacía, los ids serán 1..N en el orden insertado.
    const seeds = [
      { id: 1, lote_id: 1, tipo: 'clima', fabricante: 'AgroSense', modelo: 'CL-2200', numero_serie: 'CL-2200-NORTE-001', firmware: '1.4.2' },
      { id: 2, lote_id: 1, tipo: 'suelo', fabricante: 'AgroSense', modelo: 'SO-110', numero_serie: 'SO-110-NORTE-001', firmware: '2.0.1' },
      { id: 3, lote_id: 2, tipo: 'clima', fabricante: 'Davis Instruments', modelo: 'Vantage Pro2', numero_serie: 'VP2-SUR-001', firmware: '3.12' },
      { id: 4, lote_id: 2, tipo: 'riego', fabricante: 'Netafim', modelo: 'NetBeat-IR', numero_serie: 'NB-IR-SUR-001', firmware: '5.0.3' },
      { id: 5, lote_id: 3, tipo: 'suelo', fabricante: 'Teralytic', modelo: 'TPS-3', numero_serie: 'TPS-3-ESTE-001', firmware: '1.1.0' },
    ];

    const now = new Date();
    const rows = seeds.map((s) => ({
      id: s.id,
      lote_id: s.lote_id,
      tipo: s.tipo,
      fabricante: s.fabricante,
      modelo: s.modelo,
      numero_serie: s.numero_serie,
      firmware: s.firmware,
      fecha_instalacion: '2025-03-01',
      activo: true,
      token: signSensorToken(s.id, s.tipo, s.lote_id),
      created_at: now,
      updated_at: now,
    }));

    await queryInterface.bulkInsert('sensores', rows, {});
    // eslint-disable-next-line no-console
    console.log('\n=== Sensores seedeados ===');
    for (const r of rows) {
      // eslint-disable-next-line no-console
      console.log(`#${r.id} ${r.tipo} (lote=${r.lote_id}) token=${r.token}`);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sensores', null, {});
  },
};
