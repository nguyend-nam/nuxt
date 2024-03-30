<script setup>
import { AutoComplete, Spin, notification } from 'ant-design-vue';
import { ref, watch } from 'vue';
import { watchDebounced } from '@vueuse/core'
import { SearchOutlined } from '@ant-design/icons-vue';

const runtimeConfig = useRuntimeConfig()

const inputField = ref('');
const debouncedInputField = ref('');
const autoComplete = ref('');
const isLoading = ref(false);
const options = ref([]);

const onSearch = (value) => {
  inputField.value = value;
}

const emits = defineEmits(['select'])

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

const suggestions = ref(['tottenham hotspur', 'dortmund', 'wwe', 'dean ambrose'])
</script>

<template>
  <header class="sticky top-0 flex items-center flex-col w-screen gap-4 py-4 shadow-md bg-white z-50">
    <div class="flex items-center justify-start md:justify-center gap-2 px-4 w-full">
      <AutoComplete
        :autofocus="true"
        v-model:value="autoComplete"
        :options="options"
        class="w-[calc(100%-38px)] md:w-[300px]"
        placeholder="Input here"
        @select="(value) => emits('select', value)"
        @search="onSearch"
      />
      <Spin v-if="isLoading" class="h-5 w-[30px]" />
      <button v-else @click="() => emits('select', inputField)" class="w-[30px] h-[30px] rounded flex justify-center items-center text-white bg-violet-700"><SearchOutlined class="text-sm h-[14px] flex" /></button>
    </div>

    <div class="flex gap-2 flex-wrap px-4">
      <button
        v-for="suggestion in suggestions"
        :key="suggestion"
        @click="() => emits('select', suggestion)"
        class="text-gray-500 bg-gray-100 border border-gray-200 px-2 py-1 text-[13px] rounded-lg"
        >
        {{ suggestion }}
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>