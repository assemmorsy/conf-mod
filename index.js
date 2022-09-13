//third party libs import
const express = require('express')
const bodyParser = require("body-parser")
const morgan = require('morgan')
const path = require("path")
const cors = require('cors')
//files import 
const db = require('./utils/db')
const associate = require('./models/associate')
//import routers 
const doctorRouter = require("./routers/doctorRouter")
const specialtyRouter = require("./routers/specialtyRouter")
const scientificDegreeRouter = require("./routers/scientificDegreeRouter")

const storages = require("./utils/useMulterStorages")

const app = express()

const PORT = 3000


db.sequelize.authenticate()
    .then(() => {
        console.log("connection is correct !");
        return db.sequelize.sync({ force: true })
    })
    .then(() => {
        associate()
        console.log("All tables in sync ...");
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
        db.sequelize.close()
    })

app.use(cors())
//logger
app.use(morgan("combined"))
//json parser 
app.use(bodyParser.json())
// routers 
app.use(doctorRouter)
app.use(specialtyRouter)
app.use(scientificDegreeRouter)

//serving static images
app.use(storages.doctorsProfilesStorage.endPoint,
    express.static(path.join(process.cwd(), storages.doctorsProfilesStorage.relativePath)))

// 404
app.use((req, res) => {
    res.status(404).json({ message: "404 not found" })
})

// error middleWare
app.use((err, req, res, next) => {
    console.error(err);
    if (err.status)
        return res.status(err.status).json({ errors: err.message });
    else
        return res.status(500).json({ errors: err.message });
})