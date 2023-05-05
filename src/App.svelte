<script lang="ts">
  import Video from './components/VideoComponent.svelte'
  import Calibration from './components/CalibrationComponent.svelte'
  import { initWebgazer } from './lib/webgazer'
  import { onMount } from 'svelte'

  let isCalibrating = true

  let gazeX = 0
  let gazeY = 0

  onMount(() => {
    initWebgazer((x, y) => {
      gazeX = x
      gazeY = y
    })
  })
</script>

{#if isCalibrating}
  <Calibration on:calibration-complete={() => (isCalibrating = false)} />
{:else}
  <Video {gazeX} {gazeY} />
{/if}