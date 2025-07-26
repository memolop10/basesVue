<template>
  <div>
    <CounterPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CounterPage from './pages/CounterPage.vue';

//OPTION API, vue,
//Components
export default  defineComponent({
  components: {
    CounterPage
  }
})
</script>

<style lang="scss" scoped>

</style>