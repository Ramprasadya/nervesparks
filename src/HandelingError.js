const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer(); // Create an instance of multer

const app = express();

// Set up body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Function to simulate asynchronous operation (e.g., querying a database or making API requests)
function simulateAsyncOperation() {
  return new Promise((resolve, reject) => {
    // Simulating an asynchronous operation that resolves after a delay
    setTimeout(() => {
      // For demonstration purposes, we will simulate an error here
      // Replace this with the actual operation you want to perform
      // For example, fetching data from a database or an API
      reject(new Error('Something went wrong.'));
    }, 1000);
  });
}

// Endpoint to handle the multipart/form-data POST request
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    // Simulate an asynchronous operation using the function defined above
    await simulateAsyncOperation();

    // req.file contains the uploaded file details
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Process the file or do something with it
    // For example, save it to the database or the server's filesystem

    res.json({ message: 'File uploaded successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred during file upload.' });
  }
});

// Other API endpoints with error handling
app.get('/api/data', async (req, res) => {
  try {
    // Simulate an asynchronous operation using the function defined above
    await simulateAsyncOperation();

    // Replace this with the actual operation you want to perform
    // For example, fetching data from a database or an API
    const data = { message: 'Data retrieved successfully.' };
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
