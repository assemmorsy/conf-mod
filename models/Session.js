const { Model, DataTypes } = require('sequelize');
const db = require("../utils/db")

class Session extends Model {
    static associate(models) {
        Specialty.hasMany(models.Doctor, {
            as: "doctors", foreignKey: "specialtyId"
        })
        models.Doctor.belongsTo(Specialty, {
            foreignKey: "specialtyId"
        })
    }
}
Session.init({
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
    type: {
        type: DataTypes.ENUM(
            "Regular", "Workshop", "Symposium"
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
    confId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Conference",
            key: "id"
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Course",
            key: "id"
        }
    },
    hallId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Hall",
            key: "id"
        }
    }
}, {
    sequelize: db.sequelize,
    timestamps: false,
    modelName: 'Session'
})
module.exports = Session