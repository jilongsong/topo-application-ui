<template>
  <video ref="videoRef" @loadeddata="onLoadeddata" @play="onPlay" @pause="onPause"></video>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import HLS from 'hls.js';

import { ComponentProps } from '@topo/core';

import { MVideo } from './type';

const { emit, defineRefState, provideMethod, config } = defineProps<ComponentProps<MVideo>>();

const src = defineRefState<string>('src', config.src ?? '');
const videoType = defineRefState<string>('videoType', config.videoType);

const videoRef = ref<HTMLVideoElement>();
const hls = ref<HLS>(new HLS());

watchEffect(() => {
  if (!videoRef.value) {
    return;
  }
  const videoSrc = src.value ?? '';
  if (videoRef.value?.canPlayType(videoType.value ?? '')) {
    videoRef.value.src = videoSrc;
  } else if (HLS.isSupported()) {
    hls.value.loadSource(videoSrc);
  }
});

watchEffect(() => {
  if (!videoRef.value) {
    return;
  }

  videoRef.value.autoplay = config.autoplay;
  videoRef.value.preload = 'auto';
  videoRef.value.controls = config.controls;
  videoRef.value.poster = config.poster;
  videoRef.value.muted = !config.muted;
  videoRef.value.playbackRate = config.playbackRate;
});

onMounted(() => {
  if (!videoRef.value) {
    return;
  }
  hls.value.attachMedia(videoRef.value);
});

onUnmounted(() => {
  hls.value.destroy();
});

provideMethod('play', () => {
  if (videoRef.value) {
    videoRef.value.play();
  }
});

provideMethod('pause', () => {
  if (videoRef.value) {
    videoRef.value.pause();
  }
});

const onLoadeddata = () => {
  emit('video:loaded');
};

const onPlay = () => {
  emit('video:play');
};

const onPause = () => {
  emit('video:pause');
};
</script>
