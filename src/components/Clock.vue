<template>
    <div class="clock">
      <div class="clock-face">
        <!-- Hour marks -->
        <div
          class="hour-mark"
          v-for="i in 12"
          :key="i"
          :style="getHourMarkStyle(i)"
        ></div>
  
        <!-- Hands of the clock -->
        <div class="hand hour-hand" :style="hourHandStyle"></div>
        <div class="hand minute-hand" :style="minuteHandStyle"></div>
        <div class="hand second-hand" :style="secondHandStyle"></div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, computed } from "vue";
  
  export default defineComponent({
    name: "Clock",
    setup() {
      const currentTime = ref(new Date());
  
      const updateClock = () => {
        currentTime.value = new Date(currentTime.value.getTime() - 1000);
      };
  
      onMounted(() => {
        setInterval(updateClock, 100);
      });
  
      const hourHandStyle = computed(() => ({
        transform: `rotate(${((currentTime.value.getHours() % 12) * 30) - 180 - (5 * 30)}deg)`,
      }));
  
      const minuteHandStyle = computed(() => ({
        transform: `rotate(${(currentTime.value.getMinutes() * 6) - 180 - (5 * 6)}deg)`,
      }));
  
      const secondHandStyle = computed(() => ({
        transform: `rotate(${currentTime.value.getSeconds() * 6}deg)`,
      }));
  
      const getHourMarkStyle = (i: number) => {
        const angle = i * 30; // 30 degrees for each hour mark
        return {
          transform: `rotate(${angle}deg) translateY(-80px)`, // Adjusted translateY
        };
      };
  
      return { hourHandStyle, minuteHandStyle, secondHandStyle, getHourMarkStyle };
    },
  });
  </script>
  
  <style scoped>
  .clock {
    margin-left: 45%;
    margin-top: 2rem;
    position: relative;
    width: 200px;
    height: 200px;
    border: 2px solid #0F4446;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #DEF2F6, #F6EBCD);  background-size: cover;
}
  
  .clock-face {


    position: relative;
    width: 100%;
    height: 100%;
  }
  
  /* Hour marks */
  .hour-mark {
    margin-left: 50%;
    margin-top: 47%;
    position: absolute;
    width: 2px;
    height: 10px;
    background: #0F4446;
    transform-origin: center;
  }
  
  .hand {
    position: absolute;
    background: #0F4446;
    transform-origin: bottom;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .hour-hand {
    width: 6px;
    height: 50px;
  }
  
  .minute-hand {
    width: 4px;
    height: 70px;
  }
  
  .second-hand {
    width: 2px;
    height: 90px;
    background: red;
  }

  
  </style>
  