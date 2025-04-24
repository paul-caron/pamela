function createOperatorNode(audioContext){
    const operatorNode = new AudioWorkletNode(
      audioContext,
      "operator-processor",
      {numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [1]}
    );
    return operatorNode;
}

class InstrumentVoice{
    constructor(audioContext, envelope = {attack: 0.1, decay: 0.3, sustain: 0.7, release: 0.5}){
        this.audioContext = audioContext;
        this.attack = envelope.attack;
        this.decay = envelope.decay;
        this.sustain = envelope.sustain;
        this.release = envelope.release;
        this.operators = [];
        for(let i=0;i<4;i++){
            this.operators.push(createOperatorNode(this.audioContext));
        }
        // connections, patching, according the instrument's characteristics
        this.operators[0].connect(this.audioContext.destination);
        this.operators[1].connect(this.operators[0]);
        // brassy kind of patch for now with two operators
    }

    trigger(frequency){
        this.operators.forEach(o=>{
            o.parameters.get('frequency').setValueAtTime(frequency , this.audioContext.currentTime);
            o.parameters.get('level').cancelScheduledValues(this.audioContext.currentTime);
            o.parameters.get('level').setValueAtTime(o.parameters.get('level').value, this.audioContext.currentTime);
            o.parameters.get('level').linearRampToValueAtTime(1 , this.audioContext.currentTime + this.attack);
            o.parameters.get('level').linearRampToValueAtTime(this.sustain , this.audioContext.currentTime + this.attack + this.decay);
        });
    }

    rel(){
        this.operators.forEach(o=>{
            o.parameters.get('level').cancelScheduledValues(this.audioContext.currentTime);
            o.parameters.get('level').setValueAtTime(o.parameters.get('level').value, this.audioContext.currentTime);
            o.parameters.get('level').linearRampToValueAtTime(0 , this.audioContext.currentTime + this.release);
        });
    }
};

