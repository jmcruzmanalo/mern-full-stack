const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({
    hi: 'there'
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Started listening to port ${PORT}.`);
});
