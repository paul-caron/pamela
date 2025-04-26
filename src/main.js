// main.js

let keyPressed = {};
let voices = [];
const nVoices = 8;

function start(){
    const audioContext = new AudioContext();
    // using a custom audio node worklet with phase modulation
    audioContext.audioWorklet.addModule("src/operator.js").then(()=>{
        for(let i=0; i<nVoices; i++){
          const voice = new InstrumentVoice(audioContext, brassPad);
          voices.push(voice);
        }
    });
}

// voice allocator for polyphony
function getVoice(){
   for(let i = 0 ; i < nVoices; i++){
       let v = voices[i];
       if(i.playing === false){
          voices.splice(i,1); // remove voice
          voices.push(v); // put voice at back of the queue
          return v;
       }
   }
   // if all voices are playing, pick first one
   let v = voices.shift();
   voices.push(v); // push at back of the queue
   return v;
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
    const voice = getVoice();
    keyPressed[e.key] = voice;
    voice.trigger(keyToFreq(e.key));
});

window.addEventListener('keyup', (e)=>{
    const voice = keyPressed[e.key];
    if(!voice) return;
    voice.rel();
    keyPressed[e.key] = null;
});
