<script setup>
import { AutoComplete, Spin, notification } from 'ant-design-vue';
import { ref, watch } from 'vue';
import { watchDebounced } from '@vueuse/core'

const runtimeConfig = useRuntimeConfig()

const inputField = ref('');
const debouncedInputField = ref('');
const autoComplete = ref('');
const isLoading = ref(false);
const options = ref([]);
const searchValue = ref('');

const onSearch = (value) => {
    inputField.value = value;
}

const onSelect = (value) => {
    searchValue.value = value;
}

watchDebounced(inputField, () => {
  if(inputField.value) {
    debouncedInputField.value = inputField.value;
  }
}, { debounce: 1000 })

const fetchSuggestions = async () => {
    if (debouncedInputField.value) {
        try {
            isLoading.value = true
            const res = await $fetch(`https://api.giphy.com/v1/tags/related/${debouncedInputField.value}?api_key=${runtimeConfig.public.giphyKey}`);
            options.value = await res.data.map(item => ({ value: item.name, label: item.name }));
        } catch (error) {
            notification.error({message: 'Error', description: 'Could not fetch suggestions'});
            console.log(error);
        } finally {
            isLoading.value = false
        }
    }
}

watch(debouncedInputField, fetchSuggestions)
</script>

<template>
  <ClientOnly>
    <main>
        <div class="flex items-center sticky top-0 justify-start md:justify-center gap-2 p-4">
            <AutoComplete
                v-model:value="autoComplete"
                :options="options"
                class="w-[calc(100%-28px)] md:w-[300px]"
                :class="{ 'md:ml-[28px]': isLoading }"
                placeholder="Input here"
                @select="onSelect"
                @search="onSearch"
            />
            <Spin v-if="isLoading" class="h-[20px]" />
        </div>

        <GifList :searchValue="searchValue" />
    </main>
  </ClientOnly>
</template>

<style lang="scss" scoped></style>