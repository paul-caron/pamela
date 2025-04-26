// presets.js

// example of an instrument settings
const defaultInstrument = {
    // adsr envelopes of each operators
    adsr : [
        {a:0.1,d:0.2,s:0.61,r:0.3},
        {a:0.1,d:0.2,s:0.61,r:0.3},
        {a:0.1,d:0.2,s:0.61,r:0.3},
        {a:0.1,d:0.2,s:0.61,r:0.3},
    ],
    ratio : [1,1,1,1], // ratio to base frequency
    detune : [0,0,0,0], // detune in cents -1200 to 1200 cents for octave down / up
    peakLevel : [1,1,1,1], // peak level of adsr envelope
    connect : [{from:1,to:0},], // connections from operator to operator
    carrier : [1,0,0,0], // booleans, output to context destination
    feedback : 0, // amount of self feedback on last operator
}

const brassPad = {
    adsr : [
        {a:0.2,d:0.4,s:0.7,r:2},
        {a:0.25,d:0.45,s:0.7,r:2},
        {a:0.2,d:0.4,s:0.7,r:2},
        {a:0.25,d:0.45,s:0.7,r:2},
    ],
    ratio : [1,1,1,1],
    detune : [0,5,10,-10],
    peakLevel : [0.15,0.3,0.10,0.3],
    connect : [{from:1,to:0},{from:3,to:2}],
    carrier : [1,0,1,0],
    feedback : 0.4,
}

