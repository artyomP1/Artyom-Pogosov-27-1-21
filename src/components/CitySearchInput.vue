<template>
  <div class="search-input">
    <el-input
      placeholder="Search"
      prefix-icon="el-icon-search"
      v-model="searchStr"
      @input="searchCity"
      @keydown.native="checkLang"
    >
    </el-input>
    <div v-if="this.searchStr.length !== 0" class="result-container">
      <p
        @click="hendleCity(result)"
        :key="result.id"
        v-for="result in citySearchResult.slice(0, 5)"
      >
        {{ result.LocalizedName }}, {{ result.Country.LocalizedName }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "CitySearchInput",
  data() {
    return {
      searchStr: "",
    };
  },
  methods: {
    ...mapActions({
      getCity: "getCity",
    }),
    ...mapMutations({
      resetCitySearchResult: "resetCitySearchResult",
    }),
    async searchCity() {
      if (this.searchStr.length === 0) return this.resetCitySearchResult();
      await this.getCity(this.searchStr);
    },
    hendleCity(currCity) {
      this.searchStr = "";
      this.$emit("cityForecasts", currCity);
    },
    checkLang(e) {
      let letters = /^[A-Za-z]+$/;
      if (!e.key.match(letters)) {
        e.preventDefault();
        this.$message.error({
          message: "Oops, Searching should be done in English letters only.",
          duration: 1500,
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      citySearchResult: "citySearchResult",
    }),
  },
};
</script>
