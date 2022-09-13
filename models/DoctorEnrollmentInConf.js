const { Model, DataTypes, NOW } = require('sequelize');
const db = require("../utils/db")

class DoctorEnrollment extends Model {
    static associate(models) {
        Specialty.hasMany(models.Doctor, {
            as: "doctors", foreignKey: "specialtyId"
        })
        models.Doctor.belongsTo(Specialty, {
            foreignKey: "specialtyId"
        })
    }
}
DoctorEnrollment.init({
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
    enrollAt: {
        type: DataTypes.DATE
        , defaultValue: NOW
        , allowNull: false
    },
    attendAt: {
        type: DataTypes.DATE
        , allowNull: true
    },
    printCertificateAt: {
        type: DataTypes.DATE
        , allowNull: true
    },
    type: {
        type: DataTypes.ENUM(
            "Regular", "VIP"
        )
    }
}, {
    sequelize: db.sequelize,
    timestamps: false,
    modelName: 'DoctorEnrollment'
})
module.exports = DoctorEnrollment