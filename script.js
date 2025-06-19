        // Get all the elements we need
        const player = document.querySelector('.player');
        const video = player.querySelector('.viewer');
        const progress = player.querySelector('.progress');
        const progressBar = player.querySelector('.progress__filled');
        const toggle = player.querySelector('.toggle');
        const skipButtons = player.querySelectorAll('[id^="skip"]');
        const ranges = player.querySelectorAll('.player__slider');
        const volumeSlider = player.querySelector('#volume');
        const playbackSpeedSlider = player.querySelector('#playbackSpeed');
        const skipBackButton = player.querySelector('#skip-back');
        const skipForwardButton = player.querySelector('#skip-forward');

        // Build out functions
        function togglePlay() {
            const method = video.paused ? 'play' : 'pause';
            video[method]();
        }

        function updateButton() {
            const icon = video.paused ? '►' : '❚ ❚';
            toggle.textContent = icon;
        }

        function skip() {
            const skipTime = parseFloat(this.dataset.skip);
            video.currentTime += skipTime;
        }

        function handleRangeUpdate() {
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

        // Hook up the event listeners
        video.addEventListener('click', togglePlay);
        video.addEventListener('play', updateButton);
        video.addEventListener('pause', updateButton);
        video.addEventListener('timeupdate', handleProgress);

        toggle.addEventListener('click', togglePlay);

        // Set up skip buttons with data attributes
        skipBackButton.dataset.skip = -10;
        skipForwardButton.dataset.skip = 25;
        
        skipButtons.forEach(button => button.addEventListener('click', skip));

        // Set up range sliders with proper names
        volumeSlider.name = 'volume';
        playbackSpeedSlider.name = 'playbackRate';
        
        ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
        ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

        // Progress bar scrubbing
        let mousedown = false;
        progress.addEventListener('click', scrub);
        progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
        progress.addEventListener('mousedown', () => mousedown = true);
        progress.addEventListener('mouseup', () => mousedown = false);

        // Initialize the video
        video.addEventListener('loadedmetadata', () => {
            updateButton();
        });