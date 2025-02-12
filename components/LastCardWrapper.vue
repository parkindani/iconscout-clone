<script setup lang="ts">
const props = defineProps<{
  link: string;
  isLastCard?: boolean;
}>();
</script>

<template>
  <div v-if="props.isLastCard" class="last-card-wrapper">
    <RouterLink :to="props.link" class="last-card">
      <h2>View More</h2>
    </RouterLink>
    <slot />
  </div>

  <slot v-else />
</template>

<style lang="scss" scoped>
.last-card-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  .last-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
    border-radius: 8px;
  }

  h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
  }
}

.last-card-wrapper:hover :deep(.card-container) {
  animation: spring 400ms forwards 1;
}

@keyframes spring {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
</style>
