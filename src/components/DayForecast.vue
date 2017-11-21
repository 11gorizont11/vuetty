<template>
  <div>
    <ul class="hours-forecast">
      <li>
      <p class="title">Hours</p>
        <p class="title">Temperature</p>
         <p class="title">Pressure</p>
          <p class="title">Humidity</p>
          <p class="title">Wind</p>
      </li>
      <li is="hourForecast" v-for="hours in dayForecast.dayForecast" 
      :key="hours.dt_txt" 
      :hours="hours"></li>
    </ul>
  </div>
</template>

<script>
import hourForecast from "./hourForecast";

export default {
  name: "DayForecast",
  props: ["dayForecast"],

  components: {
    hourForecast
  }
};
</script>

<style lang="scss">
.hours-forecast {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-content: space-around;
}
li:first-child {
  padding-top: 38px;
}
.title {
  text-align: left;
}
</style>
