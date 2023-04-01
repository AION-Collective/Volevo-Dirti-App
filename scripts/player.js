let playpause_btn = document.getElementById("playpause-track");

let track_index = 0;
let is_playing = false;

// Create the audio element for the player
let curr_track = document.createElement("audio");

// Define the list of tracks that have to be played
let track_list = [
  {
    path: "./tracks/VD.mp3"
  }
];

function loadTrack(track_index) {
  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);

  // Apply a random background color
  randomBgColor();
}

function randomBgColor() {
  // Get a random number between 0 to 256(-64)
  // (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) - 100;
  let green = Math.floor(Math.random() * 256) - 100;
  let blue = Math.floor(Math.random() * 256) - 100;

  // Construct a color with the given values
  let bg_color = "rgb(" + red + ", " + green + ", " + blue + ")";

  // Set the background to the new color
  document.body.style.backgroundColor = bg_color;
}

function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!is_playing) playTrack();
  else pauseTrack();
}

function playTrack() {
  // Play the loaded track
  curr_track.play();
  is_playing = true;

  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-thin fa-pause-circle fa-7x"></i>';
  randomBgColor(); randomBgColor();
}

function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  is_playing = false;

  // Replace icon with the play icon
  playpause_btn.innerHTML = '<lottie-player src="https://assets6.lottiefiles.com/packages/lf20_6jsf4dqj.json"  background="transparent"  speed="1"  style="width: 200px; block-size: 200px;"  loop autoplay></lottie-player>';
}

function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length - 1;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function random() {
  curr_track.currentTime = Math.floor(Math.random() * curr_track.duration);
  playTrack();
}

loadTrack(track_index);
