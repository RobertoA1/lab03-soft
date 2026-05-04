'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('alertas', [
      { lote_id: 4, tipo: 'humedad_suelo', severidad: 'critica', mensaje: 'Humedad del suelo críticamente baja (31%). Riesgo de estrés hídrico.', estado: 'pendiente', fecha: '2025-04-20', nota_resolucion: null, created_at: new Date(), updated_at: new Date() },
      { lote_id: 2, tipo: 'nitrogeno_suelo', severidad: 'advertencia', mensaje: 'Nitrógeno disponible bajo (18.1 ppm). Considerar fertilización nitrogenada.', estado: 'pendiente', fecha: '2025-04-20', nota_resolucion: null, created_at: new Date(), updated_at: new Date() },
      { lote_id: 4, tipo: 'ph_suelo', severidad: 'advertencia', mensaje: 'pH ácido (5.5). Revisar enmiendas de cal.', estado: 'pendiente', fecha: '2025-04-20', nota_resolucion: null, created_at: new Date(), updated_at: new Date() },
      { lote_id: 1, tipo: 'rendimiento', severidad: 'advertencia', mensaje: 'Rendimiento 2024/25 (3.85 tn/ha) ligeramente por debajo del potencial. Revisar manejo.', estado: 'resuelta', fecha: '2025-04-15', nota_resolucion: 'Se analizó manejo; próxima campaña ajustar siembra.', created_at: new Date(), updated_at: new Date() },
      { lote_id: 3, tipo: 'margen_economico', severidad: 'info', mensaje: 'Margen económico positivo pero con alta sensibilidad a costos de energía.', estado: 'pendiente', fecha: '2025-04-20', nota_resolucion: null, created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alertas', null, {});
  }
};
