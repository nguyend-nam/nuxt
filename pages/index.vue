<script setup>
import { ref } from 'vue';

const searchValue = ref('');

const onSelect = (value) => {
  searchValue.value = value;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <ClientOnly>
    <main>
      <SearchHeader @select="onSelect" />
      <GifList :searchValue="searchValue" />
    </main>
  </ClientOnly>
</template>

<style lang="scss" scoped></style>