<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  path?: string;
}>();

const pageList: Record<string, string> = {
  "All Assets": "/all-assets",
  "3D Illustrations": "/3d-illustrations",
  "Lottie Animations": "/lottie-animations",
  Illustrations: "/illustrations",
  Icons: "/icons",
};

const dropdownList = Object.keys(pageList);

const router = useRouter();
const selectedDropdown = ref<string>(props.path || dropdownList[0]);
const inputValue = ref<string>("");

const search = () => {
  if (inputValue.value.trim()) {
    const page = pageList[selectedDropdown.value];
    if (page) {
      router.push(`${page}/${encodeURIComponent(inputValue.value)}`);
    }
  }
};
</script>

<template>
  <b-navbar type="light" variant="light" class="nav-bar">
    <b-row class="align-items-center w-100">
      <!-- Logo and Brand Name -->
      <b-col cols="auto" class="d-flex align-items-center">
        <b-navbar-brand href="#" class="d-flex align-items-center">
          <SvgoLogo filled :fontControlled="false" class="logo" />
        </b-navbar-brand>
      </b-col>

      <!-- Search Bar -->
      <b-col cols="auto">
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
      </b-col>

      <!-- Navigation Links -->
      <b-col cols="auto" class="d-flex align-items-center me-auto">
        <b-navbar-nav class="navbar-nav gx-3">
          <b-nav-item href="#"
            >Explore
            <SvgoIcoAngleDown />
          </b-nav-item>
          <b-nav-item href="#"
            >Tools
            <SvgoIcoAngleDown />
          </b-nav-item>
          <b-nav-item href="#">All Features</b-nav-item>
          <b-nav-item href="#">
            <SvgoIcoGift filled />
            Free Assset</b-nav-item
          >
          <b-nav-item href="#"
            >Learn
            <SvgoIcoAngleDown />
          </b-nav-item>
        </b-navbar-nav>
      </b-col>

      <!-- Buttons -->
      <b-col cols="auto" class="d-flex align-items-center ms-auto buttons">
        <base-button type="line">Login</base-button>
        <base-button type="primary">Signup</base-button>
      </b-col>
    </b-row>
  </b-navbar>
</template>

<style lang="scss" scoped>
.nav-bar {
  background-color: #ffffff !important;
}
.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}
.b-navbar-brand {
  text-decoration: none;
}
.text-muted {
  font-size: 0.85rem;
}
.b-nav-item {
  font-size: 0.95rem;
}

.logo {
  width: 170px;
  height: 32.88px;
}

.search-input-group {
  height: 46px;
  background-color: #ebedf5;
  border: 0;
  border-radius: 8px;
  align-items: center;

  :deep(button.dropdown-toggle) {
    color: #2e334c;
    height: 32px;
    font-size: 13px;
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
    font-family: "AvertaStd-Regular", sans-serif;
    font-size: 14px;
    line-height: 24px;
  }

  .image-search-icon {
    width: 30px;
    height: 30px;
  }
}

.navbar-nav {
  font-weight: 600;
  font-size: 16px;
  line-height: 19.78px;
}

.buttons {
  gap: 12px;
}
</style>
