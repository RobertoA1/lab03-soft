'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. notification_config
    await queryInterface.createTable('notification_config', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // 2. lotes
    await queryInterface.createTable('lotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      superficie_ha: {
        type: Sequelize.FLOAT
      },
      cultivo: {
        type: Sequelize.STRING
      },
      ubicacion: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // 3. cultivos
    await queryInterface.createTable('cultivos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      variedad: {
        type: Sequelize.STRING
      },
      fecha_siembra: {
        type: Sequelize.DATEONLY
      },
      fecha_cosecha_est: {
        type: Sequelize.DATEONLY
      },
      lote_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lotes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      temporada: {
        type: Sequelize.STRING
      },
      superficie_ha: {
        type: Sequelize.FLOAT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // 4. clima
    await queryInterface.createTable('clima', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lote_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lotes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fecha: {
        type: Sequelize.DATEONLY
      },
      temp_max: {
        type: Sequelize.FLOAT
      },
      temp_min: {
        type: Sequelize.FLOAT
      },
      precipitacion: {
        type: Sequelize.FLOAT
      },
      humedad_relativa: {
        type: Sequelize.FLOAT
      },
      radiacion_solar: {
        type: Sequelize.FLOAT
      },
      velocidad_viento: {
        type: Sequelize.FLOAT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // 5. suelo
    await queryInterface.createTable('suelo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lote_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lotes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fecha: {
        type: Sequelize.DATEONLY
      },
      humedad: {
        type: Sequelize.FLOAT
      },
      ph: {
        type: Sequelize.FLOAT
      },
      nitrogeno_disponible: {
        type: Sequelize.FLOAT
      },
      fosforo_disponible: {
        type: Sequelize.FLOAT
      },
      conductividad_electrica: {
        type: Sequelize.FLOAT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // 6. riego
    await queryInterface.createTable('riego', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lote_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lotes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fecha: {
        type: Sequelize.DATEONLY
      },
      tipo_riego: {
        type: Sequelize.STRING
      },
      volumen_aplicado_l: {
        type: Sequelize.FLOAT
      },
      duracion_horas: {
        type: Sequelize.FLOAT
      },
      presion_bar: {
        type: Sequelize.FLOAT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // 7. produccion
    await queryInterface.createTable('produccion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cultivo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cultivos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      lote_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lotes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      temporada: {
        type: Sequelize.STRING
      },
      rendimiento_tn_ha: {
        type: Sequelize.FLOAT
      },
      calidad_grano: {
        type: Sequelize.STRING
      },
      costos_operativos: {
        type: Sequelize.FLOAT
      },
      ingresos_brutos: {
        type: Sequelize.FLOAT
      },
      observaciones: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // 8. alertas
    await queryInterface.createTable('alertas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo: {
        type: Sequelize.STRING
      },
      severidad: {
        type: Sequelize.STRING
      },
      mensaje: {
        type: Sequelize.TEXT
      },
      racional: {
        type: Sequelize.TEXT
      },
      recomendacion: {
        type: Sequelize.TEXT
      },
      confianza: {
        type: Sequelize.FLOAT
      },
      categoria: {
        type: Sequelize.STRING
      },
      lote_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lotes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      fecha: {
        type: Sequelize.DATEONLY
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: 'pendiente'
      },
      nota_resolucion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // 9. sensores
    await queryInterface.createTable('sensores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lote_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'lotes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tipo: {
        type: Sequelize.ENUM('clima', 'suelo', 'riego'),
        allowNull: false
      },
      fabricante: {
        type: Sequelize.STRING,
        allowNull: false
      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numero_serie: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      firmware: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fecha_instalacion: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      activo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sensores');
    await queryInterface.dropTable('alertas');
    await queryInterface.dropTable('produccion');
    await queryInterface.dropTable('riego');
    await queryInterface.dropTable('suelo');
    await queryInterface.dropTable('clima');
    await queryInterface.dropTable('cultivos');
    await queryInterface.dropTable('lotes');
    await queryInterface.dropTable('notification_config');
    
    // Si usas postgres esto previene que queden ENUMs colgados en la bd y de errores despues
    try {
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_sensores_tipo";');
    } catch (e) {}
  }
};
