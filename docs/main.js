const KEY = 'AIzaSyCLUo5qEty6lVBgMzV4JQFQmx7ivTQcuD8';
const TIMER = document.getElementById('timer');
const MAX_TIMER_VALUE = 120;

let playlistId; // playlist ID
let playlistData = []; // video IDs
let timerEnabled = true;
let timerValue;

async function start() {
	//TODO: add a loading gif in nav bar
	// assume the field has a valid url
	// get url
	curl = 'https://www.youtube.com/channel/UCMe7f7wqQE-ycqT2qH6zlpA'; //document.getElementById('channel-url').value;

	// extract channel id from url
	cid = curl.split('/');
	cid = cid[cid.length - 1];
	console.log(cid);

	if (cid.substring(0, 2) !== 'UC') {
		// this is not a valid channel url
		alert('Please enter a valid YouTube channel URL. Vanity and custom URLs will not work.');
	}

	// convert channel id to playlist id
	playlistId = 'UU' + cid.substring(2, cid.length);
	console.log(playlistId);

	// create url using playlist id and api key
	url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${KEY}`;
	pageToken = '';
	// call yt api using url
	await getData(url, pageToken);
	console.log(playlistData);
}

function getData(url, pageToken) {
	fetch(url + pageToken)
		.then((response) => response.json())
		.then((data) => {
			// store playlist data
			data.items.forEach((item) => {
				playlistData.push(item.snippet.resourceId.videoId);
			});
			pageToken = data.nextPageToken ? data.nextPageToken : '';
			if (data.nextPageToken) getData(url, '&pageToken=' + data.nextPageToken);
		});
}

function updateTimer() {
	if (timerEnabled) {
		timerValue--;
		if (timerValue <= 0) {
			// we have reached the end of the time for this video, get the next one
		}
		TIMER.innerText = timerValue;
	}
}

// https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUbUh4Lf8YsYxopSl69EWwTA&key=[YOUR_API_KEY] HTTP/1.1
