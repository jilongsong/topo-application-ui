<template>
  <div class="w-full h-full p-4">
    <Tabs v-show="currentPage != PageSign.COMPONENTS" default-value="pages" class="w-full h-full">
      <TabsList class="w-full h-8">
        <TabsTrigger class="w-full h-6" value="pages"> 页面 </TabsTrigger>
        <TabsTrigger class="w-full h-6" value="layers"> 图层 </TabsTrigger>
        <TabsTrigger class="w-full h-6" value="assets"> 资源 </TabsTrigger>
      </TabsList>
      <TabsContent class="h-full" value="pages"> <Pages /> </TabsContent>
      <TabsContent class="h-full" value="layers"> <Layers /> </TabsContent>
      <TabsContent class="h-full" value="assets"> <Assets /> </TabsContent>
    </Tabs>
    <Components v-show="currentPage === PageSign.COMPONENTS" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { injectStrict } from '@pictode/vue-aide';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@topo/ui';

import { ActivityPage, PageSign } from '../../type';
import { ServicesKey } from '../../utils/inject-keys';

import Assets from './Assets.vue';
import Components from './Components.vue';
import Layers from './Layers.vue';
import Pages from './Pages.vue';

const { uiService } = injectStrict(ServicesKey);
const currentPage = computed(() => uiService.get<ActivityPage>('currentPage'));
</script>
