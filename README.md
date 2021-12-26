# YouTube Roulette

A small web app to randomly play a minute of a random YouTube video from a channel of your choice... and then another minute of another random video from that channel... and then another ra-

Check it out [here](https://jacob-ressler.github.io/youtube-roulette).

Inspired by [Random Jerma Moments](https://jerma.org/random).

## About the Project

Uses the [YouTube Data API](https://developers.google.com/youtube/v3) to pull and store every public video ID for a user-submitted channel, along with each video's duration. A random ID is selected from the list of IDs, from which a random timestamp is then selected, constrained by the ID's corresponding duration data.

The video is embedded and set to start at the timestamp. It will play for a set time (default is 60 seconds, but the user is able to dynamically modify it to be anywhere from 10 to 600 in increments of 10), after which a new random video and timestamp will be selected and embedded.

A video can also be skipped at any time using the **SKIP** button. It can also be extended indefinitely by pausing the timer, which runs independent of the video itself, using the **PAUSE TIMER** button. This will pause the timer until it is unpaused with the **RESUME TIMER** button or until the video is skipped.

## What I Learned

- Asynchronous functions in JavaScript
- YouTube Data API
- How to make a basic progress tracker in JavaScript

## What I Improved At

- DOM manipulation using JavaScript
- Responsive design using Flexbox (CSS)
- HTML, CSS, JavaScript

## Project Information

- Developed by Jacob Ressler
- December 2021
