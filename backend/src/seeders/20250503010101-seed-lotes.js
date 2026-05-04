'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('lotes', [
      { nombre: 'Lote Norte', superficie_ha: 45.5, ubicacion: 'Norte', created_at: new Date(), updated_at: new Date() },
      { nombre: 'Lote Sur', superficie_ha: 32.0, ubicacion: 'Sur', created_at: new Date(), updated_at: new Date() },
      { nombre: 'Lote Este', superficie_ha: 28.75, ubicacion: 'Este', created_at: new Date(), updated_at: new Date() },
      { nombre: 'Lote Oeste', superficie_ha: 50.0, ubicacion: 'Oeste', created_at: new Date(), updated_at: new Date() },
      { nombre: 'Lote Central', superficie_ha: 60.25, ubicacion: 'Central', created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lotes', null, {});
  }
};
