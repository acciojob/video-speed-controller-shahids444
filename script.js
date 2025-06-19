const video = document.getElementById('video');
const playPauseBtn = document.getElementById('playPause');
const progress = document.getElementById('progress');
const progressFilled = document.getElementById('progressFilled');
const volumeSlider = document.getElementById('volume');
const speedSlider = document.getElementById('playbackSpeed');
const rewind10Btn = document.getElementById('rewind10');
const forward25Btn = document.getElementById('forward25');

// Play/Pause toggle function
function togglePlayPause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update the play/pause button icon
function updatePlayPauseButton() {
  playPauseBtn.textContent = video.paused ? '►' : '❚ ❚';
}

// Update the progress bar as video plays
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

// Scrub video when clicking on progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Volume control
function updateVolume() {
  video.volume = volumeSlider.value;
}

// Playback speed control
function updatePlaybackSpeed() {
  video.playbackRate = speedSlider.value;
}

// Rewind 10 seconds
function rewind10() {
  video.currentTime = Math.max(0, video.currentTime - 10);
}

// Forward 25 seconds
function forward25() {
  video.currentTime = Math.min(video.duration, video.currentTime + 25);
}

// Event listeners
playPauseBtn.addEventListener('click', togglePlayPause);
video.addEventListener('play', updatePlayPauseButton);
video.addEventListener('pause', updatePlayPauseButton);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', scrub);
volumeSlider.addEventListener('input', updateVolume);
speedSlider.addEventListener('input', updatePlaybackSpeed);
rewind10Btn.addEventListener('click', rewind10);
forward25Btn.addEventListener('click', forward25);

// Initialize volume and playback speed on load
video.volume = volumeSlider.value;
video.playbackRate = speedSlider.value;
