const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },
    idB: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.id + 'B';
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3,10],
        isAlpha: true,
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        max: 200,
        min: 0,
      }

    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        max: 200,
        min: 0,
      }

    },
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        max: 200,
        min: 0,
      }

    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        max: 200,
        min: 0,
      }

    },
    height: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        max: 200,
        min: 0,
      }

    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        max: 200,
        min: 0,
      }

    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://i.ibb.co/qjnm6ZQ/img-pokemon-undef.png",
      validate : {
        isUrl: true,
      }

    },

  });
};
