import Vue from "vue";
import App from "./App.vue";
import Axios from "axios";

import store from "./store";
import router from "./router";
import VueYoutube from "vue-youtube";
import VueToast from "vue-toast-notification";

import "vue-toast-notification/dist/index.css";
import "vue-awesome/icons/flag";
import "vue-awesome/icons";

Vue.use(VueToast);
Vue.use(VueYoutube);


Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import image from "../assets/logo-small.png";
import Icon from "vue-awesome/components/Icon";

export default {
  name: "Header",
  data() {
    return {
      image,
      inputSearch: ""
    };
  },
  components: {
    "v-icon": Icon
  },
  methods: {
    navigateMain() {
      this.$router.push({ name: "Main" });
    },
    navigateMyList() {
      this.$router.push({ name: "MyList" });
    }
  }
};

import { Carousel, Slide } from "vue-carousel";
import Spinner from "../components/Spinner";
import { Movies } from "../services/api";

export default {
  name: "Movies",
  data() {
    return {
      movies: [],
      showLoading: true,
      paginationButtons: false
    };
  },
  props: {
    type: String,
    description: String,
  },
  components: {
    Carousel,
    Slide,
    Spinner
  },
  mounted() {
    this.getMovieDetail();
  },
  methods: {
    async getMovieDetail(){
      this.showLoading = true;
      try {
        const { data: { Search } } = await Movies(this.type).get();
        this.movies = Search;
      } catch (error) {
        console.error(error);
      } finally {
        this.showLoading = false;
      }
    },
    showDetail(_id) {
      this.$router.push({ name: "Detail", params: { id: _id } });
    },
  }
}