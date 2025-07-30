// CounterPage.vue (Padre)
<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4">
    <h1>{{ title }}</h1>
    <Toats 
      :color="colorToats"
      :message="textToast"
      :show="showToats"
    />

    <Counter 
      :max-counter="5"
      :initial-counter="1"
      @show-alert="handleShowAlert($event)" 
      @message="handleMessage($event)" 
      @color="handleColor($event)"
      @update:histories="handleHistories"
    />

    <History 
      :titleHistory="headHistoryText"
      :histories="histories"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Toats from '../components/Toats.vue'
import Counter from '../components/Counter.vue'
import History from '../components/History.vue'
import type { CounterChanges } from '../interfaces/counter-changes.interface'
import { provide } from 'vue'
import { useCounter } from '../composables/useCounter'

const counterState = useCounter({ initialCounter: 1, maxCounter: 5, minCounter: 0 })

const title = ref("COUNTER APP")
const showToats = ref(false)
const textToast = ref("")
const colorToats = ref("alert-warning")
const histories = ref<CounterChanges[]>([])
const headHistoryText = ref("Historial de Cambios")

const handleShowAlert = (value: boolean) => {
  showToats.value = value

  if (value) {
    // Ocultar el toast automáticamente después de 2 segundos
    setTimeout(() => {
      showToats.value = false;
    }, 2000);
  }
}

const handleMessage = (message: string) => {
  textToast.value = message
}

const handleColor = (color: string) => {
  colorToats.value = color
}

const handleHistories = (data: CounterChanges[]) => {
  histories.value = data;
}

provide('counterState', counterState)
</script>

<style scoped></style>