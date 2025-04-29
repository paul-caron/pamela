// presets.js

// example of an instrument presets settings
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
    peakLevel : [0.1,0.3,0.1,0.3],
    connect : [{from:1,to:0},{from:3,to:2}],
    carrier : [1,0,1,0],
    feedback : 0.5,
}

const bass = {
    adsr : [
        {a:0.1,d:0.0,s:1,r:0.4},
        {a:0.1,d:0.0,s:1,r:0.4},
        {a:0.2,d:0.3,s:0,r:0.0},
        {a:0.2,d:0.3,s:0,r:0.0},
    ],
    ratio : [1,0.5,0.5,1],
    detune : [0,0,0,0],
    peakLevel : [0.3,0.3,0.3,0.3],
    connect : [{from:3,to:2},{from:2,to:0}],
    carrier : [1,0,0,0],
    feedback : 0.5,
}

const snare = {
    adsr : [
        {a:0.05,d:0.0,s:1,r:0.2},
        {a:0.05,d:0.0,s:1,r:0.2},
        {a:0.05,d:0.1,s:0,r:0.0},
        {a:0.05,d:0.1,s:0,r:0.0},
    ],
    ratio : [0.5,0.25,0.25,0.5],
    detune : [0,0,0,0],
    peakLevel : [0.3,0.3,0.3,0.3],
    connect : [{from:3,to:0}],
    carrier : [0,0,0,1],
    feedback : 5,
}

const kick = {
    adsr : [
        {a:0.05,d:0.0,s:1,r:0.6},
        {a:0.05,d:0.0,s:1,r:0.6},
        {a:0.05,d:0.2,s:0,r:0.0},
        {a:0.05,d:0.1,s:0,r:0.0},
    ],
    ratio : [0.5,0.25,0.25,0.25],
    detune : [0,0,0,0],
    peakLevel : [0.7,0.3,0.3,0.4],
    connect : [{from:3,to:2},{from:2,to:0}],
    carrier : [1,0,0,0],
    feedback : 0.5,
}
