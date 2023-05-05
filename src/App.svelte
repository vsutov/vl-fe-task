<script lang="ts">
  import Video from './components/VideoComponent.svelte'
  import { initWebgazer } from './lib/webgazer'
  import { onMount } from 'svelte'

  let gazeX = 0
  let gazeY = 0

  onMount(() => {
    initWebgazer((x, y) => {
      gazeX = x
      gazeY = y
    })
  })
</script>

<Video {gazeX} {gazeY} />