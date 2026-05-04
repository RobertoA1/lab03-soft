'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const records = [];
    const lotes = [1, 2, 3, 4];
    const baseDate = new Date('2025-04-01');
    for (let l = 0; l < lotes.length; l++) {
      for (let d = 0; d < 15; d++) {
        const date = new Date(baseDate);
        date.setDate(date.getDate() - d);
        records.push({
          lote_id: lotes[l],
          fecha: date.toISOString().split('T')[0],
          temp_max: 24 + Math.random() * 10,
          temp_min: 12 + Math.random() * 6,
          precipitacion: Math.random() > 0.6 ? Math.round(Math.random() * 25 * 10) / 10 : 0,
          humedad_relativa: 55 + Math.random() * 30,
          radiacion_solar: 18 + Math.random() * 8,
          velocidad_viento: 8 + Math.random() * 12,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert('clima', records, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clima', null, {});
  }
};
