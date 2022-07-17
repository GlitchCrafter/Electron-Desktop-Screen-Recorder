//buttons
const videoElement = document.querySelector('video');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoSelectBtn = document.getElementById('videoSelectBtn');
videoSelectBtn.onclick = getVideoSources;

const { desktopCapturer, remote } = Require('electron');
const { Menu } = remote;

//get the available video sources
async function getVideoSources() {
    const inputSources = await desktopCapturer.getSources({
      types: ['window', 'screen']
    });
  
    const videoOptionsMenu = Menu.buildFromTemplate(
      inputSources.map(source => {
        return {
          label: source.name,
          click: () => selectSource(source)
        };
      })
    );
  
  
    videoOptionsMenu.popup();
  }

async function selectSource(source) {
    videoSelectBtn.innerText = source.name;
    const constraints = {
        audio: false,
        video: {
            Mandatory: {
                chromeMediaSource:'desktop',
                chromeMediaSourceId: source.id
            }
        }
        
    }
    //Create a Stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // preview the source in a video element
    videoElement.srcObject = stream; 
    videoElement.play();
}