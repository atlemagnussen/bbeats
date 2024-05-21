import * as Tone from "tone"

let bineuralBeat = 10

const merge = new Tone.Merge().toDestination()
//const leftEar = new Tone.Oscillator()
//const rightEar = new Tone.Oscillator()
//const rainMaker = new Tone.Noise("pink").start().toMaster()

const freqs = calculateFreq(bineuralBeat)

const synth = new Tone.Synth().toDestination()
const synth2 = new Tone.Synth().toDestination()
export function playSynth() {
    const now = Tone.now()
    synth.triggerAttack(freqs.leftFrequency, now)
    synth2.triggerAttack(freqs.rightFrequency, now)
    //synth.triggerAttackRelease("C4", "8n", now)
    // synth.triggerAttackRelease("E4", "8n", now + 0.5)
    // synth.triggerAttackRelease("G4", "8n", now + 1)
}

synth.connect(merge, 0, 0)
synth2.connect(merge, 0, 1)
//leftEar.connect(merge, 0, 0)
//rightEar.connect(merge, 0, 1)



//leftEar.set({
//    frequency: "4n"
//})
//rightEar.set({
//    frequency: "3n"
//})

export async function play() {
    //await Tone.start()
    //rightEar.start()
    //leftEar.start()
}

function calculateCarrierFreq(binauralBeat: number) {
    // Formula retrieved by using excel on Oster's curve. Can be enhanced with real maths ;)
    // y = -0,2085x2 + 18,341x + 56,31
    return -0.2085 * Math.pow(binauralBeat, 2) + 18.341 * binauralBeat + 56.31
}

function calculateFreq(binauralBeat: number) {
    const carrierFreq = calculateCarrierFreq(binauralBeat)
    return {
        leftFrequency: carrierFreq + binauralBeat / 2,
        rightFrequency: carrierFreq - binauralBeat / 2
    }
}