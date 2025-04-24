// operator.js
class OperatorProcessor extends AudioWorkletProcessor {

  static get parameterDescriptors(){
    return [
      { name: 'frequency', defaultValue: 440, minValue: 0},
      { name: 'level', defaultValue: 0, minValue: 0},
    ];
  }

  constructor(){
    super();
    this.phase = 0;
    this.sampleRateInv = 1 / sampleRate;
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0][0];
    const input = inputs[0][0]; // 1 input
    const frequency = parameters.frequency;
    const level = parameters.level;

    for (let i = 0; i < output.length; i++) {
      const f = frequency.length > 1 ? frequency[i] : frequency[0];
      let m = 0; // modulator

      if(input){
          m = input.length > 1 ? input[i] : input[0];
      }

      const phaseIncrement = Math.PI * 2 * f * this.sampleRateInv;
      const outputValue = Math.sin(this.phase + m * 2 * Math.PI);
      this.phase += phaseIncrement;
      const l = level.length > 1 ? level[i] : level[0];
      output[i] = outputValue * l;
    }

    return true;

  }

}

registerProcessor("operator-processor", OperatorProcessor);
