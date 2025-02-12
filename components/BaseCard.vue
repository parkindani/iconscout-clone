<script setup lang="ts">
const props = defineProps<{
  isIconCard?: boolean;
  isLottie?: boolean;
  isLoading?: boolean;
}>();
</script>

<template>
  <div
    class="card-container"
    :class="{
      'icon-card': props.isIconCard,
      'lottie-card': props.isLottie,
      'is-loading': props.isLoading,
    }"
  >
    <slot></slot>
    <button class="folder-icon">
      <SvgoIcoFolderPlus filled />
    </button>
    <button class="arrow-icon">
      <SvgoIcoArrowBottom filled />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  text-align: center;
  cursor: pointer;
  position: relative;
  height: 210px;
  width: 280px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #ffffff;

  button {
    border: none;
    background-color: white;
    color: white;
    position: absolute;
    border-radius: 6px;
    visibility: hidden;
  }

  .folder-icon {
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
  }

  .arrow-icon {
    bottom: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
  }

  &:hover {
    background-color: rgba(46, 51, 76, 0.2);
    button {
      visibility: visible;
    }
  }
}

.icon-card {
  height: 140px;
  width: 140px;
}

.is-loading,
.lottie-card {
  padding: 0;
  overflow: clip;
}
</style>
