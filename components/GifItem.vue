<script setup>
import { ref } from 'vue'
import { Drawer, Avatar } from 'ant-design-vue';

const isOpen = ref(false)

const showDrawer = () => {
  isOpen.value = true;
};

const closeDrawer = () => {
  isOpen.value = false;
};

const props = defineProps(['gif'])

const imgSrc = 
  props.gif?.images?.original?.url ||
  props.gif?.images?.fixed_height?.url || 
  props.gif?.images?.fixed_width?.url || 
  props.gif?.images?.fixed_height_downsampled?.url || 
  props.gif?.images?.fixed_width_downsampled?.url
</script>

<template>
  <div v-if="!!gif?.images" role="button" @click="showDrawer" class="w-[calc((100%-8px)/2)] md:w-[calc((100%-16px)/3)] h-[200px] bg-gray-300 rounded-lg" >
      <img :src="imgSrc" :alt="gif.name" class="w-full h-full object-cover rounded-lg" />
  </div>
  <Drawer :open="isOpen" @close="closeDrawer" rootClassName="w-screen">
    <div v-if="!!gif?.user" class="relative h-[120px] md:h-[140px]">
      <img v-if="gif.user?.banner_url" :src="gif.user?.banner_url" :alt="gif.user?.username" class="w-full h-[120px] md:h-[140px] object-cover" />
      <img v-else class="w-full h-[120px] md:h-[140px] bg-gradient-to-r from-blue-700 to-violet-600" />

      <div class="bg-gradient-to-t from-black/90 to-transparent absolute bottom-0 w-full h-[80px] md:h-[100px]"></div>

      <div class="flex gap-2 absolute bottom-5 left-5 pr-5">
        <Avatar :size="40" :src="gif.user?.avatar_url" class="border border-white shrink-0" />
        <div class="flex flex-col gap-0.5">
          <span class="text-white text-lg font-semibold leading-[125%] line-clamp-1">{{ gif.user?.display_name || '-' }}</span>
          <span class="text-gray-200 text-xs leading-[125%] line-clamp-1">{{ gif.user?.username || '-' }}</span>
        </div>
      </div>
    </div>

    <div class="p-5">  
      <img :src="imgSrc" :alt="gif?.slug" class="w-full h-auto object-cover rounded-lg" />
      <p v-if="gif?.title" class="mt-2.5 text-sm">{{ gif?.title }}</p>
      <a :href="imgSrc" target="_blank" class="block mt-4">
        <button class="px-4 py-2.5 text-white font-semibold w-full rounded-md bg-gradient-to-r from-violet-700 to-blue-600">View Gif</button>
      </a>
    </div>
  </Drawer>
</template>


<style lang="scss" scoped></style>