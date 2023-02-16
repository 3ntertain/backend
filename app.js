const express = require("express")
const asyncHandler = require("express-async-handler")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const multer = require("multer")

const createDrop = require("./functions/createDrop")
const setClaimConditions = require("./functions/setClaimConditions")
const lazyMint = require("./functions/lazyMint")

const sendRewards = require("./functions/sendRewardsSPL")

const generatePicture = require("./functions/common/generatePicture")

const returnMessage = (message, res) => {
  if (message.success) res.send(message)
  else {
    res.status(500)
    res.send(message)
  }
}

const app = express()

app.use(fileUpload())

generatePicture()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send("Welcome to Clash of Degens")
  })
)

app.post(
  "/drop/create",
  asyncHandler(async (req, res) => {
    const message = await createDrop(req)
    returnMessage(message, res)
  })
)

app.post(
  "/drop/setClaimConditions",
  asyncHandler(async (req, res) => {
    const message = await setClaimConditions(req)
    returnMessage(message, res)
  })
)

app.post(
  "/drop/lazyMint",
  asyncHandler(async (req, res) => {
    const message = await lazyMint(req)
    returnMessage(message, res)
  })
)

app.post(
  "/rewards/send",
  asyncHandler(async (req, res) => {
    const message = await sendRewards(req)
    returnMessage(message, res)
  })
)

app.listen(6000, () => console.log("Listening on port 6000."))
