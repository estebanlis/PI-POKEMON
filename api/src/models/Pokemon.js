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
    idB :{
      type: DataTypes.VIRTUAL,
      get(){
        return this.id+'B';
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,

    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 0,

    },
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 0,

    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,

    },
    height: {
      type: DataTypes.INTEGER,
      defaultValue: 0,

    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 0,

    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://user-images.githubusercontent.com/6562688/65653705-3074a880-dfe4-11e9-8cfe-d2c62112587e.jpg",

    },

  });
};
