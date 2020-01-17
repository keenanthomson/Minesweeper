const express = require('express');
const app = express();
const port = process.env.PORT || 3005;

app.use(express.static('./public'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
