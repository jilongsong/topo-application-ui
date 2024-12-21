<template>
  <div class="topo-ui-container">
    <swiper
      ref="swiperInstance"
      style="width: 100%; height: 100%"
      :modules="modules"
      :autoplay="config.property.autoplay"
      :slides-per-view="1"
      :space-between="10"
      :navigation="true"
      :pagination="true"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <swiper-slide v-for="({ config, context }, index) in configItems" :key="index">
        <topo-ui-component :config="config" :context="context"></topo-ui-component>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import type { Swiper as SwiperType } from 'swiper';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { ComponentProps } from '@topo/core';

// 导入 Swiper 样式
import 'swiper/css';
import 'swiper/css/pagination';

// const props = withDefaults(defineProps<Props>(), {
//   slidesPerView: 1,
//   spaceBetween: 50,
//   navigation: true,
//   pagination: { clickable: true },
// });
import { MCarousel } from './type';

const modules = ref([Navigation, Pagination, Scrollbar, A11y]);

const { config, defineRefState } = defineProps<ComponentProps<MCarousel>>();

const swiperInstance = ref<SwiperType | null>(null);

const activeIndex = defineRefState<number>('activeIndex', config.property.activeIndex);

const configItems = computed(() => config.items.map((item) => ({ config: item, context: { currentItem: item } })));

// const carouselRef = ref<CarouselInstance>();

// const changeCarousel = (type: 'prev' | 'next') => carouselRef.value?.[type]();

// provideMethod('setPrev', () => changeCarousel('prev'));

// provideMethod('setNext', () => changeCarousel('next'));

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
};

const onSlideChange = () => {};

watch(
  () => activeIndex.value,
  (newValue) => {
    if (swiperInstance.value && newValue !== undefined) {
      swiperInstance.value.slideTo(newValue);
    }
  }
);
</script>
