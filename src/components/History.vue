<template>
  <h1>{{ titleHistory }}</h1>
  <table class="table-auto border-collapse border border-gray-400">
    <thead>
      <tr>
        <th class="border border-gray-400 px-4 py-2">Acción</th>
        <th class="border border-gray-400 px-4 py-2">Valor Previo</th>
        <th class="border border-gray-400 px-4 py-2">Valor Actual</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in histories" 
        :key="index" 
        :class="[
          'border border-gray-400',
          'text-zinc-800',
          item.action === 'increment' ? 'bg-green-200': '',
          item.action === 'decrement' ? 'bg-red-200' : '']"
      >
        <td class="border border-gray-400 px-4 py-2">{{ item.action }}</td>
        <td class="border border-gray-400 px-4 py-2">{{ item.previous }}</td>
        <td class="border border-gray-400 px-4 py-2">{{ item.current }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    props: {
    titleHistory: {
      type: String,
      requred: true
    },
    histories: {
      type: Array,
      required: true,
    },
  },
  })
</script>

<style lang="scss" scoped>

</style>