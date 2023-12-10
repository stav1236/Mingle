import express from "express";
import path from "path";

const app = express();
const port = 3000;

// Serve static files from the "mingle-client/dist" directory
app.use(express.static("mingle-client/dist"));

// Your existing API endpoint
app.get("/api/data", (req, res) => {
  const responseData = { message: "This is a sample REST response" };
  res.json(responseData);
});

// Handle requests to all routes by serving the main HTML file
app.get("*", (req, res) => {
  res.sendFile(path.resolve("mingle-client/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
