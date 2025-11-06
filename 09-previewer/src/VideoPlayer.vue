<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

defineProps<{
  src: string | undefined
}>()

const emit = defineEmits<{
  canplay: []
  metadata: [metadata: { width: number; height: number }]
}>()

const videoPlayer = useTemplateRef<HTMLVideoElement>('video')

const stats = ref({ resolution: '', duration: '' })

const updateStats = (e: Event) => {
  const videoEl = e.target as HTMLVideoElement
  stats.value.resolution = `${videoEl.videoWidth}x${videoEl.videoHeight}`
  stats.value.duration = videoEl.duration.toFixed(2)
  emit('canplay')
  emit('metadata', { width: videoEl.videoWidth, height: videoEl.videoHeight })
}

const makePreview = (): Promise<Blob> => {
  const videoEl = videoPlayer.value!
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  canvas.width = videoEl.videoWidth
  canvas.height = videoEl.videoHeight

  ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Failed to create blob'))
      }
    })
  })
}

defineExpose({
  makePreview,
})
</script>

<template>
  <div class="player">
    <video ref="video" controls :src @canplay="updateStats"></video>
    <div class="stats" v-if="stats.duration">
      Разрешение: {{ stats.resolution }} Длительность: {{ stats.duration }} сек.
    </div>
  </div>
</template>

<style scoped>
.player {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.player video {
  flex: 1;
}

.stats {
  margin-top: 10px;
}
</style>
