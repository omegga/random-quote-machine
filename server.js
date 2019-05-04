const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const { PORT } = process.env;
if (!process.env.PORT) {
  throw new Error('missing environment variables');
}

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
});
