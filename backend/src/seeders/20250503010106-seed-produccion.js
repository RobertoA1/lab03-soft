'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('produccion', [
      { cultivo_id: 1, lote_id: 1, temporada: '2024/25', rendimiento_tn_ha: 3.85, calidad_grano: 'Buena', costos_operativos: 450000, ingresos_brutos: 920000, observaciones: 'Rendimiento esperado dentro de promedio.', created_at: new Date(), updated_at: new Date() },
      { cultivo_id: 2, lote_id: 2, temporada: '2024/25', rendimiento_tn_ha: 9.20, calidad_grano: 'Muy Buena', costos_operativos: 680000, ingresos_brutos: 1450000, observaciones: 'Buena humedad de resiembra.', created_at: new Date(), updated_at: new Date() },
      { cultivo_id: 3, lote_id: 3, temporada: '2024/25', rendimiento_tn_ha: 4.50, calidad_grano: 'Buena', costos_operativos: 320000, ingresos_brutos: 580000, observaciones: 'Leve estrés hídrico en enero.', created_at: new Date(), updated_at: new Date() },
      { cultivo_id: 4, lote_id: 4, temporada: '2024/25', rendimiento_tn_ha: 2.95, calidad_grano: 'Regular', costos_operativos: 280000, ingresos_brutos: 390000, observaciones: 'Afectado por heladas tempranas.', created_at: new Date(), updated_at: new Date() },
      { cultivo_id: 5, lote_id: 1, temporada: '2023/24', rendimiento_tn_ha: 3.60, calidad_grano: 'Buena', costos_operativos: 420000, ingresos_brutos: 850000, observaciones: 'Campaña normal.', created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('produccion', null, {});
  }
};
