import { Signal } from "signal-polyfill"
import * as Tone from "tone"


export const isPlayingState = new Signal.State(false)
export const playingFreq = new Signal.State(10)


const merge = new Tone.Merge().toDestination()
const leftEar = new Tone.Oscillator()
const rightEar = new Tone.Oscillator()
//const rainMaker = new Tone.Noise("pink").start().toMaster()

export const freqs = new Signal.Computed(() => {
    return calculateFreq(playingFreq.get())
})

export async function play() {
    if (isPlayingState.get())
        return
    await Tone.start()
    leftEar.set({ frequency: freqs.get().left, type: "sine"})
    rightEar.set({ frequency: freqs.get().right, type: "sine"})
    leftEar.connect(merge, 0, 0)
    rightEar.connect(merge, 0, 1)
    rightEar.start()
    leftEar.start()
    isPlayingState.set(true)
}

export async function stop() {
    if (!isPlayingState.get())
        return
    rightEar.stop()
    leftEar.stop()
    console.log("stop")
    isPlayingState.set(false)
}

function calculateCarrierFreq(binauralBeat: number) {
    // Formula retrieved by using excel on Oster's curve. Can be enhanced with real maths ;)
    // y = -0,2085x2 + 18,341x + 56,31
    return -0.2085 * Math.pow(binauralBeat, 2) + 18.341 * binauralBeat + 56.31
}

function calculateFreq(binauralBeat: number) {
    const carrierFreq = calculateCarrierFreq(binauralBeat)
    const left = (carrierFreq + binauralBeat / 2).toFixed(2)
    const right = (carrierFreq - binauralBeat / 2).toFixed(2)
    return { left, right }
}