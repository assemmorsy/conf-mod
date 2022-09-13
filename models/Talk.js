const { Model, DataTypes } = require('sequelize');
const db = require("../utils/db")

class Talk extends Model {
    static associate(models) {
        Specialty.hasMany(models.Doctor, {
            as: "doctors", foreignKey: "specialtyId"
        })
        models.Doctor.belongsTo(Specialty, {
            foreignKey: "specialtyId"
        })
    }
}
Talk.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    EndAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM(
            "Upcoming", "Finished", "Running"
        ),
        allowNull: false
    },
    attendType: {
        type: DataTypes.ENUM(
            "Physical Attend", "Online Attend", "Recorded Video"
        ),
        allowNull: false
    },
    talkDataPath: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    talkType: {
        type: DataTypes.ENUM(
            "Regular", "Symposium"
        ),
        allowNull: false
    },
    sponsorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Sponsor",
            key: "id"
        }
    },
    sessionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Session",
            key: "id"
        }
    },
}, {
    sequelize: db.sequelize,
    timestamps: false,
    modelName: 'Talk'
})
module.exports = Talk