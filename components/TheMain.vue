<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { $fetch } from "ofetch";

// const tabs = [
//   { name: 'All', current: true },
//   { name: 'Popular', current: false },
//   { name: 'Recent', current: false },
//   { name: 'Featured', current: false },
// ]

const jsons = ref<string[]>([]);

const keyword = ref("");

const download_json = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const search = async () => {
  jsons.value = [];
  try {
    const {
      response: {
        items: { data },
      },
    } = await $fetch(`/api/search/${keyword.value}`, {
      method: "GET",
    });

    console.log(data);

    await data.forEach(async (d: any) => {
      const url = await $fetch("/api/getDownloadUrl", {
        method: "POST",
        body: JSON.stringify({ uuid: d.uuid }),
      });
      if (url) {
        const json = await download_json(url as string);
        console.log("json", json);
        jsons.value.push(json);
      }
    });

    // console.log('json', json)
  } catch (error) {
    console.error(error);
  }
};
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
      <input
        v-model="keyword"
        type="text"
        placeholder="Search from 8 Million+ assets"
      />
      <button @click.prevent="search" type="submit">Search</button>
    </form>

    <!-- Search Results -->
    <div class="container-fluid py-4">
      <BRow>
        <BCol
          v-for="(json, i) in jsons"
          :key="i"
          cols="12"
          sm="6"
          lg="4"
          class="mb-4"
        >
          <ClientOnly>
            <LottieCard :src="json" />
          </ClientOnly>
        </BCol>
      </BRow>
    </div>
  </main>
</template>
