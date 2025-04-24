let voice;

function start(){
    const audioContext = new AudioContext();
    audioContext.audioWorklet.addModule("src/operator.js").then(()=>{
        voice = new InstrumentVoice(audioContext);
    });
}

window.addEventListener('keydown', (e)=>{
    if(e.key == ' ') {
        voice.trigger(130);
    }
});

window.addEventListener('keyup', (e)=>{
    if(e.key == ' ') {
        voice.rel();
    }
});
