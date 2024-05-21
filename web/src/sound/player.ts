import * as Tone from "tone"

let bineuralBeat = 10

const merge = new Tone.Merge().toDestination()
const leftEar = new Tone.Oscillator()
const rightEar = new Tone.Oscillator()
//const rainMaker = new Tone.Noise("pink").start().toMaster()

leftEar.connect(merge, 0, 0)
rightEar.connect(merge, 0, 1)

const freqs = calculateFreq(bineuralBeat)

leftEar.set({
    frequency: "4n"
})
rightEar.set({
    frequency: "3n"
})

export async function play() {
    await Tone.start()
    rightEar.start()
    leftEar.start()
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