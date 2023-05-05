#  Videolevels frontend programming test
### Vladislav Šutov

A video player controlled by vision (eye tracking)

## DEMO
https://vl-fe-task.vercel.app/

## Important notes
- Code is written with prototyping purposes in mind, meaning that the functionality is basic and is not meant to work perfectly on all devices. Tested on a Macbook Pro 15" laptop.
- Whole flow is separated into two parts - calibration and actual video playback.
- Video playback is limited to autoplay without controls as the actual video is not as important as the eye tracking part of the assignment.

## Configuration

Done via changing on `const.ts` file in `src`:

```
- VideoConfig:
    - settings:
        - fluid: setting to keep the player sized to a particular aspect ratio
        - autoplay: autoplay the video on render

- HotzoneConfig:
    - width: width of the hotzone
    - height: height of the hotzone

- WebgazerConfig:
    - debugMode: setting to enable debug mode (a combination of showVideo, showFaceOverlay, showPredictionPoints) for Webgazer
    - bufferSize: size of buffer to calculate average gaze prediction. Bigger number - smoother but slower movement of hotzone

- CalibrationConfig:
    - requiredClicksPerPoint: setting to determine how many times user has to click on each calibration point
```

##  Technologies used

- Vite

- Typescript

- Svelte

- Webgazer

  

##  Scripts

###  Build

`npm run build`

  
###  Dev

`npm run dev`

  
###  Lint

`npm run lint`