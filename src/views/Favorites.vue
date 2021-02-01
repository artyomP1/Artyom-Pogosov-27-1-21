<template>
  <div class="favorities">
    <div class="cards-container">
      <WeatherCityPreview
        @setNewCity="setNewCity"
        v-for="(cityCurrWeather, idx) in favoritesCities"
        :key="idx"
        :cityCurrWeather="cityCurrWeather"
      />
    </div>
  </div>
</template>


<script>
import WeatherCityPreview from "@/components/WeatherCityPreview.vue";
import { Loading } from "element-ui";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Favorities",
  components: { WeatherCityPreview },
  async created() {
    let loading = Loading.service({ fullscreen: true });
    try {
      await this.getFavoritesCitiesWeather();
    } catch (e) {
      this.$message.error(`${e}`);
    } finally {
      this.$nextTick(() => {
        loading.close();
      });
    }
  },
  methods: {
    ...mapActions({
      getFavoritesCitiesWeather: "getFavoritesCitiesWeather",
    }),
    ...mapMutations({
      setCurrCity: "setCurrCity",
    }),
    setNewCity(currCity) {
      this.setCurrCity(currCity);
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters({
      favoritesCities: "favoritesCities",
    }),
  },
};
</script>