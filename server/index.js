require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
if(process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + '/public/'));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5500

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use("/api/post", require("./routes/manageUser"))

app.listen(port, () => console.log(`server run on http://localhost/${port}`))
