
// const https = require('https');
// const express = require("express");
// const fs = require('fs');
// const app = require("./server/server");
// const path = require('path');
// const port = process.env.PORT || 5000;


// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
//   app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   })
// };
// // app.use("/api/fb",)

// // app.listen(port, () => {
// //   console.log(`Server listening on port ${port}`);
// // });
// // USED FOR LOCAL HOST HTTPS
// const options = {
//   key: fs.readFileSync('./key.pem'),
//   cert: fs.readFileSync('./cert.pem'),
//   passphrase: 'saveastray'
// };
// const server = https.createServer(options, app);
// server.listen(5000, () => {
//   console.log(`Server listening on port ${port}`)
// });


const express = require("express");

const app = require("./server/server");
const path = require('path');
const port = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
};

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});