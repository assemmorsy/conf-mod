const { Model, DataTypes } = require('sequelize');
const db = require("../utils/db")

class OrganizeCompany extends Model {
 static associate(models) {
        Specialty.hasMany(models.Doctor, {
            as: "doctors", foreignKey: "specialtyId"
        })
        models.Doctor.belongsTo(Specialty, {
            foreignKey: "specialtyId"
        })
    }
}
OrganizeCompany.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logoPath: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    address:{
        type:DataTypes.STRING , 
        allowNull:false,
    }
}, {
    sequelize: db.sequelize,
    timestamps: false,
    modelName: 'OrganizeCompany'
})

module.exports = OrganizeCompany