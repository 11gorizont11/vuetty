<template>
<div class="container">
   <form class="search-box" @submit="handleSubmitForm">
            <input type="text" v-model="term" placeholder="Enter City">
            <input type="submit" value="Search">
    </form>
      <p class="danger" v-if="errorMsg && !items.length">{{errorMsg}}</p>
      <p v-if="!items.length && !isLoading">No city yet...</p>
      <h5 v-if="isLoading">Loading data ...</h5>

      <div class="forecast" v-if="items.length">
        <h1 class="city-name">{{city.name}}</h1>
        <div class="days">
           <div :class="[{active: item.dayOfWeek === activeDay }, 'day']" 
                v-for="item in items" :key="item.dt" :style="{ width: dayTabWidth }"
                @click="handleActiveDay(item.dayOfWeek)"> 
                <h2>  {{item.dayOfWeek}} </h2>
                <h1> {{item.dayOfMonth}} </h1>
                <h3>{{item.month}}</h3>
            </div>
      
        </div>
        <div :class="['day-foracast', {active: item.dayOfWeek === activeDay }]"
          v-for="item in items" :key="item.dt"
          is='DayForecast' :dayForecast = "item">  
        </div>
    </div>
</div>

</template>

<script>
import moment from "moment";
import Utils from "../utils";
import DayForecast from "./DayForecast";

export default {
  name: "Forecast",
  data() {
    return {
      items: [],
      activeDay: "",
      term: "",
      city: {},
      isLoading: false,
      errorMsg: ""
    };
  },

  computed: {
    dayTabWidth() {
      return `${100 / this.items.length}%`;
    }
  },

  components: {
    DayForecast
  },

  methods: {
    handleActiveDay(day) {
      this.activeDay = day;
    },
    handleSubmitForm(event) {
      event.preventDefault();
      this.isLoading = true;
      Utils.getForecastByCityName(this.term)
        .then(data => {
          const fiveDaysForecast = data.list.reduce((acc, item) => {
            function addDay(day) {
              return {
                dayOfWeek: moment(day.dt_txt).format("dddd"),
                dayOfMonth: moment(day.dt_txt).format("D"),
                month: moment(day.dt_txt).format("MMMM"),
                dayForecast: [day]
              };
            }

            if (!acc.length) {
              acc.push(addDay(item));
            } else {
              const lastDay = acc[acc.length - 1];
              if (lastDay.dayOfMonth === moment(item.dt_txt).format("D")) {
                lastDay.dayForecast.push(item);
              } else {
                acc.push(addDay(item));
              }
            }
            return acc;
          }, []);
          this.city = data.city;
          this.items = fiveDaysForecast;
          this.activeDay = fiveDaysForecast[0].dayOfWeek;
        })
        .catch(error => {
          this.errorMsg = error;
          // eslint-disable-next-line
          console.error("Request failed", error);
        });
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./forecast.scss";
</style>