const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({
    hello: 'world'
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Started listening to port ${PORT}.`);
});
