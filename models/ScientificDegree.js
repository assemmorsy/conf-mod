const { Model, DataTypes } = require('sequelize');
const db = require("../utils/db")

class ScientificDegree extends Model {
    static async populateScientificDegrees() {
        await ScientificDegree.bulkCreate([
            { name: "Professor" },
            { name: "Assistant professor" },
            { name: "Lecturer" },
            { name: "Assistant Lecturer" },
            { name: "Specialist" },
            { name: "Resident" },
            { name: "General Practitioner" },
        ])
    }

    static async getScientificDegree(id) {
        return await ScientificDegree.findByPk(id)
    }
    static async getScientificDegrees() {
        return await ScientificDegree.findAll()
    }
    static associate(models) {
        ScientificDegree.hasMany(models.Doctor, {
            as: "doctors", foreignKey: "scientificDegreeId"
        })
        models.Doctor.belongsTo(ScientificDegree, {
            foreignKey: "scientificDegreeId"
        })
    }
}
ScientificDegree.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: db.sequelize,
    timestamps: false,
    modelName: 'ScientificDegree'
})

module.exports = ScientificDegree