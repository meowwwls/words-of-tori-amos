const getRandomNumber = max => Math.floor(Math.random() * max);

const titleCase = str =>
  str.replace(/(?<=\s|^)[a-z]{1}/g, match => match.toUpperCase());

module.exports = {
  randomNumber: getRandomNumber,
  titleCase
};
