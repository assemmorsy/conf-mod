const { Model, DataTypes } = require('sequelize');
const db = require("../utils/db")

class Sponsor extends Model {
 static associate(models) {
        Specialty.hasMany(models.Doctor, {
            as: "doctors", foreignKey: "specialtyId"
        })
        models.Doctor.belongsTo(Specialty, {
            foreignKey: "specialtyId"
        })
    }
}
Sponsor.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    logoPath: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    sequelize: db.sequelize,
    timestamps: false,
    modelName: 'Sponsor'
})
module.exports = Sponsor