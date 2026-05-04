'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('suelo', [
      { lote_id: 1, fecha: '2025-04-20', humedad: 38.5, ph: 6.2, nitrogeno_disponible: 22.4, fosforo_disponible: 15.8, conductividad_electrica: 1.2, created_at: new Date(), updated_at: new Date() },
      { lote_id: 2, fecha: '2025-04-20', humedad: 42.0, ph: 5.8, nitrogeno_disponible: 18.1, fosforo_disponible: 12.3, conductividad_electrica: 0.9, created_at: new Date(), updated_at: new Date() },
      { lote_id: 3, fecha: '2025-04-20', humedad: 35.2, ph: 6.5, nitrogeno_disponible: 25.0, fosforo_disponible: 18.5, conductividad_electrica: 1.1, created_at: new Date(), updated_at: new Date() },
      { lote_id: 4, fecha: '2025-04-20', humedad: 31.0, ph: 5.5, nitrogeno_disponible: 14.2, fosforo_disponible: 10.1, conductividad_electrica: 1.5, created_at: new Date(), updated_at: new Date() },
      { lote_id: 1, fecha: '2025-03-15', humedad: 45.0, ph: 6.3, nitrogeno_disponible: 24.0, fosforo_disponible: 16.5, conductividad_electrica: 1.0, created_at: new Date(), updated_at: new Date() },
      { lote_id: 2, fecha: '2025-03-15', humedad: 48.2, ph: 5.9, nitrogeno_disponible: 19.5, fosforo_disponible: 13.0, conductividad_electrica: 0.8, created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('suelo', null, {});
  }
};
