// const config = require('./config');
const twit = require('twit');
const config = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
};

const Twitter = new twit(config);

const { getLyrics } = require('./lyricadder/lyrics');
const lyrics = getLyrics();
const getVideo = require('./youtube');
const { randomNumber } = require('./helpers');

const lyric = lyrics[randomNumber(lyrics.length)];

const tweetLyric = () => {
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
  // const video = `https://www.youtube.com/watch?v=${videoId}`;
};

// const tweetLyric = () => {
//   const video = `https://www.youtube.com/watch?v=${videoId}`;
//   const tweet = {
//     status: `${lyric.lyric} \n ${video} #ToriAmos #${lyric.song.replace(
//       /\s/g,
//       ''
//     )}`
//   };

//   Twitter.post('statuses/update', tweet, (err, data, response) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// };

tweetLyric();
// getVideo(term).then(response => {
//   const video = `https://www.youtube.com/watch?v=${response}`;

//   const tweet = {
//     status: `${lyric.lyric} \n ${video} #ToriAmos #${lyric.song.replace(
//       /\s/g,
//       ''
//     )}`
//   };

//   Twitter.post('statuses/update', tweet, (err, data, response) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// });
