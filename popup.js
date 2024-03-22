document.addEventListener('DOMContentLoaded', function () {
    // Get the play/stop button
    var playBtn = document.getElementById('playStopBtn');

    // Get all noise buttons
    var whiteNoiseButton = document.getElementById('whiteNoiseButton');
    var pinkNoiseButton = document.getElementById('pinkNoiseButton');
    var brownNoiseButton = document.getElementById('brownNoiseButton');

    // Get all volume sliders
    var whiteNoiseVolume = document.getElementById('whiteNoiseVolume');
    var pinkNoiseVolume = document.getElementById('pinkNoiseVolume');
    var brownNoiseVolume = document.getElementById('brownNoiseVolume');
    var masterVolume = document.getElementById('masterVolume');

    // Audio elements for each noise
    var whiteNoiseAudio = new Audio('noise/03-White-Noise-60min.mp3');
    var pinkNoiseAudio = new Audio('noise/44-Rain-60min.mp3');
    var brownNoiseAudio = new Audio('noise/49-Underwater-60min.mp3');

    // Function to toggle noise buttons and play/stop audio
    function toggleNoise(button, audio, volumeInput) {
        if (button.classList.contains('btn-outline-primary')) {
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-primary');
            audio.play();
            audio.volume = volumeInput.value / 100;
        } else {
            button.classList.remove('btn-primary');
            button.classList.add('btn-outline-primary');
            audio.pause();
        }
        updatePlayButton();
    }

    // Event listeners for noise buttons
    whiteNoiseButton.addEventListener('click', function () {
        toggleNoise(whiteNoiseButton, whiteNoiseAudio, whiteNoiseVolume);
    });

    pinkNoiseButton.addEventListener('click', function () {
        toggleNoise(pinkNoiseButton, pinkNoiseAudio, pinkNoiseVolume);
    });

    brownNoiseButton.addEventListener('click', function () {
        toggleNoise(brownNoiseButton, brownNoiseAudio, brownNoiseVolume);
    });

    // Function to update the play/stop button based on noise buttons state
    function updatePlayButton() {
        if (whiteNoiseButton.classList.contains('btn-primary') ||
            pinkNoiseButton.classList.contains('btn-primary') ||
            brownNoiseButton.classList.contains('btn-primary')) {
            playBtn.textContent = 'Stop';
            playBtn.classList.remove('btn-success');
            playBtn.classList.add('btn-danger');
        } else {
            playBtn.textContent = 'Play';
            playBtn.classList.remove('btn-danger');
            playBtn.classList.add('btn-success');
        }
    }

    // Event listener for the master play/stop button
    playBtn.addEventListener('click', function () {
        if (playBtn.textContent === 'Play') {
            playBtn.textContent = 'Stop';
            playBtn.classList.remove('btn-success');
            playBtn.classList.add('btn-danger');
        } else {
            playBtn.textContent = 'Play';
            playBtn.classList.remove('btn-danger');
            playBtn.classList.add('btn-success');
            whiteNoiseAudio.pause();
            pinkNoiseAudio.pause();
            brownNoiseAudio.pause();
            whiteNoiseButton.classList.remove('btn-primary');
            pinkNoiseButton.classList.remove('btn-primary');
            brownNoiseButton.classList.remove('btn-primary');
            whiteNoiseButton.classList.add('btn-outline-primary');
            pinkNoiseButton.classList.add('btn-outline-primary');
            brownNoiseButton.classList.add('btn-outline-primary');
        }
    });
});
