

const express = require("express");
const seeds = require("./server/seeds");

const app = require("./server/server");
const path = require('path');
const port = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
};
app.use("/api/seeds", seeds);
app.use(express.static('public'));
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});