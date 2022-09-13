const models = {
    Doctor: require("./Doctor"),
    Specialty: require("./Specialty"),
    Talk: require('./Talk'),
    Transportation: require('./Transportation'),
    DoctorConnection: require('./DoctorConnectionToEntities'),
    DoctorEnrollment: require("./DoctorEnrollmentInConf"),
    Accommodation: require('./Accommodation'),
    Session: require('./Session'),
    ScientificDegree: require("./ScientificDegree"),
    OrganizeCompany: require("./OrganizeCompany"),
    sponsor: require("./Sponsor"),
    Conference: require('./Conference'),
    Hall: require('./Hall'),
    Course: require('./Course')
}
async function associate() {
    for (const key in models) {
        models[key].associate(models)
    }
    await Specialty.populateSpecialties()
    await ScientificDegree.populateScientificDegrees()
}

module.exports = associate
