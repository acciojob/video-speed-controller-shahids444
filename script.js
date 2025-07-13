/* ---------- Grab references ---------- */
const player       = document.querySelector('.player');
const video        = player.querySelector('.viewer');
const progress     = player.querySelector('.progress');
const progressBar  = player.querySelector('.progress__filled');
const toggle       = player.querySelector('.toggle');
const skipButtons  = player.querySelectorAll('[data-skip]');
const sliders      = player.querySelectorAll('.player__slider');

/* ---------- Basic helpers ---------- */
function togglePlay() {
  video[video.paused ? 'play' : 'pause']();
}

function updateToggleIcon() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleSliderUpdate() {
  // this.name is either "volume" or "playbackRate"
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* ---------- Wire up events ---------- */
video.addEventListener('click', togglePlay);
video.addEventListener('play',  updateToggleIcon);
video.addEventListener('pause', updateToggleIcon);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

sliders.forEach(slider => {
  slider.addEventListener('change', handleSliderUpdate);
  slider.addEventListener('mousemove', handleSliderUpdate);
});

/* Scrubbing */
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup',   () => (mousedown = false));

/* Initialize icon once metadata is ready */
video.addEventListener('loadedmetadata', updateToggleIcon);
