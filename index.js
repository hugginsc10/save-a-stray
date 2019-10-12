

const express = require("express");
const app = require("./server/server");
const path = require('path');
const port = process.env.PORT || 5000
const fs = require('fs')
const https = require('https');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
};
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
// const options = {
  // key: fs.readFileSync('./key.pem'),
  // cert: fs.readFileSync('./cert.pem'),
  // passphrase: 'saveastray'
// };
// const server = https.createServer(options, app);
  // server.listen(port, () => {
  // console.log(`Server listening on port ${server.address().port}`)
// });