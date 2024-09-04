const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('image'), (req, res) => {
  Tesseract.recognize(
    path.resolve(__dirname, req.file.path),
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    const balance = calculateBalance(text); // Dummy function, implement your logic
    res.json({ balance });
  }).catch(err => {
    res.status(500).json({ error: 'Error processing image' });
  });
});

function calculateBalance(text) {
  // Implement your balance calculation logic here
  return 100; // Dummy balance
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});