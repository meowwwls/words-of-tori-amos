const fs = require('fs');
const { titleCase } = require('../helpers');

const getLyrics = () => {
  try {
    return JSON.parse(fs.readFileSync('./data/lyrics.json'));
  } catch (e) {
    return [];
  }
};

const saveLyrics = lyrics => {
  fs.writeFileSync('./data/lyrics.json', JSON.stringify(lyrics));
};

const sortLyrics = () => {
  const sorted = [...getLyrics()].sort((a, b) =>
    a.album.localeCompare(b.album)
  );

  saveLyrics(sorted);
};

const trimmedLyric = (lyric, song) => {
  const l = lyric.replace(/[\r\n]+/g, '\n');

  // tweet char limit - ToriAmos hashtag - song title hashtag - ~ length of youtube url
  const limit =
    280 - `#toriamos`.length - `#${song.replace(/\s/g, '')}`.length - 45;

  return l.length >= limit ? `${l.slice(0, limit - 1)}…` : l;
};

const addLyric = ({ lyric, song, album }) => {
  const lyrics = getLyrics();

  const newLyric = {
    lyric: trimmedLyric(lyric, song),
    album: titleCase(album),
    song: titleCase(song)
  };

  const duplicateLyrics = lyrics.filter(
    currentLyric =>
      currentLyric.lyric.toLowerCase() === newLyric.lyric.toLowerCase()
  );

  if (duplicateLyrics.length === 0) {
    lyrics.push(newLyric);
    sortLyrics();

    return newLyric;
  }
};

module.exports = {
  getLyrics,
  addLyric
};
