_Work in progress._

# Words of Tori Amos – A Tori Amos Lyrics Twitter Bot

As a fun way of learning more about Node, the YouTube API, the Twit package for dealing with the Twitter API, Heroku, and Twitter Bots in general, I decided to make a bot that tweets lyrics and videos of my favorite musician, Tori Amos.

## Adding New Lyrics

To make the process of adding new lyrics easier on myself, I created a bare-bones Node/Express app that I run locally when needed. It simply has a form and takes the input values from the form and writes them to `data/lyrics.json`.

The input is formatted before it is saved to the file. For example, with the lyric string, extra whitespace is replaced with new lines (`\n`). The string is also trimmed if it is longer than the characters left after #ToriAmos, #TheSongTitle, and the YouTube link. The album and song titles are title-cased. This makes it much less fussy when I am adding new lyrics, knowing it will be properly formatted for me before the `json` file is updated.

Before the file is updated, the lyrics are sorted by album title, just to make sure the data stays organized.

## Getting the Lyric

When `bot.js` runs and `tweetLyric` is called, the first thing to do is grab a new lyric. This is done using a `randomNumber` helper function. That number is used to grab a random lyric from the `lyrics.json` file.

## Getting the Video

In `youtube.js`, a request is made using **axios** to the **YouTube API**, sending the song title from the lyric object that has been randomly selected. The `getVideo` function in `youtube.js` returns a Promise that when resolved, returns a random video from the array of the 3 most relevant results.

## Tweeting the Lyric & Video

After the `getVideo` Promise returns with the video url, all that is needed is to call the `post` method on our [Twit](https://www.npmjs.com/package/twit) instance. The method is passed three arguments: the kind of `post` request being made (_in this case, 'statuses/update'_), a params object (_for this bot, the object only has a single property, `status`, with a string containing the content to be published, which is the lyric, video link, and any relevant hashtags_), and a callback to handle errors, data, and the response (_for my bot, I am just logging any potential errors and doing nothing else_).
