<script lang="ts">
    import videojs from 'video.js'
    import 'video.js/dist/video-js.min.css'

    import { onMount } from 'svelte'
    import { VideoConfig, HotzoneConfig } from '../const'

    export let gazeX: number
    export let gazeY: number

    let videoElement: HTMLVideoElement

    onMount(() => {
      const player = videojs(videoElement, VideoConfig.settings)

      player.src(VideoConfig.player)
    })
</script>
  
<style>
.video-container {
    position: relative;
    width: 100vw;
    height: 100%;
    cursor: none;
}

.hot-zone {
    position: absolute;
    box-shadow: 0 0 0 9999px rgba(255, 255, 255, 0.75);
    border: 5px solid rgba(255, 77, 0, 0.8);
    width: var(--hotZoneWidth);
    height: var(--hotZoneHeight);
    top: var(--gazeY);
    left: var(--gazeX);
    filter: drop-shadow(0.2rem 0.2rem 1rem rgba(0,0,0, 0.75));
    transition: top 0.2s, left 0.2s;
    cursor: none;
}
</style>

<div class="video-container">
    <video 
        bind:this={videoElement}
        class="video-js vjs-default-skin"
        aria-hidden="true"
    />
</div>

<div 
    class="hot-zone"
    style="--gazeX: {gazeX}px; --gazeY: {gazeY}px; --hotZoneWidth: {HotzoneConfig.width}px; --hotZoneHeight: {HotzoneConfig.height}px"
/>
