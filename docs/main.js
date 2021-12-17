const KEY = 'AIzaSyCLUo5qEty6lVBgMzV4JQFQmx7ivTQcuD8';
const TIMER = document.getElementById('timer');
const MAX_TIMER_VALUE = 120;

let playlistId; // playlist ID
let playlistData = []; // video IDs
let durationData = []; // video durations
let timerEnabled = true;
let timerValue;

// Main function. Gets all data for video randomization, starts the roulette
async function start() {
	playlistId = await getPlaylistId('https://www.youtube.com/channel/UCMe7f7wqQE-ycqT2qH6zlpA');
	//document.getElementById('channel-url').value;
	//console.log(playlistId);

	// get playlist data
	let url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${KEY}`;
	playlistData = await getPlaylistData(url);
	//console.log(playlistData);

	// use the playlist data to get duration data for each video
	durationData = await getDurationData(playlistData);
	//console.log(durationData);
}

async function getPlaylistId(curl) {
	// extract channel id from url
	let cid = curl.split('/');
	cid = cid[cid.length - 1];

	if (cid.substring(0, 2) !== 'UC') {
		// this is not a valid channel url
		alert('Please enter a valid YouTube channel URL. Vanity and custom URLs will not work.');
	}

	// convert channel id to playlist id
	return 'UU' + cid.substring(2, cid.length);
}

// get playlist data (video IDs), store in an array, and return it
async function getPlaylistData(url) {
	arr = [];
	response = await fetch(url);
	data = await response.json();

	// push each page's items to array
	while (data.nextPageToken) {
		data.items.forEach((item) => {
			arr.push(item.snippet.resourceId.videoId);
		});
		response = await fetch(url + '&pageToken=' + data.nextPageToken);
		data = await response.json();
	}

	// push final page's items to array
	data.items.forEach((item) => {
		arr.push(item.snippet.resourceId.videoId);
	});

	return arr;
}

async function getDurationData(pdata, start = 0, end = 50) {
	let arr = [];
	let idstring;
	let url = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&key=${KEY}`;
	do {
		idstring = '';
		end = Math.min(start + 50, pdata.length);
		for (i = start; i < end; i++) {
			idstring += `&id=${pdata[i]}`;
		}

		let response = await fetch(url + idstring);
		let data = await response.json();
		data.items.forEach((item) => {
			let seconds = toSeconds(item.contentDetails.duration);
			arr.push(seconds);
		});

		start += 50;
	} while (start < pdata.length);

	return arr;
}

function toSeconds(isotime) {
	var matches = isotime.match(/[0-9]+[YWDHMS]/g);

	var seconds = 0;

	matches.forEach(function (part) {
		var unit = part.charAt(part.length - 1);
		var amount = parseInt(part.slice(0, -1));

		switch (unit) {
			case 'Y':
				seconds += amount * 60 * 60 * 24 * 365;
				break;
			case 'W':
				seconds += amount * 60 * 60 * 24 * 7;
				break;
			case 'D':
				seconds += amount * 60 * 60 * 24;
				break;
			case 'H':
				seconds += amount * 60 * 60;
				break;
			case 'M':
				seconds += amount * 60;
				break;
			case 'S':
				seconds += amount;
				break;
			default:
			// noop
		}
	});

	return seconds;
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
