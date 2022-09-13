const { Model, DataTypes } = require('sequelize');
const db = require("../utils/db")

class Conference extends Model {
 static associate(models) {

    }
}
Conference.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    posterPath: {
        type: DataTypes.STRING,
        allowNull: true
    },
    themePath: {
        type: DataTypes.STRING,
        allowNull: true
    },
    introLink: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    enrollEndDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    organizeCompanyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "OrganizeCompany",
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
    modelName: 'Conference'
})

module.exports = Conference