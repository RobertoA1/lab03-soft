'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('riego', [
      { lote_id: 1, fecha: '2025-04-18', tipo_riego: 'Goteo', volumen_aplicado_l: 12500, duracion_horas: 4.5, presion_bar: 2.1, created_at: new Date(), updated_at: new Date() },
      { lote_id: 2, fecha: '2025-04-19', tipo_riego: 'Pivote Central', volumen_aplicado_l: 28000, duracion_horas: 2.0, presion_bar: 1.8, created_at: new Date(), updated_at: new Date() },
      { lote_id: 3, fecha: '2025-04-17', tipo_riego: 'Aspersión', volumen_aplicado_l: 15000, duracion_horas: 3.0, presion_bar: 2.5, created_at: new Date(), updated_at: new Date() },
      { lote_id: 4, fecha: '2025-04-16', tipo_riego: 'Goteo', volumen_aplicado_l: 11000, duracion_horas: 5.0, presion_bar: 2.0, created_at: new Date(), updated_at: new Date() },
      { lote_id: 1, fecha: '2025-04-10', tipo_riego: 'Goteo', volumen_aplicado_l: 13000, duracion_horas: 5.0, presion_bar: 2.2, created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('riego', null, {});
  }
};
