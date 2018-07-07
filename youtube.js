const axios = require('axios');
const { randomNumber } = require('./helpers');
const endpoint = 'https://www.googleapis.com/youtube/v3/search';

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
      const random = randomNumber(videos.length);

      return `http://youtu.be/${videos[random].id.videoId}`;
    })
    .catch(e => console.log(e));
};
