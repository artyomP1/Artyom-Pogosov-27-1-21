<template>
  <section class="card">
    <el-card>
      <div class="clearfix">
        <h1>{{ day }}</h1>
      </div>
      <div class="img">
        <img
          :src="`https://www.accuweather.com/images/weathericons/${forecast.Day.Icon}.svg`"
        />
      </div>
      <div class="card-temperture">
        {{ temperture.min }} - {{ temperture.max }} {{ temperture.symbol }}
      </div>
    </el-card>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { convertFahrToCels } from "../utils/convert-functions.js";
export default {
  props: ["forecast"],
  computed: {
    ...mapGetters({
      tempertureUnit: "tempertureUnit",
    }),
    day() {
      const date = new Date(this.forecast.EpochDate * 1000);
      const day = date.toString().slice(0, 3);
      return day;
    },
    temperture() {
      let min = this.forecast.Temperature.Minimum.Value;
      let max = this.forecast.Temperature.Maximum.Value;
      if (this.tempertureUnit === "fahrenheit")
        return { min, max, symbol: "°F" };
      else
        return {
          min: convertFahrToCels(min),
          max: convertFahrToCels(max),
          symbol: "°C",
        };
    },
  },
};
</script>