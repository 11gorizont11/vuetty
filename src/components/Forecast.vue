<template>
    <div class="forecast">
        <div class="days">
           <div :class="[{active: item.id === activeDay }, 'day']" 
                v-for="item in items" :key="item.id" :style="{ width: dayTabWidth }"
                @click="handleActiveDay(item.id)"> 
                <h4>  {{item.day}} </h4>
               <h1> {{item.date}} </h1>
            </div>
        
        </div>
        <div :class="['day-foracast', {active: item.id === activeDay }]" v-for="item in items" :key="item.id">
            <h5>{{item.data}}</h5>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Forecast',
  data() {
    return {
      items: [
      { day: 'monday', id: 1, date: 14, data: 'some forecast 1' },
      { day: 'thursday', id: 2, date: 15, data: 'some forecast 2' },
      { day: 'wednesday', id: 3, date: 16, data: 'some forecast 3' },
      ],
      activeDay: 1,
    };
  },

  computed: {
    dayTabWidth() { return `${100 / this.items.length}%`; },
  },

  methods: {
    handleActiveDay(dayId) {
      this.activeDay = dayId;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './forecast.scss';
</style>