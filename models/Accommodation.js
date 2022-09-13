const { Model, DataTypes } = require('sequelize');
const db = require("../utils/db")

class Accommodation extends Model {
    static associate(models) {
        Specialty.hasMany(models.Doctor, {
            as: "doctors", foreignKey: "specialtyId"
        })
        models.Doctor.belongsTo(Specialty, {
            foreignKey: "specialtyId"
        })
    }
}
Accommodation.init({
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
    },
    startAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    roomType: {
        type: DataTypes.ENUM("Single", "Double", "Triple"),
        allowNull: false
    },
    hotelLocation: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hotelAddress: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {

    sequelize: db.sequelize,
    timestamps: false,
    modelName: 'Session'

})
module.exports = Accommodation