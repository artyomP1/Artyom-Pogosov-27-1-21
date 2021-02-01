<template>
  <section class="card" @click="getFullCityForecast">
    <el-card v-if="cityCurrWeather.currWeather">
      <div class="clearfix">
        <h1>
          {{ cityCurrWeather.LocalizedName }},
          {{ cityCurrWeather.Country.ID }}
        </h1>
        <h5>{{ cityCurrWeather.Key }}</h5>
        <p>
          {{ cityCurrWeather.currWeather.WeatherText }}
        </p>
      </div>
      <div class="img">
        <img
          :src="`https://www.accuweather.com/images/weathericons/${cityCurrWeather.currWeather.WeatherIcon}.svg`"
        />
      </div>
      <div class="card-temperture">
        <span>{{ temperture.value }} {{ temperture.symbol }}</span>
      </div>
    </el-card>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["cityCurrWeather"],
  data() {
    return {
      unit: "Metric",
      symbol: {
        Imperial: "°F",
        Metric: "°C",
      },
    };
  },
  computed: {
    ...mapGetters({
      tempertureUnit: "tempertureUnit",
    }),
    temperture() {
      let tempeture = this.cityCurrWeather.currWeather.ApparentTemperature;
      let unit = this.tempertureUnit === "fahrenheit" ? "Imperial" : "Metric";
      return {
        value: tempeture[unit].Value,
        symbol: this.symbol[unit],
      };
    },
  },
  methods: {
    getFullCityForecast() {
      this.$emit("setNewCity", this.cityCurrWeather);
    },
  },
};
</script>