const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const { PORT } = process.env;
if (!process.env.PORT) {
  throw new Error('missing environment variables');
}

const app = express();

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
});
