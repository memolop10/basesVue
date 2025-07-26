<template>
  <!-- MOSTRAR -->
  <div class="toast toast-top toast-end" v-if="show">
    <div class="alert" :class="color">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script lang="ts" >
import { defineComponent } from 'vue';

export default defineComponent({

  props: {
    show: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }


  }

})
</script>

<style lang="scss" scoped></style>
