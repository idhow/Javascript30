// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.player__fullscreen');

// Build out Function
const togglePLay = () => {
  video.paused ? video.play() : video.pause()
};

const updateButton = () => {
  toggle.textContent = this.paused ? '►' : '❚ ❚' 
};

const skip = function() {
  video.currentTime += parseFloat(this.dataset.skip)
};

const handleRangeupdate = function() {
  video[this.name] = this.value
};

const handleProgress = function () {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
};

const handleFullscreen = function () {
  if (!document.fullscreenElement) {
    player.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
};

const scrub = function(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
};

// Hook up the event listeners
video.addEventListener('click', togglePLay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('dblclick', handleFullscreen);

toggle.addEventListener('click', togglePLay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeupdate));

ranges.forEach(range => range.addEventListener('mousemove', handleRangeupdate));

fullscreen.addEventListener('click', handleFullscreen);

let mouseDown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e))
progress.addEventListener('mousedown', () => (mouseDown = true))
progress.addEventListener('mouseup', () => (mouseDown = false))






