import express from "express"
const app = express()
const port = process.env.port || 3000

app.use(express.static("public")) // allows access to static files in the public directory

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
