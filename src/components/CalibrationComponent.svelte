<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  interface CalibrationPosition {
    x: string;
    y: string;
  }

  const dispatch = createEventDispatcher()

  let currentPointIndex = 0

  const positions: CalibrationPosition[] = [
    { x: '5%', y: '5%' },
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
    currentPointIndex++

    if (currentPointIndex === positions.length) {
      dispatch('calibration-complete')
    }
  }
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
  <div class="calibration-points">
    {#each positions as position, index}
      <button
        on:click={nextCalibrationPoint}
        class="calibration-point {index === currentPointIndex ? 'active' : ''}"
        style="left: {position.x}; top: {position.y}"
      />
    {/each}
  </div>
</div>
  