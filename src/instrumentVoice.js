// instrumentVoice.js

function createOperatorNode(audioContext){
    const operatorNode = new AudioWorkletNode(
      audioContext,
      "operator-processor",
      {numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [1]}
    );
    return operatorNode;
}

class InstrumentVoice{
    constructor(audioContext, settings = {
        adsr : [
            {a:0.1,d:0.2,s:0.61,r:0.3},
            {a:0.1,d:0.2,s:0.61,r:0.3},
            {a:0.1,d:0.2,s:0.61,r:0.3},
            {a:0.1,d:0.2,s:0.61,r:0.3},
        ],
        ratio : [1,1,1,1],
        detune : [0,0,0,0],
        peakLevel : [1,1,1,1],
        connect : [{from:1,to:0},], // connections from operator to operator
        carrier : [1,0,0,0], // output to context destination
    }){
        const {adsr, ratio, detune, peakLevel, connect, carrier} = settings;
        this.audioContext = audioContext;
        this.adsr = adsr;
        this.operators = [];
        for(let i=0;i<4;i++){
            const operator = createOperatorNode(this.audioContext);
            const r = ratio[i];
            const d = detune[i];
            const p = peakLevel[i];
            operator.parameters.get('ratio').setValueAtTime(r, this.audioContext.currentTime);
            operator.parameters.get('detune').setValueAtTime(d, this.audioContext.currentTime);
            operator.parameters.get('peakLevel').setValueAtTime(p, this.audioContext.currentTime);
            this.operators.push(operator);
        }
        connect.forEach(connection => {
            this.operators[connection.from].connect(this.operators[connection.to]);
        });
        carrier.forEach(i => {
            this.operators[i].connect(this.audioContext.destination);
        });
    }
    trigger(frequency){
        this.operators.forEach((o,i)=>{
            o.parameters.get('frequency').setValueAtTime(frequency , this.audioContext.currentTime);
            o.parameters.get('level').cancelScheduledValues(this.audioContext.currentTime);
            o.parameters.get('level').setValueAtTime(o.parameters.get('level').value, this.audioContext.currentTime);
            o.parameters.get('level').linearRampToValueAtTime(1 , this.audioContext.currentTime + this.adsr[i].a);
            o.parameters.get('level').linearRampToValueAtTime(this.adsr[i].s , this.audioContext.currentTime + this.adsr[i].a + this.adsr[i].d);
        });
    }
    rel(){
        this.operators.forEach((o,i)=>{
            o.parameters.get('level').cancelScheduledValues(this.audioContext.currentTime);
            o.parameters.get('level').setValueAtTime(o.parameters.get('level').value, this.audioContext.currentTime);
            o.parameters.get('level').linearRampToValueAtTime(0 , this.audioContext.currentTime + this.adsr[i].r);
        });
    }
};

