const { Model, DataTypes } = require('sequelize');
const db = require("../utils/db")

class Hall extends Model {
 static associate(models) {
        Specialty.hasMany(models.Doctor, {
            as: "doctors", foreignKey: "specialtyId"
        })
        models.Doctor.belongsTo(Specialty, {
            foreignKey: "specialtyId"
        })
    }
}
Hall.init({
    nameInConf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    originalName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    floor: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    confId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Conference",
            key: "id"
        }
    },
}, {
    sequelize: db.sequelize,
    timestamps: false,
    modelName: 'Hall'
})
module.exports = Hall