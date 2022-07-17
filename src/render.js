//buttons
const videelement = document.querySelector('video');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoSelectBtn = document.getElementById('videoSelectBtn');
videoSelectBtn.onclick = getVideoSources;

const { desktopCapturer } = require('electron');

//get the available video sources
async function getVideoSources() {
    const inputsources = await desktopCapturer.getSources({
        types: ['window','screen']
    });

}