<template>
  <div class="flex flex-col items-center gap-5">
    <h1>{{ title }}</h1>
    <h3>Counter : {{ counter }}</h3>

    <section class="flex gap-5">
      <button @click="increment" class="btn btn-primary" :disabled="disabledMax">Increment</button>
      <button @click="decrement" class="btn btn-secondary" :disabled="disabledMin">Decrement</button>
      <button @click="reset" class="btn btn-error">Reset</button>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  initialCounter:  number,
  maxCounter: number,
  minCounter?: number
}

interface CounterChanges {
  action: string
  previous: number
  current: number
}

const {initialCounter, maxCounter, minCounter} = withDefaults(defineProps<Props>(),{
  minCounter: 0
})

const emit = defineEmits(["show-alert","message","color","update:histories"])

const counter = ref(initialCounter);
const histories = ref<CounterChanges[]>([])

const maxCount = ref(maxCounter);
const minCount = ref(minCounter);

const disabledMax = ref(false);
const disabledMin = ref(false);
const alert = ref(false);

const title = ref()

const increment = () => {
  const prev = counter.value
  counter.value++
  //histories.value.push({ action: 'increment', previous: prev, current: counter.value })
  histories.value = [...histories.value, { action: 'increment', previous: prev, current: counter.value }]
  emit('update:histories', histories.value)
}

const decrement = () => {
  const prev = counter.value
  counter.value--
  //histories.value.push({ action: 'decrement', previous: prev, current: counter.value })
  histories.value = [...histories.value, { action: 'decrement', previous: prev, current: counter.value }]
  emit('update:histories', histories.value)
}

const reset = () => {
  
  counter.value = initialCounter
  histories.value = []

  emit('update:histories', histories.value);  
  disabledMax.value = false
  disabledMin.value = false

  emit('message', 'Contador reiniciado');
  emit('color', 'alert-info');

  alert.value = false;
  emit("show-alert", false);
}

watch(counter, (current, previous) => {
  // Si estamos dentro de los límites normales
  if (current > minCount.value && current < maxCount.value) {
    disabledMax.value = false;
    disabledMin.value = false;
    alert.value = false;
    emit('show-alert', false);
    return;
  }

  // Si llegamos al máximo por primera vez
  if (current >= maxCount.value && previous < maxCount.value) {
    disabledMax.value = true;
    disabledMin.value = false;
    alert.value = true;
    emit('message', 'Contador al máximo');
    emit('color', 'alert-warning');
    emit('show-alert', true);
    return;
  }

  // Si llegamos al mínimo por primera vez
  if (current <= minCount.value && previous > minCount.value) {
    disabledMin.value = true;
    disabledMax.value = false;
    alert.value = true;
    emit('message', 'Contador al mínimo');
    emit('color', 'alert-error');
    emit('show-alert', true);
    return;
  }
});


// watch(counter, (currentCounter) => {
  
//   if (currentCounter >= maxCount.value) {
//     currentCounter = maxCount.value;
//     disabledMax.value = true
//     disabledMin.value = false
//     alert.value = true;
//     emit('message', 'Contador al máximo')
//     emit('color', 'alert-warning')

//   }else if (currentCounter <= minCount.value) {
//     currentCounter = minCount. value;
//     disabledMin.value = true
//     disabledMax.value = false
//     alert.value = true;
//     emit('message', 'Contador al mínimo')
//     emit('color', 'alert-error')

//   } else {
//     disabledMax.value = false
//     disabledMin.value = false
//     alert.value = false;
//   }
// })

// watch(alert,() => {
//   emit("show-alert", alert)
// })

</script>

<style lang="scss" scoped></style>
