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
      @update:histories="histories = $event"
      />
      <!-- @histories="handleHistories" -->


      <History 
        :titleHistory="headHistoryText"
        :histories="histories"
      />

    <!-- <section>
      <h1>Historial de cambios</h1>
      <ul>
        <li v-for="(history, index) in histories" :key="index">
          {{ history }}
        </li>
      </ul>
    </section> -->


  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toats from '../components/Toats.vue';
import Counter from '../components/Counter.vue';
import History from '../components/History.vue';

import type { CounterChanges } from '../interfaces/counter-changes.interface';


export default defineComponent({
  components: {
    Counter,  
    Toats,
    History
  },
  data() {
    return {
      title: "COUNTER APP",
      showToats: false,
      textToast: "",
      colorToats: "alert-warning",
      histories: [] as CounterChanges[],
      headHistoryText:"Historial de Cambios"
    }
  },

  methods: {

    handleShowAlert(valueAlert: boolean) {
      this.showToats = valueAlert;
    },
    handleMessage(message: string) {
      this.textToast = message;
    },
    handleColor(color: string) {
      this.colorToats = color;
    },
    // handleHistories(changes: CounterChanges[]){
    //   this.histories = changes;
    // } 



  }
});

</script>

<style lang="scss" scoped></style>
