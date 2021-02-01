import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import { storageService } from '../utils/storage.js';
Vue.use(Vuex);

const BASE_URL = 'http://dataservice.accuweather.com';
const API_KEY = 'lA8ejCormgOAOeQo2K8paFiD4SqbbunU';

export default new Vuex.Store({
  state: {
    dailyForecasts: [],
    currCity: {},
    favoritesCities: [],
    citySearchResult: [],
    tempertureUnit: 'fahrenheit'
  },
  getters: {
    dailyForecasts(state) {
      return state.dailyForecasts;
    },
    currCity(state) {
      return state.currCity;
    },
    favoritesCities(state) {
      return state.favoritesCities;
    },
    citySearchResult(state) {
      return state.citySearchResult;
    },
    tempertureUnit(state) {
      return state.tempertureUnit;
    }
  },
  mutations: {
    setDailyForecasts(state, { dailyForecasts }) {
      state.dailyForecasts = dailyForecasts;
    },
    setFavoritesCitiesWeathert(state, favoritesCitiesWeather) {
      let favoritesCities = JSON.parse(JSON.stringify(state.favoritesCities));
      const favoritesCitiesWeater = favoritesCities.map((favoriteCity, idx) => {
        let favoriteCityData = {
          ...favoriteCity,
          currWeather: favoritesCitiesWeather[idx].data[0]
        };
        return favoriteCityData;

      });
      state.favoritesCities = [...favoritesCitiesWeater];
      storageService.store('favoritesCitiesCurrWeather', state.favoritesCities);
    },
    setCitySearchResult(state, { citySearchResult }) {
      state.citySearchResult = citySearchResult;
    },
    resetCitySearchResult(state) {
      state.citySearchResult = [];
    },
    setFavoritesCities(state) {
      const idx = state.favoritesCities.findIndex(favoriteCity => favoriteCity.key === state.currCity.Key);
      if (idx === -1) {
        state.currCity = {
          ...state.currCity,
          isCityFavorite: true
        };
      }
      state.favoritesCities = [...state.favoritesCities, state.currCity];
    },
    removeFavoritesCities(state) {
      state.currCity = {
        ...state.currCity,
        isCityFavorite: false
      };
      const idx = state.favoritesCities.findIndex(favoriteCity => favoriteCity.Key === state.currCity.Key);
      state.favoritesCities.splice(idx, 1);
    },
    setCurrCity(state, currCity) {
      currCity.isCityFavorite = false;
      state.favoritesCities.forEach((favoriteCity) => {
        if (favoriteCity.Key === currCity.Key) return currCity = {
          ...currCity,
          isCityFavorite: true
        };
      });
      state.currCity = { ...currCity };
    },
    setTempertureUnit(state, unit) {
      state.tempertureUnit = unit;
    }
  },
  actions: {
    async getCityForecasts(context, cityKey) {
      let dailyCityForecasts = await Axios.get(`${BASE_URL}/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}`);
      dailyCityForecasts = dailyCityForecasts.data;
      context.commit({ type: 'setDailyForecasts', dailyForecasts: dailyCityForecasts.DailyForecasts });
    },
    async getGeoposition(context, pos) {
      const latLan = pos.lat ? pos : { lat: 32.0798667, lon: 34.7851156 };
      const res = await Axios.get(`${BASE_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latLan.lat}%2C${latLan.lon}`);
      context.commit('setCurrCity', res.data);
      context.dispatch('getCityForecasts', res.data.Key);
    },

    async getFavoritesCitiesWeather(context) {
      let favoritesCitiesWeather = await Promise.all(context.getters.favoritesCities.map(city => {
        return Axios.get(`${BASE_URL}/currentconditions/v1/${city.Key}?apikey=${API_KEY}&details=true`);
      }));
      context.commit('setFavoritesCitiesWeathert', favoritesCitiesWeather);
    },
    async getCity(context, str) {
      let citySearchResult = await Axios.get(`${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${str}`);
      citySearchResult = citySearchResult.data;
      context.commit({ type: 'setCitySearchResult', citySearchResult });
    },
  },
  modules: {
  }
});
