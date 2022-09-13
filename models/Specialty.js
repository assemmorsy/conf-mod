const { Model, DataTypes } = require('sequelize');
const db = require("../utils/db")

class Specialty extends Model {
    static async populateSpecialties() {
        await Specialty.bulkCreate([
            { name: "Allergy and immunology" },
            { name: "Anesthesiology" },
            { name: "Dermatology" },
            { name: "Diagnostic radiology" },
            { name: "Emergency medicine" },
            { name: "Family medicine" },
            { name: "Internal medicine" },
            { name: "Medical genetics" },
            { name: "Neurology" },
            { name: "Nuclear medicine" },
            { name: "Obstetrics and gynecology" },
            { name: "Ophthalmology" },
            { name: "Pathology" },
            { name: "Pediatrics" },
            { name: "Physical medicine and rehabilitation" },
            { name: "Preventive medicine" },
            { name: "Psychiatry" },
            { name: "Radiation oncology" },
            { name: "Surgery" },
            { name: "Urology" }
        ])
    }

    static async getSpecialty(id) {
        return await Specialty.findByPk(id)
    }
    static async getSpecialties() {
        return await Specialty.findAll()
    }
    static associate(models) {
        Specialty.hasMany(models.Doctor, {
            as: "doctors", foreignKey: "specialtyId"
        })
        models.Doctor.belongsTo(Specialty, {
            foreignKey: "specialtyId"
        })
    }
}
Specialty.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: db.sequelize,
    timestamps: false,
    modelName: 'Specialty'
})

module.exports = Specialty