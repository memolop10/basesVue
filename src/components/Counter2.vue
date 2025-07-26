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
import type { CounterChanges } from '../interfaces/counter-changes.interface';

interface Props {
  initialCounter:  number,
  maxCounter: number,
  minCounter: number
}

const {initialCounter, maxCounter,minCounter} = withDefaults(defineProps<Props>{},{
  minCounter: 0
})

export default defineComponent({


  props: {
    initialCounter: {
      type: Number,
      default: 2
    },
    maxCounter: {
      type: Number,
      default: 10
    },
    minCounter: {
      type: Number,
      default: 0,
    }
  },


  data() {
    return {
      title: "",
      counter: this.initialCounter,
      disabledMax: false,
      disabledMin: false,
      histories: [] as CounterChanges[],


      // TOATS
      alert: false,
      messageToats: "",
      colorToats: "bg-red-500"

    }
  },
  emits: ["show-alert", "message", "color", "update:histories"],

  methods: {
    increment() {
      const prev = this.counter;
      this.counter++;
      const current = this.counter;
      //! OBSERVACION

      // this.histories.push({
      //   action: 'increment',
      //   valueCounter: this.counter
      // })

      this.histories = [
        ...this.histories,
        {
          action: "increment",
          //valueCounter: this.counter
          previous: prev,
          current: current
        }
      ];




    },
    decrement() {
      const prev = this.counter;
      this.counter--;
      const current = this.counter;
      // this.histories.push({
      //   action: 'decrement',
      //   valueCounter: this.counter,
      // })

      this.histories = [
        ...this.histories,
        {
          action: "decrement",
          //valueCounter: this.counter
          previous: prev,
          current: current
        }
      ];

    },
    reset() {
      this.histories = [];
      this.$emit("update:histories", []);
    }

  },
  watch: {
    counter(_currentValue, _prevValue) {

      if (this.counter >= this.maxCounter) {
        this.counter = this.maxCounter;
        this.disabledMax = true;
        this.alert = true;
        this.messageToats = "Contador colapsado al maximo";
        this.colorToats = "bg-red-500";

      }

      else if (this.counter <= this.minCounter) {
        this.counter = this.minCounter;
        this.disabledMin = true;
        this.alert = true;
        this.messageToats = "Contador colapsado al minimo";
        this.colorToats = "bg-green-500";

      } else {
        this.disabledMax = false;
        this.disabledMin = false;
        this.alert = false;
      }

    },

    alert(currentValue) {
      this.$emit("show-alert", currentValue);
      this.$emit("message", this.messageToats);
      this.$emit("color", this.colorToats)

    },

    histories(currentValues) {
      this.$emit("update:histories", currentValues)
    }
  },

})
</script>

<style lang="scss" scoped></style>