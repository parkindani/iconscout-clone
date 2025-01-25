<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const config = useRuntimeConfig()

console.log('config', config)

const CLIENT_KEY = config.public.clientId
const SECRET_KEY = config.public.clientSecretKey

const SEARCH_API_ENDPOINT = 'https://api.iconscout.com/v3/search'
const DOWNLPAD_API_ENDPOINT = (uuid: string) => `https://api.iconscout.com/v3/items/${uuid}/api-download`

// const tabs = [
//   { name: 'All', current: true },
//   { name: 'Popular', current: false },
//   { name: 'Recent', current: false },
//   { name: 'Featured', current: false },
// ]


const jsons = ref<string[]>([])

const keyword = ref('')

const download_json = async (url: string) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const get_download_url = async (uuid: string) => {
  try {
    const response = await axios.post(DOWNLPAD_API_ENDPOINT(uuid), {
      format: 'json'
    }, {
      headers: {
        'Client-ID': CLIENT_KEY,
        'Client-Secret': SECRET_KEY,
        'Content-Type': 'application/json'
      }
    })
    console.log('download response', response)
    console.log(response.data)
    const { data: { response: { download: { url } } } } = response
    if (url) {
      console.log('download url', url)
      return url
    } else {
      throw new Error('No download url found')
    }
  } catch (error) {
    console.error(error)
  }
}

const search = async () => {
  jsons.value = []
  try {
    const { data: { response: { items: { data } } } } = await axios.get(SEARCH_API_ENDPOINT, {
      params: {
        query: keyword.value,
        product_type: 'item',
        asset: 'lottie',
        price: 'free',
        per_page: 10,
        page: 1,
        sort: 'relevant',
      },
      headers: {
        'Client-ID': CLIENT_KEY
      }
    })
    console.log(data)

    await data.forEach(async (d: any) => {
      const url = await get_download_url(d.uuid)
      const json = await download_json(url)
      console.log('json', json)
      jsons.value.push(json)
    })

    // console.log('json', json)

  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <main class="flex-grow-1 bg-light">
    <!-- Tab Filters -->
    <!-- <BNav tabs class="px-4 border-bottom">
      <BNavItem v-for="tab in tabs" :key="tab.name" :active="tab.current">
        {{ tab.name }}
      </BNavItem>
    </BNav> -->

    <!-- Search Input -->
    <form>
      <input v-model="keyword" type="text" placeholder="Search from 8 Million+ assets" />
      <button @click.prevent="search" type="submit">Search</button>
    </form>

    <!-- Search Results -->
    <div class="container-fluid py-4">
      <BRow>
        <BCol v-for="(json, i) in jsons" :key="i" cols="12" sm="6" lg="4" class="mb-4">
          <ClientOnly>
            <LottieCard :src="json" />
          </ClientOnly>
        </BCol>
      </BRow>
    </div>
  </main>
</template>
