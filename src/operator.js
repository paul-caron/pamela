// operator.js
class OperatorProcessor extends AudioWorkletProcessor {

  static get parameterDescriptors(){
    return [
      { name: 'frequency', defaultValue: 440, minValue: 0},
      { name: 'level', defaultValue: 0, minValue: 0},
      { name: 'peakLevel', defaultValue: 1, minValue: 0},
      { name: 'ratio', defaultValue: 1, minValue: 0},
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
    const peakLevel = parameters.peakLevel;
    const ratio = parameters.ratio;

    for (let i = 0; i < output.length; i++) {

      // ratio
      const r = ratio.length > 1 ? ratio[i] : ratio[0];

      // base frequency
      const f = frequency.length > 1 ? r * frequency[i] : r * frequency[0];

      // modulator input
      let m = 0;

      if(input){
          m = input.length > 1 ? input[i] : input[0];
      }

      const phaseIncrement = Math.PI * 2 * f * this.sampleRateInv;
      const outputValue = Math.sin(this.phase + m * 2 * Math.PI);
      this.phase += phaseIncrement;

      const l = level.length > 1 ? level[i] : level[0];
      const p = peakLevel.length > 1 ? peakLevel[i] : peakLevel[0];
      output[i] = outputValue * l * p;

    }

    return true;

  }

}

registerProcessor("operator-processor", OperatorProcessor);
