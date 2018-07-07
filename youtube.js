const endpoint = 'https://www.googleapis.com/youtube/v3/search';
const axios = require('axios');
const { randomNumber } = require('./helpers');

module.exports = getVideo = term => {
  return axios({
    url: endpoint,
    method: 'get',
    params: {
      key: process.env.YOUTUBE_KEY,
      q: `Tori Amos ${term}`,
      part: 'snippet',
      maxResults: 10,
      type: 'video'
    }
  })
    .then(data => {
      const videos = data.data.items;
      const randomI = randomNumber(videos.length);
      return `http://youtu.be/${videos[randomI].id.videoId}`;
    })
    .catch(e => console.log(e));
};
