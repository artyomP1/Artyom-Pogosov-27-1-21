<template>
  <header>
    <nav class="header">
      <div class="logo">Herolo Weather Task</div>
      <div class="main-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/favorites">Favorites </router-link>
        <div class="temperture-unit">
          <span
            :class="{
              'selected-temperture-unit': tempertureUnit === 'celsius',
            }"
            @click="updateTempertureUnit('celsius')"
            >°C</span
          >
          |
          <span
            :class="{
              'selected-temperture-unit': tempertureUnit === 'fahrenheit',
            }"
            @click="updateTempertureUnit('fahrenheit')"
            >°F</span
          >
        </div>
        <div class="dark-mode">
          <el-switch
            v-model="value"
            @change="toggleTheme"
            active-color="#f7f7f7"
            inactive-color="#cacac9"
            aria-label="Toggle themes"
            active-value="100"
            inactive-value="0"
          >
          </el-switch>
          <span>{{ taggleText }}</span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      value: "0",
      theme: "",
    };
  },
  mounted() {
    let localTheme = localStorage.getItem("theme");
    this.value = localTheme === "darkMode" ? "100" : "0";
    this.toggleTheme();
    document.documentElement.setAttribute("data-theme", localTheme);
  },
  methods: {
    ...mapMutations({
      setTempertureUnit: "setTempertureUnit",
    }),
    toggleTheme() {
      this.theme = this.theme == "darkMode" ? "" : "darkMode";
      document.documentElement.setAttribute("data-theme", this.theme);
      localStorage.setItem("theme", this.theme);
    },
    updateTempertureUnit(unit) {
      this.setTempertureUnit(unit);
    },
  },
  computed: {
    ...mapGetters({
      tempertureUnit: "tempertureUnit",
    }),
    taggleText() {
      return this.value === "0" ? "Light Moode" : "Dark Moode";
    },
  },
};
</script>