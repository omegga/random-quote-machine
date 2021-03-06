const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const getQuotes = require('./quotes');

dotenv.config();
const { PORT, TWITTER_QUOTES_ACCOUNT } = process.env;
if (!process.env.PORT || !TWITTER_QUOTES_ACCOUNT) {
  throw new Error('missing environment variables');
}

const app = express();
app.use((req, res, next) => {
  console.log(req.method, req.url, req.ip);
  next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));

let quotesCache = null;
app.get("/api/quotes", async (req, res, next) => {
  if (quotesCache !== null) {
    return res.json(quotesCache);
  }
  try {
    const quotes = await getQuotes(TWITTER_QUOTES_ACCOUNT);
    quotesCache = quotes;
    res.json(quotes);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
});
