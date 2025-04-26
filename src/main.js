let keyPressed = {};
let voice;

function start(){
    const audioContext = new AudioContext();
    audioContext.audioWorklet.addModule("src/operator.js").then(()=>{
        voice = new InstrumentVoice(audioContext);
    });
}


function keyToFreq(key){
    let noteNumber = 0;
    switch(key){
        case 'a': noteNumber = 0;break;
        case 'w': noteNumber = 1;break;
        case 's': noteNumber = 2;break;
        case 'e': noteNumber = 3;break;
        case 'd': noteNumber = 4;break;
        case 'f': noteNumber = 5;break;
        case 't': noteNumber = 6;break;
        case 'g': noteNumber = 7;break;
        case 'y': noteNumber = 8;break;
        case 'h': noteNumber = 9;break;
        case 'u': noteNumber = 10;break;
        case 'j': noteNumber = 11;break;
        case 'k': noteNumber = 12;break;
        case 'o': noteNumber = 13;break;
        case 'l': noteNumber = 14;break;
        case 'p': noteNumber = 15;break;
        case ';': noteNumber = 16;break;
    }
    return 130.81 * (2 ** (noteNumber / 12));
}

window.addEventListener('keydown', (e)=>{
    if(keyPressed[e.key]) return;
    keyPressed[e.key] = true;
    voice.trigger(keyToFreq(e.key));
});

window.addEventListener('keyup', (e)=>{
    keyPressed[e.key] = false;
    voice.rel();
});
