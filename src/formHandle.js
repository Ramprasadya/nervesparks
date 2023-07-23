// npm install express body-parser multer


const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer(); // Create an instance of multer

const app = express();

// Set up body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle the multipart/form-data POST request
app.post('/api/upload', upload.single('file'), (req, res) => {
  // req.file contains the uploaded file details
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Process the file or do something with it
  // For example, save it to the database or the server's filesystem

  res.json({ message: 'File uploaded successfully.' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


{/* <form action="/api/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="file" />
  <button type="submit">Upload</button>
</form> */}
