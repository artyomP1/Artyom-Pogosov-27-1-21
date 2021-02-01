<template>
  <div class="home" v-if="dailyForecasts.length > 0">
    <div class="search">
      <CitySearchInput @cityForecasts="loadCityForecasts" />
    </div>
    <div class="top-container">
      <ForecastMainCard :currCity="currCity" :forecast="dailyForecasts[0]" />
      <div class="favorite-container">
        <el-button
          @click="handleFavorite"
          type="primary"
          :icon="favoriteBtn.icon"
          >{{ favoriteBtn.text }}</el-button
        >
        <div v-if="isCityFavorite"><i class="el-icon-star-on"></i>Favorite</div>
      </div>
    </div>
    <h1>{{ dailyForecasts[0].Day.IconPhrase }}</h1>
    <ForecastsList :dailyForecasts="dailyForecasts" />
  </div>
</template>

<script>
import CitySearchInput from "@/components/CitySearchInput.vue";
import ForecastsList from "@/components/ForecastsList.vue";
import ForecastMainCard from "@/components/ForecastMainCard.vue";
import { getGeoLocation } from "../utils/geoLocation.js";
import { Loading } from "element-ui";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    CitySearchInput,
    ForecastsList,
    ForecastMainCard,
  },

  async created() {
    if (this.currCity.Key) return;
    let loading = Loading.service({ fullscreen: true });
    try {
      let userLocation = await getGeoLocation();
      await this.getGeoposition(userLocation);
      this.checkIfCityIsFavorite();
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
      getCityForecasts: "getCityForecasts",
      getGeoposition: "getGeoposition",
    }),
    ...mapMutations({
      setCurrCity: "setCurrCity",
      setFavoritesCities: "setFavoritesCities",
      removeFavoritesCities: "removeFavoritesCities",
    }),
    loadCityForecasts(currCity) {
      this.setCurrCity(currCity);
      this.getCityForecasts(currCity.Key);
      this.checkIfCityIsFavorite();
    },
    handleFavorite() {
      const msg = this.currCity.isCityFavorite
        ? "Removed successfully"
        : "Added successfully";
      if (!this.currCity.isCityFavorite) this.setFavoritesCities();
      else this.removeFavoritesCities();
      this.sendNotification(msg);
    },

    checkIfCityIsFavorite() {
      this.favoritesCities.forEach((currCity) => {
        if (currCity.Key === this.currCity.Key)
          return (this.isCityFavorite = true);
      });
    },
    sendNotification(msg) {
      this.$notify({
        title: "Success",
        message: msg,
        type: "success",
      });
    },
  },
  computed: {
    ...mapGetters({
      dailyForecasts: "dailyForecasts",
      currCity: "currCity",
      favoritesCities: "favoritesCities",
    }),
    favoriteBtn() {
      return {
        text: this.isCityFavorite
          ? "Remove from favorites"
          : "Add to favorites",
        icon: this.isCityFavorite ? "el-icon-remove" : "el-icon-circle-plus",
      };
    },
    isCityFavorite() {
      return this.currCity.isCityFavorite;
    },
  },
};
</script>
