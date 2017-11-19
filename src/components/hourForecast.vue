<template>
  <li class="hour-forecast">
      <i :class="classMap"></i>
      <p class="time">
        {{time}}
      </p>
      <p class="temp">{{hours.main.temp}} &#x2103;</p>
      <p class="pressure">{{hours.main.pressure}} hpa</p>  
      <p class="humidity">{{hours.main.humidity}} %</p>
      <p>{{hours.wind.speed}} m/s</p>
  </li>
</template>

<script>
import moment from "moment";

export default {
  name: "hourForecast",
  props: ["hours"],
  computed: {
    time() {
      return moment(this.hours.dt_txt).format("LT");
    },
    classMap() {
      return `owi owi-2x owi-${this.hours.weather[0].icon}`;
    }
  }
};
</script>

<style lang="scss">
.hour-forecast {
  padding: 0 8px;
}
</style>

