const { Model, DataTypes } = require('sequelize');
const db = require("../utils/db")

class Course extends Model {
 static associate(models) {
        Specialty.hasMany(models.Doctor, {
            as: "doctors", foreignKey: "specialtyId"
        })
        models.Doctor.belongsTo(Specialty, {
            foreignKey: "specialtyId"
        })
    }
}
Course.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Conference",
            key: "id"
        }
    },
    specialtyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Specialty",
            key: "id"
        }
    }
}, {
    sequelize: db.sequelize,
    timestamps: false,
    modelName: 'Course'
})
module.exports = Course