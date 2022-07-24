require('dotenv').config({ path: './env' });
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

mongoose.connect("mongodb+srv://juniorlagoue:deuxmille@cluster0.aqlza.mongodb.net/quiz?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use("/api/post", require("./routes/manageUser"))

app.listen(port, () => console.log(`server run on http://localhost/${port}`))
