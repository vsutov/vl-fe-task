import { HotzoneConfig } from '../const'

interface GazeData {
    x: number;
    y: number;
  }
  
const webgazer = window.webgazer

export const initWebgazer = (listener: (x: number, y: number) => void) => {
    webgazer.setGazeListener((data: GazeData | null) => {
        if (data !== null) {
            const x = Math.max(Math.min(data.x - HotzoneConfig.width / 2, (window.innerWidth - HotzoneConfig.width)), 0)
            const y = Math.max(Math.min(data.y - HotzoneConfig.height / 2, (window.innerHeight - HotzoneConfig.height)), 0)    

            listener(x, y)
        }
    })
    .begin()
}
  