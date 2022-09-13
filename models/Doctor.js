const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')
const Specialty = require("./Specialty")
const ScientificDegree = require("./ScientificDegree")

const db = require("../utils/db")

class Doctor extends Model {
  static async postDoctor(doc) {
    return await Doctor.create(doc)
  }
  static async putDoctor(doctor, doc) {
    return await doctor.update(doc, {
      include: { model: Specialty },
      attributes: {
        exclude: ["password", "specialtyId"]
      }
    })
  }
  static async deleteDoctor(doctor) {
    return await doctor.destroy({
      attributes: {
        exclude: ["password", "specialtyId"]
      }
    })
  }
  static async getDoctor(id) {
    return await Doctor.findByPk(id, {
      include: [Specialty, ScientificDegree],
      attributes: {
        exclude: ["password", "specialtyId"]
      }
    })
  }
  static async getDoctors() {
    return await Doctor.findAll({
      include: [Specialty, ScientificDegree],
      attributes: {
        exclude: ["password", "specialtyId"]
      }
    });
  }
  static async updateProfileImg(doc, path) {
    await doc.update({ imagePath: path })
  }
  static async registDoctor(doc) {
    //TODO
  }
  static async searchByEmail(targetEmail) {
    const doctor = await Doctor.findOne({
      where: {
        email: targetEmail
      }, attributes: {
        include: ["id"]
      }

    })
    return doctor;
  }
  static async searchByPhone(targetPhone) {
    const doctor = await Doctor.findOne({
      where: {
        phone: targetPhone
      }, attributes: {
        include: ["id"]
      }
    })
    return doctor;
  }
  static associate(models) {

  }
}


Doctor.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('firstName', value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('lastName', value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
    }
  },
  registered: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.password !== null
    }, set(value) {
      throw new Error("don't try to set 'registered' value")
    }
  },
  jobTitle: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
  ,
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`
    },
    set(value) {
      throw new Error("don't try to set 'fullname' value")
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
  university: {
    type:DataTypes.STRING,
    allowNull:false , 
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    }
  },
  password: {
    type: DataTypes.STRING,
    set(value) {
      if (value) {
        hashedValue = bcrypt.hashSync(value, 10)
        this.setDataValue('password', hashedValue)
      }
    }
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  placeOfWork: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  scientificDegreeId: {
    type: DataTypes.INTEGER,
    references: {
      model: ScientificDegree,
      key: "id"
    }
  },
  specialtyId: {
    type: DataTypes.INTEGER,
    references: {
      model: Specialty,
      key: "id"
    }
  }
}, {
  sequelize: db.sequelize,
  timestamps: true, createdAt: false, updatedAt: true,
  modelName: 'Doctor',
});

module.exports = Doctor
