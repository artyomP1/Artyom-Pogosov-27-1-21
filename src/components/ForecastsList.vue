<template>
  <section class="cards-container">
    <ForecastPreview
      v-for="(forecast, idx) in dailyForecasts"
      :key="idx"
      :forecast="forecast"
    />
  </section>
</template>

<script>
import ForecastPreview from "@/components/ForecastPreview.vue";
export default {
  name: "ForecastsList",
  props: {
    dailyForecasts: {
      type: Array,
    },
  },
  components: {
    ForecastPreview,
  },
};
</script>
