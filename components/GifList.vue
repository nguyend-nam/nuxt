<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import { AutoComplete, Spin } from 'ant-design-vue';

const runtimeConfig = useRuntimeConfig()

const props = defineProps(['searchValue'])
const checkpoint = ref(0)

const loadingMore = ref(null)
const isLoadingMoreVisible = useElementVisibility(loadingMore)
const showLoadMore = ref(false)

const gifsList = ref([])
const isLoading = ref(false);

const getGifs = async () => {
    if (!props.searchValue) return
    try {
        isLoading.value = true
        const res = await $fetch(`https://api.giphy.com/v1/gifs/search?api_key=${runtimeConfig.public.giphyKey}&q=${props.searchValue}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
        const data = await res.data
        gifsList.value = data
        setTimeout(() => {
            showLoadMore.value = true
        })
    } catch (error) {
        notification.error({message: 'Error', description: 'Could not fetch gifs'});
        console.log(error);
    } finally {
        isLoading.value = false
    }
}

const getMoreGifs = async () => {
    if (showLoadMore.value === false || !props.searchValue) return
    checkpoint.value += 25
    try {
        isLoading.value = true
        const res = await $fetch(`https://api.giphy.com/v1/gifs/search?api_key=${runtimeConfig.public.giphyKey}&q=${props.searchValue}&limit=25&offset=${checkpoint.value}&rating=g&lang=en&bundle=messaging_non_clips`);
        const data = await res.data
        gifsList.value.push(...data)
        if (data.length < 25) {
            showLoadMore.value = false
        }
    } catch (error) {
        notification.error({message: 'Error', description: 'Could not fetch gifs'});
        console.log(error);
    } finally {
        isLoading.value = false
    }
}

watchEffect(getGifs)
watch(isLoadingMoreVisible, () => {
  if(isLoadingMoreVisible.value)
    getMoreGifs()
  } 
)
</script>

<template>
    <div class="p-4 pt-10">
        <div v-if="searchValue" class="mb-2">
            <h2 class="text-lg md:text-xl">Showing results for keyword <b class="gradient-text bg-gradient-to-r from-violet-700 to-blue-600">{{ searchValue }}</b></h2>
        </div>
        <div v-if="isLoading" class="w-full flex justify-center p-4">
          <Spin size="large" />
        </div>
        <div>
            <div class="flex flex-wrap gap-2">
                <GifItem v-for="gif in gifsList" :key="gif.id" :gif="gif" />
            </div>
            <div v-if="showLoadMore" ref="loadingMore" class="w-full flex justify-center p-4">
          <Spin size="large" />
        </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>