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
  const random = randomNumber(lyrics.length);
  const lyric = lyrics[random];

  getVideo(lyric.song).then(response => {
    const songHash = lyric.song.replace(/\s/g, '');
    const tweet = {
      status: `${lyric.lyric}\n${response} #ToriAmos #${songHash}`
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
