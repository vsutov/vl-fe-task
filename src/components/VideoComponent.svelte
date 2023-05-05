<script lang="ts">
    import videojs from 'video.js'
    import 'video.js/dist/video-js.min.css'

    import { onMount } from 'svelte'
    import { VideoConfig } from '../const'

    let videoElement: HTMLVideoElement

    onMount(() => {
        const player = videojs(videoElement, VideoConfig.settings)

        player.src(VideoConfig.player)
    })
</script>
  
<style>
.video-container {
    width: 100vw;
    height: 100vh;
}
</style>

<div class="video-container">
    <video 
        bind:this={videoElement}
        class="video-js vjs-default-skin"
        aria-hidden="true"
    />
</div>
