<template>
  <div class="flex flex-col items-center gap-5">
    <h1>Contador</h1>
    <h3>Counter : {{ counter }}</h3>

    <section class="flex gap-5">
      <button @click="handleIncrement" class="btn btn-primary" :disabled="disabledMax">Increment</button>
      <button @click="handleDecrement" class="btn btn-secondary" :disabled="disabledMin">Decrement</button>
      <button @click="handleReset" class="btn btn-error">Reset</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { watch, provide } from 'vue'
import { useCounter } from '../composables/useCounter'

interface Props {
  initialCounter: number
  maxCounter: number
  minCounter?: number
}

const { initialCounter, maxCounter, minCounter = 0 } = defineProps<Props>()

const emit = defineEmits(['show-alert', 'message', 'color','update:histories'])


const counterState = useCounter({ initialCounter, maxCounter, minCounter })
const {
  counter,
  disabledMax,
  disabledMin,
  increment,
  decrement,
  reset,
  histories,
  alert,
} = counterState



provide('counterState', counterState)


const handleIncrement = () => {
  increment()
  emit('update:histories', histories.value)
}

const handleDecrement = () => {
  decrement()
  emit('update:histories', histories.value)
}

const handleReset = () => {
  reset()
  emit('update:histories', histories.value)
}

watch(counter, (current, previous) => {
  if (current > minCounter && current < maxCounter) {
    emit('show-alert', false)
  }

  if (current >= maxCounter && previous < maxCounter) {
    emit('message', 'Contador al máximo')
    emit('color', 'alert-warning')
    emit('show-alert', true)
  }

  if (current <= minCounter && previous > minCounter) {
    emit('message', 'Contador al mínimo')
    emit('color', 'alert-error')
    emit('show-alert', true)
  }
})

watch(alert, (value) => {
  emit('show-alert', value)
})
</script>