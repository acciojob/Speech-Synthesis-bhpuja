// Your script here.
// Get necessary DOM elements

// script.js
const textBox = document.getElementById('text-box');
const voiceSelect = document.getElementById('voice-select');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');

let voices = [];
let speech = new SpeechSynthesisUtterance();

// Populate voices in the dropdown
function populateVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}
populateVoices();
speechSynthesis.addEventListener('voiceschanged', populateVoices);

// Start speaking
startButton.addEventListener('click', () => {
    if (speechSynthesis.speaking) return;
    speech.text = textBox.value;
    speech.voice = voices.find(voice => voice.name === voiceSelect.value);
    speech.rate = rateInput.value;
    speech.pitch = pitchInput.value;
    speechSynthesis.speak(speech);
    stopButton.disabled = false;
});

// Stop speaking
stopButton.addEventListener('click', () => {
    speechSynthesis.cancel();
    stopButton.disabled = true;
});

// Disable stop button when speech ends
speech.addEventListener('end', () => {
    stopButton.disabled = true;
});
