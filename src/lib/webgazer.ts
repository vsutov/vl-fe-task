import { HotzoneConfig, WebgazerConfig } from '../const'

interface GazeData {
    x: number;
    y: number;
  }
  
const webgazer = window.webgazer
const bufferSize = WebgazerConfig.bufferSize
const gazeBuffer: GazeData[] = []

const addToBuffer = (value: GazeData) => {
    if (gazeBuffer.length >= bufferSize) {
        gazeBuffer.shift()
    }
    gazeBuffer.push(value)
}

const averageBuffer = (buffer: number[]) => {
    const sum = buffer.reduce(
        (accumulator, currentValue) => accumulator + currentValue
    )
    return sum / buffer.length
}

export const initWebgazer = (listener: (x: number, y: number) => void) => {
    webgazer
      .applyKalmanFilter(false)
      .showVideo(WebgazerConfig.debugMode)
      .showFaceOverlay(WebgazerConfig.debugMode)
      .showPredictionPoints(WebgazerConfig.debugMode)
      .setGazeListener((data: GazeData | null) => {
        if (data !== null) {
          addToBuffer({ x: data.x, y: data.y })
  
          const averageGaze = {
            x: averageBuffer(gazeBuffer.map(gaze => gaze.x)),
            y: averageBuffer(gazeBuffer.map(gaze => gaze.y)),
          }
  
          const x = Math.max(Math.min(averageGaze.x - HotzoneConfig.width / 2, (window.innerWidth - HotzoneConfig.width)), 0)
          const y = Math.max(Math.min(averageGaze.y - HotzoneConfig.height / 2, (window.innerHeight - HotzoneConfig.height)), 0)        
  
          listener(x, y)
        }
    })
    .begin()
}
  