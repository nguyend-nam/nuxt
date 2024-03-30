<script setup>
import { ref } from 'vue';
import { ArrowUpOutlined } from '@ant-design/icons-vue';

const searchValue = ref('');

const onSelect = (value) => {
  searchValue.value = value;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const { isAtTop, scrollToTop } = useScrollToTop();
</script>

<template>
  <ClientOnly>
    <main>
      <SearchHeader @select="onSelect" />
      <GifList :searchValue="searchValue" />
    </main>
    <button
      class="w-[30px] h-[30px] rounded flex justify-center items-center text-white bg-violet-700 fixed bottom-5 right-5 transition-opacity duration-200 ease-in-out z-50"
      :class="{'opacity-0 pointer-events-none': isAtTop, 'opacity-100 pointer-events-auto': !isAtTop}"
      @click="scrollToTop"
    >
      <ArrowUpOutlined />
    </button>
  </ClientOnly>
</template>

<style lang="scss" scoped></style>