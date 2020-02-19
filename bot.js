require("dotenv").config();

const twit = require("twit");
const getVideo = require("./youtube");
const { getLyrics } = require("./lyricadder/lyrics");
const { randomNumber } = require("./helpers");

const config = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

const Twitter = new twit(config);

const lyrics = getLyrics();

module.exports = tweetLyric = () => {
  const random = randomNumber(lyrics.length);
  const lyric = lyrics[random];

  getVideo(lyric.song).then(response => {
    const songHash = lyric.song.replace(/\s/g, "");
    const tweet = {
      status: `${lyric.lyric}\n${response} #ToriAmos #${songHash}`
    };

    Twitter.post("statuses/update", tweet, (err, data, response) => {
      if (err) {
        console.log(err);
      }
    });
  });
};
