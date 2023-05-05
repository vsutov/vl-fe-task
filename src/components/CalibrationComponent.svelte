<script lang="ts">
  import { CalibrationConfig, WebgazerConfig } from '../const'
  import { createEventDispatcher, onMount } from 'svelte'

  interface CalibrationPosition {
    x: string;
    y: string;
  }

  const dispatch = createEventDispatcher()

  let currentPointIndex = 0
  let currentClickCount = 0
  let cameraPermissionGranted = false

  const positions: CalibrationPosition[] = [
    { x: WebgazerConfig.debugMode ? '20%' : '5%', y: '5%' },
    { x: '95%', y: '5%' },
    { x: '5%', y: '95%' }, 
    { x: '95%', y: '95%' },
    { x: '50%', y: '5%' }, 
    { x: '50%', y: '95%' },
    { x: '5%', y: '50%' }, 
    { x: '95%', y: '50%' }, 
    { x: '50%', y: '50%' },
  ]

  const nextCalibrationPoint = () => {
    currentClickCount++

    if (currentClickCount === CalibrationConfig.requiredClicksPerPoint) {
      currentPointIndex++
      currentClickCount = 0
    }
    if (currentPointIndex === positions.length) {
      dispatch('calibration-complete')
    }
  }

  onMount(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
      cameraPermissionGranted = true
    } catch (err) {
      console.error('Camera permission denied:', err)
      alert('Camera permission required!')
    }
  })
</script>

<style>
  .calibration-container {
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .calibration-instructions {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  .calibration-points {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .calibration-point {
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    display: none;
    cursor: pointer;
  }

  .calibration-point.active {
    display: block;
  }
</style>

<div class="calibration-container">
  <div class="calibration-instructions">
    {#if cameraPermissionGranted}
      <p>Calibration phase</p>
      <p>Make sure you are in a well-lit environment and your webcam is positioned infront of you</p>
      <p>Look directly at the circles and click them until they disappear 💨</p>
    {:else}
      <p>Awaiting camera permissions... 🔎📷</p>
    {/if}
  </div>

  <div class="calibration-points">
    {#if cameraPermissionGranted}
      {#each positions as position, index}
        <button
          on:click={nextCalibrationPoint}
          class="calibration-point {index === currentPointIndex ? 'active' : ''}"
          style="left: {position.x}; top: {position.y}"
        />
      {/each}
    {/if}
  </div>
</div>
  