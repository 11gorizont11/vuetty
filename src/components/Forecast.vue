<template>
<div class="container">
   <form class="search-box" @submit="handleSubmitForm">
            <input type="text" v-model="cityName" placeholder="Enter City">
            <input type="submit" value="Search">
        </form>
      <p v-if="!items.length">NO city Yet</p>
      <div class="forecast" v-if="items.length">
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
</div>

</template>

<script>
import Utils from '../utils';
import moment from 'moment';
 
export default {
  name: 'Forecast',
  data() {
    return {
      items: [],
      activeDay: 1,
      cityName: '',
      city: {},
    };
  },

  computed: {
    dayTabWidth() { return `${100 / this.items.length}%`; },
  },

  methods: {
    handleActiveDay(dayId) {
      this.activeDay = dayId;
    },
    handleSubmitForm(event) {
      event.preventDefault();
      Utils.getForecastByCityName(this.cityName).then((data) => {
        // eslint-disable-next-line
        console.log(data);
        const dayList = data.list.reduce((acc, item, list)=> {
          const addNewDay = (day) => {
              dayOfWeek: moment(item.data_txt).format('dddd'),
              formatedData: moment(item.data_txt).format('LL'),
              items: [item]
            };
          if(!acc.length){
            
            acc.push([day]);
          // day.moment(data_txt).format('l');
        }, []);
        this.city = data.city;
        this.items = data.list;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './forecast.scss';
</style>