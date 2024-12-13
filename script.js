// Your script here.
// Get necessary DOM elements
const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const rateInput = document.getElementById("rate");
const pitchInput = document.getElementById("pitch");
const rateValue = document.getElementById("rate-value");
const pitchValue = document.getElementById("pitch-value");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");

let synth = window.speechSynthesis;
let voices = [];
let currentSpeech = null;

// Function to populate voice options
function populateVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = ""; // Clear the previous options
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = voice.name;
    option.value = voice.name;
    voiceSelect.appendChild(option);
  });
}

// Initial population of voices
populateVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = populateVoices;
}

// Update rate and pitch values on input change
rateInput.addEventListener("input", () => {
  rateValue.textContent = rateInput.value;
});

pitchInput.addEventListener("input", () => {
  pitchValue.textContent = pitchInput.value;
});

// Function to start speaking
function startSpeaking() {
  if (textInput.value !== "") {
    const speech = new SpeechSynthesisUtterance(textInput.value);
    const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
    speech.voice = selectedVoice;
    speech.rate = rateInput.value;
    speech.pitch = pitchInput.value;

    synth.speak(speech);
    currentSpeech = speech;
  }
}

// Function to stop speaking
function stopSpeaking() {
  if (currentSpeech) {
    synth.cancel();
  }
}

// Event listeners for Start and Stop buttons
startButton.addEventListener("click", startSpeaking);
stopButton.addEventListener("click", stopSpeaking);
