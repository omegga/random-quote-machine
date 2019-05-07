const Twit = require('twit');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY;
const API_SECRET_KEY = process.env.API_SECRET_KEY;

if (!API_KEY || ! API_SECRET_KEY) {
  throw new Error('missing environment variables');
}

const t = new Twit({
  consumer_key: API_KEY,
  consumer_secret: API_SECRET_KEY,
  app_only_auth: true
});

function getQuotes(screenName) {
  return new Promise((resolve, reject) => {
    t.get('https://api.twitter.com/1.1/statuses/user_timeline.json', 
      { 
        screen_name: screenName, 
        count: 100, 
        include_rts: false 
      }, 
      (err, tweets, response) => {
        if (err) {
          reject(err);
        }
        const rule = /^[",“](.+)[",”]\s-\s(.+)/;
        tweets = tweets
          .filter(tweet => !tweet.truncated)
          .map(tweet => tweet.text)
          .filter(tweet => rule.test(tweet))
          .map(tweet => {
            const [ match, quote, author ] = tweet.match(rule);
            return { quote, author };
          });
        resolve(tweets);
      }
    );
  });
}

module.exports = getQuotes;