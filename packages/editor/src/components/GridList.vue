<template>
  <div ref="containerRef" class="infinite-list-wrapper" @scroll="handleScroll">
    <div v-if="data.length === 0 && !loading">
      <slot name="empty">No Data</slot>
    </div>
    <div v-else class="list">
      <div v-for="(item, index) in data.slice(startIndex, endIndex)" :key="index" @click="emit('onSelectChange', item)">
        <slot :item="item" :index="index">
          {{ item }}
        </slot>
      </div>
    </div>
    <div v-if="loading" class="bottom">
      <slot name="loading"></slot>
    </div>
    <div v-if="noMore && data.length > 0" class="bottom">
      <slot name="noMore"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';

export interface Pagination {
  limit: number;
  page: number;
}

export interface RequestResult<T> {
  data: T[];
  total: number;
}

export type RequestFunc<T> = (pagination: Pagination) => Promise<RequestResult<T>> | RequestResult<T>;

const props = withDefaults(
  defineProps<{
    dataSource?: any[];
    request?: RequestFunc<any>;
    limit?: number;
    itemMinWidth?: number;
    itemMinHeight?: number;
    rowGap?: number;
    columnGap?: number;
    loadDistance?: number;
  }>(),
  {
    dataSource: () => [],
    limit: 30,
    itemMinWidth: 200,
    itemMinHeight: 200,
    rowGap: 0,
    columnGap: 0,
    loadDistance: 0,
  }
);

const emit = defineEmits<{
  (event: 'onSelectChange', value: any): void;
}>();

const containerRef = ref<HTMLDivElement>();
const containerHeight = ref<number>(0);
const containerWidth = ref<number>(0);
const loading = ref<boolean>(false);
const data = ref<any[]>([]);
const total = ref<number>(0);
const page = ref<number>(1);
const startIndex = ref<number>(0);
const endIndex = ref<number>(0);
const startOffset = ref<number>(0);

const phantomElement = document.createElement('div');
phantomElement.style.position = 'absolute';
phantomElement.style.left = '0';
phantomElement.style.top = '0';
phantomElement.style.right = '0';
phantomElement.style.zIndex = '-1';

/** 没有更多了 */
const noMore = computed<boolean>(
  () => total.value === 0 || data.value.length >= total.value || data.value.length < props.limit
);
/** 计算最小宽度的像素值 */
const itemMinWidth = computed<number>(() => {
  if (props.itemMinWidth < 0) {
    return containerWidth.value;
  } else if (props.itemMinWidth >= 0 && props.itemMinWidth <= 1) {
    return Math.floor(containerWidth.value * props.itemMinWidth);
  } else {
    return props.itemMinWidth;
  }
});
/** 计算最小高度的像素值 */
const itemMinHeight = computed<number>(() => {
  if (props.itemMinHeight < 0) {
    return containerHeight.value;
  } else if (props.itemMinHeight >= 0 && props.itemMinHeight <= 1) {
    return Math.floor(containerHeight.value * props.itemMinHeight);
  } else {
    return props.itemMinHeight;
  }
});
/** 计算列间距的像素值 */
const columnGap = computed<number>(() => props.columnGap);
/** 计算行间距的像素值 */
const rowGap = computed<number>(() => props.rowGap);
/** 计算列数 */
const columnNum = computed<number>(
  () => Math.floor((containerWidth.value - itemMinWidth.value) / (itemMinWidth.value + columnGap.value)) + 1
);
/** 计算行数 */
const rowNum = computed<number>(() => Math.ceil(data.value.length / columnNum.value));
/** 计算总高度 */
const listHeight = computed<number>(() =>
  Math.max(rowNum.value * itemMinHeight.value + (rowNum.value - 1) * rowGap.value, 0)
);
/** 可见行数 */
const visibleRowNum = computed<number>(
  () => Math.ceil((containerHeight.value - itemMinHeight.value) / (itemMinHeight.value + rowGap.value)) + 1
);
/** 可见item数量 */
const visibleCount = computed<number>(() => visibleRowNum.value * columnNum.value);

watchEffect(() => {
  endIndex.value = startIndex.value + visibleCount.value;
});

watch(
  () => props.dataSource,
  () => (data.value = [...props.dataSource]),
  { immediate: true }
);

watch(
  () => props.request,
  () => load(),
  { immediate: true }
);

watchEffect(() => (phantomElement.style.height = `${listHeight.value}px`));

const resizeObserver = new ResizeObserver(handleContainerResize);

onMounted(() => {
  if (containerRef.value) {
    containerRef.value.appendChild(phantomElement);
    resizeObserver.observe(containerRef.value);
    calculateStartIndex();
  }
});

onUnmounted(() => {
  resizeObserver.disconnect();
});

defineExpose({
  reload: () => {
    page.value = 1;
    data.value = [];
    load();
  },
});

function handleContainerResize() {
  nextTick(() => {
    if (containerRef.value) {
      containerHeight.value = containerRef.value.clientHeight;
      containerWidth.value = containerRef.value.clientWidth;
      calculateStartIndex();
    }
  });
}

function handleScroll(event: Event) {
  event.preventDefault();
  if (!containerRef.value) {
    return;
  }
  const canLoad =
    containerRef.value.scrollTop + containerRef.value.clientHeight >=
      containerRef.value.scrollHeight - props.loadDistance &&
    !loading.value &&
    !noMore.value;
  if (canLoad) {
    load();
  } else {
    calculateStartIndex();
  }
}

function calculateStartIndex() {
  if (!containerRef.value) {
    return;
  }
  const scrollTop = containerRef.value.scrollTop;
  const startRowNum = Math.ceil((scrollTop - itemMinHeight.value) / (itemMinHeight.value + rowGap.value));
  startIndex.value = startRowNum * columnNum.value;
  startOffset.value = scrollTop - (scrollTop % (itemMinHeight.value + rowGap.value));
}

async function load() {
  loading.value = true;
  let result: any;
  if (typeof props.request === 'function') {
    try {
      result = await props.request({
        limit: props.limit,
        page: page.value,
      });
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  } else {
    return;
  }

  if (result && Array.isArray(result.data)) {
    total.value = result.total || 0;
    data.value.push(...result.data);
  }
  if (!noMore.value) {
    page.value = page.value + 1;
  }
  loading.value = false;
}
</script>

<style lang="scss" scoped>
.infinite-list-wrapper {
  text-align: center;
  overflow-y: scroll;
  position: relative;
  -webkit-overflow-scrolling: touch;

  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(v-bind(itemMinWidth) * 1px), 1fr));
    grid-auto-rows: minmax(auto, calc(v-bind(itemMinHeight) * 1px));
    column-gap: calc(v-bind(columnGap) * 1px);
    row-gap: calc(v-bind(rowGap) * 1px);
    transform: translate3d(0, calc(v-bind(startOffset) * 1px), 0);

    div:first-of-type {
      grid-column-start: 1;
      grid-column-end: 1;
    }
  }
}

.bottom {
  width: 100%;
  position: absolute;
  top: calc(v-bind(listHeight) * 1px);
}
</style>
