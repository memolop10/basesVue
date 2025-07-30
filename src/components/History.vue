<template>
  <div>
    <h2>{{ titleHistory }}</h2>
    <table class="table-auto border-collapse border border-gray-400 mt-4">
      <thead>
        <tr>
          <th class="border border-gray-400 px-4 py-2">Acción</th>
          <th class="border border-gray-400 px-4 py-2">Anterior</th>
          <th class="border border-gray-400 px-4 py-2">Actual</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in props.histories" :key="i">
          <td class="border border-gray-400 px-4 py-2">{{ item.action }}</td>
          <td class="border border-gray-400 px-4 py-2">{{ item.previous }}</td>
          <td class="border border-gray-400 px-4 py-2">{{ item.current }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { CounterChanges } from '../interfaces/counter-changes.interface'

const props = defineProps<{
  titleHistory: string
  histories: CounterChanges[]
}>()
</script>