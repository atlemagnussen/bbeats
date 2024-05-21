import { Signal } from "signal-polyfill"
import * as Tone from "tone"


export const isPlaying = new Signal.State(false)


let bineuralBeat = 10

const merge = new Tone.Merge().toDestination()
const leftEar = new Tone.Oscillator()
const rightEar = new Tone.Oscillator()
//const rainMaker = new Tone.Noise("pink").start().toMaster()

const freqs = calculateFreq(bineuralBeat)

export async function play() {
    if (isPlaying.get())
        return
    await Tone.start()
    leftEar.set({ frequency: freqs.left, type: "sine"})
    rightEar.set({ frequency: freqs.right, type: "sine"})
    leftEar.connect(merge, 0, 0)
    rightEar.connect(merge, 0, 1)
    rightEar.start()
    leftEar.start()
    isPlaying.set(true)
}

export async function stop() {
    if (!isPlaying.get())
        return
    rightEar.stop()
    leftEar.stop()
    isPlaying.set(false)
}

function calculateCarrierFreq(binauralBeat: number) {
    // Formula retrieved by using excel on Oster's curve. Can be enhanced with real maths ;)
    // y = -0,2085x2 + 18,341x + 56,31
    return -0.2085 * Math.pow(binauralBeat, 2) + 18.341 * binauralBeat + 56.31
}

function calculateFreq(binauralBeat: number) {
    const carrierFreq = calculateCarrierFreq(binauralBeat)
    return {
        left: carrierFreq + binauralBeat / 2,
        right: carrierFreq - binauralBeat / 2
    }
}