'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cultivos', [
      { nombre: 'Soja', variedad: 'DM 48.21', fecha_siembra: '2024-10-15', fecha_cosecha_est: '2025-04-20', lote_id: 1, temporada: '2024/25', superficie_ha: 45.5, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Maíz', variedad: 'Pioneer P1630', fecha_siembra: '2024-11-01', fecha_cosecha_est: '2025-05-10', lote_id: 2, temporada: '2024/25', superficie_ha: 32.0, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Trigo', variedad: 'Klein Guaporé', fecha_siembra: '2024-06-10', fecha_cosecha_est: '2024-11-25', lote_id: 3, temporada: '2024/25', superficie_ha: 28.75, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Girasol', variedad: 'Syngeta NK Delgado', fecha_siembra: '2024-10-05', fecha_cosecha_est: '2025-03-15', lote_id: 4, temporada: '2024/25', superficie_ha: 50.0, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Soja', variedad: 'NS 5444', fecha_siembra: '2023-10-12', fecha_cosecha_est: '2024-04-18', lote_id: 1, temporada: '2023/24', superficie_ha: 45.5, created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cultivos', null, {});
  }
};
