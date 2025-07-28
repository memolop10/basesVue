
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
      <tr
        v-for="(item, index) in histories"
        :key="index"
        :class="[
          'border border-gray-400',
          'text-zinc-800',
          item.action === 'increment' ? 'bg-green-200' : '',
          item.action === 'decrement' ? 'bg-red-200' : '',
          item.action === 'reset' ? 'bg-blue-200' : '',
        ]"
      >
        <td class="border border-gray-400 px-4 py-2">{{ item.action }}</td>
        <td class="border border-gray-400 px-4 py-2">{{ item.previous }}</td>
        <td class="border border-gray-400 px-4 py-2">{{ item.current }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface CounterChanges {
  action: string
  previous: number
  current: number
}

defineProps<{
  titleHistory: string
  histories: CounterChanges[]
}>()
</script>

<style scoped lang="scss"></style>