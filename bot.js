const twit = require('twit');
const getVideo = require('./youtube');
const { getLyrics } = require('./lyricadder/lyrics');
const { randomNumber } = require('./helpers');

const config = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
};

const Twitter = new twit(config);

const lyrics = getLyrics();

const tweetLyric = () => {
  const lyric = lyrics[randomNumber(lyrics.length)];

  getVideo(lyric.song).then(response => {
    const tweet = {
      status: `${lyric.lyric}\n${response} #ToriAmos #${lyric.song.replace(
        /\s/g,
        ''
      )}`
    };

    Twitter.post('statuses/update', tweet, (err, data, response) => {
      if (err) {
        console.log(err);
      }
    });
  });
};

tweetLyric();

// Tweet once every 24 hours (until I set up Heroku tasks)
setInterval(tweetLyric, 24 * 60 * 60 * 1000);
