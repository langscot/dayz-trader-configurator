import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#1a4ca3",
        secondary: "#0b285c"
      }
    },
  },
  icons: {
    iconfont: 'fa',
  },
});
