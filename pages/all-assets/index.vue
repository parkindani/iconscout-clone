<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { PageNameType } from "~/types";

import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import TheHeader from "~/components/TheHeader.vue";
import { pageList } from "~/assets/constants";
const dropdownList = Object.keys(pageList);

const router = useRouter();
const route = useRoute();

const query = computed(() => route.params.query as string);

const selectedDropdown = ref<string>(dropdownList[0]);

const inputValue = ref<string>(query.value || "");

const search = () => {
  if (inputValue.value.trim()) {
    const page = pageList[selectedDropdown.value as PageNameType];
    if (page) {
      router.push(`${page}/${encodeURIComponent(inputValue.value)}`);
    }
  }
};
</script>

<template>
  <div class="main-page">
    <TheHeader />
    <main>
      <h1>Over 10.4 Million+ Design Assets</h1>
      <p>
        Curated SVGs, Vector Icons, Illustrations, 3D Graphics, and Lottie
        Animations. <br />Over 10,000+ new assets added every day. Integrated
        plugins, tools, editors, and more.
      </p>
      <b-input-group class="search-input-group">
        <b-dropdown
          :text="selectedDropdown"
          variant="link"
          class="custom-dropdown-button"
          menu-class="dropdown-menu-right"
        >
          <b-dropdown-item
            v-for="(item, idx) in dropdownList"
            :key="idx"
            @click="selectedDropdown = item"
            :active="item === selectedDropdown"
            >{{ item }}</b-dropdown-item
          >
        </b-dropdown>
        <SvgoIcoSearch filled :fontControlled="false" class="search-icon" />
        <b-form-input
          placeholder="Search from 8 Million+ assets"
          v-model="inputValue"
          @keydown.enter="search"
        />
        <b-button variant="link" @click.prevent="search">
          <SvgoIcoImageSearch
            filled
            :fontControlled="false"
            class="image-search-icon"
          />
        </b-button>
      </b-input-group>
    </main>
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #0073c2;
    text-align: center;

    h1 {
      font-size: 2.25rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      color: #fff;
      font-weight: 400;
      margin-bottom: 2rem;
    }

    .search-input-group {
      height: 68px;
      background-color: #ebedf5;
      border: 0;
      border-radius: 32px;
      align-items: center;
      max-width: 870px;

      :deep(button.dropdown-toggle) {
        color: #2e334c;
        height: 32px;
        font-size: 14px;
        font-weight: 900px;
        text-decoration: none;
        border-right: #b4bad6 1px solid;
        padding-right: 9px;
        margin-right: 9px;
      }

      .search-icon {
        width: 24px;
        height: 24px;
      }

      input {
        border: none;
        background-color: #ebedf5;
      }

      input::placeholder {
        color: #2e334c;
        font-size: 18px;
        line-height: 24px;
      }

      .image-search-icon {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }
  }
}
</style>
