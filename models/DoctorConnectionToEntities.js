const { Model, DataTypes, NOW, ForeignKeyConstraintError } = require('sequelize');
const db = require("../utils/db")

class DoctorConnection extends Model {
    static associate(models) {
        Specialty.hasMany(models.Doctor, {
            as: "doctors", foreignKey: "specialtyId"
        })
        models.Doctor.belongsTo(Specialty, {
            foreignKey: "specialtyId"
        })
    }
}
DoctorConnection.init({
    confId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Conference",
            key: "id"
        }
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Doctor",
            key: "id"
        }
    },
    connectionName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM(
            "Course", "Session", "Talk", "Conference"
        )
    },
    entityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: db.sequelize,
    timestamps: false,
    modelName: 'DoctorConnection'
})
module.exports = DoctorConnection