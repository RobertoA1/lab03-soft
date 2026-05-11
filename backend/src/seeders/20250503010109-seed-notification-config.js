'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('notification_config', [
      { id: 1, email: null, telefono: null, created_at: now, updated_at: now },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notification_config', null, {});
  },
};
