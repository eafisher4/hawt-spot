const express = require('express');
const path = require('path')

const app = express();

const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen(PORT, (err) => {
  if (err) console.log('Server error: ', err);
  return console.log(`listening on port ${PORT}...`)
});
