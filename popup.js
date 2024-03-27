document.addEventListener('DOMContentLoaded', function () {
    var playBtn = document.getElementById('playStopBtn');
    var masterVolumeSlider = document.getElementById('masterNoiseVolume');
    var noiseButtons = document.querySelectorAll('[id$="NoiseButton"]');
    var volumeSliders = document.querySelectorAll('[id$="NoiseVolume"]');
  
    var noises = [
      { buttonId: 'whiteNoiseButton', audio: new Audio('noise/03-White-Noise-60min.mp3'), volume: 1.0 },
      { buttonId: 'dryerNoiseButton', audio: new Audio('noise/04-Dryer-60min.mp3'), volume: 1.0 },
      { buttonId: 'fan1NoiseButton', audio: new Audio('noise/05-Fan-60min.mp3'), volume: 1.0 },
      { buttonId: 'fan2NoiseButton', audio: new Audio('noise/33-Fan-60min.mp3'), volume: 1.0 },
      { buttonId: 'pinkNoiseButton', audio: new Audio('noise/07-PinkNoise-60min.mp3'), volume: 1.0 },
      { buttonId: 'rain1NoiseButton', audio: new Audio('noise/08-Rain-60min.mp3'), volume: 1.0 },
      { buttonId: 'rain2NoiseButton', audio: new Audio('noise/42-Rain-60min.mp3'), volume: 1.0 },
      { buttonId: 'rain3NoiseButton', audio: new Audio('noise/44-Rain-60min.mp3'), volume: 1.0 },
      { buttonId: 'heaterNoiseButton', audio: new Audio('noise/22-Heater-60min.mp3'), volume: 1.0 },
      { buttonId: 'ocean1NoiseButton', audio: new Audio('noise/25-Ocean-60min.mp3'), volume: 1.0 },
      { buttonId: 'ocean2NoiseButton', audio: new Audio('noise/26-Ocean-60min.mp3'), volume: 1.0 },
      { buttonId: 'underwater1NoiseButton', audio: new Audio('noise/46-Underwater-60min.mp3'), volume: 1.0 },
      { buttonId: 'underwater2NoiseButton', audio: new Audio('noise/49-Underwater-60min.mp3'), volume: 1.0 },
      { buttonId: 'waterfallNoiseButton', audio: new Audio('noise/32-Waterfall-60min.mp3'), volume: 1.0 }
    ];
  
    let savedState = {};
  
    // Event listener for noise buttons
    noiseButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var noise = noises.find(function (n) { return n.buttonId === button.id; });
        if (noise) {
          var volumeInput = document.getElementById(noise.buttonId.replace('Button', 'Volume'));
          toggleNoise(button, noise.audio, volumeInput);
        }
      });
    });
  
    // Event listener for master volume slider
    masterVolumeSlider.addEventListener('input', function () {
      noises.forEach(function (noise) {
        noise.audio.volume = noise.volume * (masterVolumeSlider.value / 100);
      });
    });
  
    // Volume Resetter
    volumeSliders.forEach(function (slider) {
      slider.addEventListener('dblclick', function () {
        slider.value = 50;
        updateNoiseVolume(slider);
      });
    });
  
    // Event listener for master play/stop button
    playBtn.addEventListener('click', function () {
      var isPlaying = playBtn.textContent === 'Stop';
      playBtn.textContent = isPlaying ? 'Play' : 'Stop';
      playBtn.classList.toggle('btn-success');
      playBtn.classList.toggle('btn-danger');
  
      if (isPlaying) {
        // Save the state of each noise button when stopping
        noiseButtons.forEach(function (button) {
          savedState[button.id] = button.classList.contains('btn-primary');
          button.classList.remove('btn-primary');
          button.classList.add('btn-outline-primary');
        });
  
        noises.forEach(function (noise) {
          noise.audio.pause();
        });
      } else {
        // Restore the state of each noise button when playing
        noiseButtons.forEach(function (button) {
          if (savedState[button.id]) {
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-primary');
            var volumeInput = document.getElementById(button.id.replace('Button', 'Volume'));
            var noise = noises.find(function (n) { return n.buttonId === button.id; });
            noise.audio.volume = volumeInput.value / 100 * (masterVolumeSlider.value / 100);
            noise.audio.play();
          }
        });
      }
  
      updatePlayButton();
    });
  
    // Function to toggle noise buttons and play/stop audio
    function toggleNoise(button, audio, volumeInput) {
      if (audio.paused) {
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-primary');
        audio.volume = volumeInput.value / 100 * (masterVolumeSlider.value / 100);
        audio.play();
      } else {
        button.classList.remove('btn-primary');
        button.classList.add('btn-outline-primary');
        audio.pause();
      }
      updatePlayButton();
    }
  
    function updatePlayButton() {
      var isPlaying = Array.from(noiseButtons).some(function (button) {
        return button.classList.contains('btn-primary');
      });
      playBtn.textContent = isPlaying ? 'Stop' : 'Play';
      playBtn.classList.remove(isPlaying ? 'btn-success' : 'btn-danger');
      playBtn.classList.add(isPlaying ? 'btn-danger' : 'btn-success');
    }
  
    // Function to update noise volume based on slider input
    function updateNoiseVolume(volumeInput) {
      var buttonId = volumeInput.id.replace('Volume', 'Button');
      var button = document.getElementById(buttonId);
      var noise = noises.find(function (n) { return n.buttonId === buttonId; });
      if (noise && button.classList.contains('btn-primary')) {
        noise.volume = volumeInput.value / 100;
        noise.audio.volume = noise.volume * (masterVolumeSlider.value / 100);
      }
    }
  
    // Event listener for individual noise volume sliders
    volumeSliders.forEach(function (slider) {
      slider.addEventListener('input', function () {
        updateNoiseVolume(slider);
      });
    });
  });
  