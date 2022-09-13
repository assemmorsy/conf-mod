const { Model, DataTypes } = require('sequelize');
const db = require("../utils/db")

class Transportation extends Model {
    static associate(models) {
        Specialty.hasMany(models.Doctor, {
            as: "doctors", foreignKey: "specialtyId"
        })
        models.Doctor.belongsTo(Specialty, {
            foreignKey: "specialtyId"
        })
    }
}
Transportation.init({
    at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    from: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    to: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Doctor",
            key: "id"
        }
    },
    confId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Conference",
            key: "id"
        }
    }
}, {
    sequelize: db.sequelize,
    timestamps: false,
    modelName: 'Session'
})
module.exports = Transportation