// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@bootstrap-vue-next/nuxt",
    "@nuxt/eslint",
    "@hebilicious/vue-query-nuxt",
    "nuxt-svgo",
  ],
  css: ["bootstrap/dist/css/bootstrap.min.css", "~/assets/css/main.css"],
  runtimeConfig: {
    clientId: "",
    clientSecretKey: "",
  },
  routeRules: {
    "/": { redirect: "/all-assets" },
  },
});
