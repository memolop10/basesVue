



import { ref, watch } from 'vue'

export interface UseCounterOptions {
  initialCounter: number
  maxCounter: number
  minCounter?: number
}

export interface CounterChanges {
  action: string
  previous: number
  current: number
}

export const useCounter = (options: UseCounterOptions) => {
  const { initialCounter, maxCounter, minCounter = 0 } = options

  const counter = ref(initialCounter)
  const max = ref(maxCounter)
  const min = ref(minCounter)

  const disabledMax = ref(false)
  const disabledMin = ref(false)
  const histories = ref<CounterChanges[]>([])
  const alert = ref(false)
  const message = ref('')
  const color = ref('')

  const increment = () => {
    const prev = counter.value
    counter.value++
    //histories.value.push({ action: 'increment', previous: prev, current: counter.value })
    histories.value = [...histories.value, { action: 'increment', previous: prev, current: counter.value }]
  }

  const decrement = () => {
    const prev = counter.value
    counter.value--
    //histories.value.push({ action: 'decrement', previous: prev, current: counter.value })
    histories.value = [...histories.value, { action: 'decrement', previous: prev, current: counter.value }]
  }

  const reset = () => {
    counter.value = initialCounter
    histories.value = []
    
    disabledMax.value = counter.value >= max.value
    disabledMin.value = counter.value <= min.value

    alert.value = true
    message.value = 'Contador reiniciado'
    color.value = 'alert-info'
  }

  watch(counter, (curr, prev) => {
    if (curr > min.value && curr < max.value) {
      disabledMax.value = false
      disabledMin.value = false
      alert.value = false
    }

    if (curr >= max.value && prev < max.value) {
      disabledMax.value = true
      disabledMin.value = false
      alert.value = true
      message.value = 'Contador al máximo'
      color.value = 'alert-warning'
    }

    if (curr <= min.value && prev > min.value) {
      disabledMin.value = true
      disabledMax.value = false
      alert.value = true
      message.value = 'Contador al mínimo'
      color.value = 'alert-error'
    }
  })

  return {
    //State
    counter,
    disabledMax,
    disabledMin,
    histories,
    alert,
    message,
    color,

    //Actions
    increment,
    decrement,
    reset
  }
}



