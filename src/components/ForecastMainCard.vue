<template>
  <section>
    <div class="today-forecast">
      <img
        :src="`https://www.accuweather.com/images/weathericons/${forecast.Day.Icon}.svg`"
      />
      <div>
        <h1 class="city">{{ currCity.LocalizedName }}</h1>
        <div class="card-temperture">
          {{ temperture.min }} - {{ temperture.max }} {{ temperture.symbol }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { convertFahrToCels } from "../utils/convert-functions.js";
export default {
  props: ["forecast", "currCity"],
  computed: {
    ...mapGetters({
      tempertureUnit: "tempertureUnit",
    }),
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