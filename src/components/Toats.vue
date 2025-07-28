<template>
  <div class="toast toast-top toast-end" v-if="show">
    <div class="alert" :class="color">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  message: string
  color: string
}>()
</script>

<style scoped lang="scss"></style>