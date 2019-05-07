const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const { PORT } = process.env;
if (!process.env.PORT) {
  throw new Error('missing environment variables');
}

const app = express();
app.use((req, res, next) => {
  console.log(req.method, req.url, req.ip);
  next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
});
