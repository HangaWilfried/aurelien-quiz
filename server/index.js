require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

const production = process.env.NODE_ENV === 'production'
if (production) {
    app.use(express.static(__dirname + '../client/dist'))
} else {
    app.use(express.static(__dirname + '../client'))
}


const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use("/api/post", require("./routes/manageUser"))

app.listen(port, () => console.log(`server run on http://localhost/${port}`))
