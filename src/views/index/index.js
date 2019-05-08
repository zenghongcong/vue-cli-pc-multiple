import Vue from "vue";
import App from "./index.vue";
import store from "@/store";
import "@/common";
import "@/utils";
import 'reset-css';

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
