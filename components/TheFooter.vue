<script setup lang="ts">
const graphicResources = [
  { text: "Free Icons", link: "#" },
  { text: "Free Emoji Icons", link: "#" },
  { text: "Free Logo Icons", link: "#" },
  { text: "iOS Icons", link: "#" },
  { text: "Sticker Icons", link: "#" },
  { text: "Gradient Icons", link: "#" },
  { text: "Curated Bundle", link: "#" },
  { text: "Calendar of Festival", link: "#" },
  { text: "Free Assets of the Day", link: "#" },
  { text: "Explore Design Assets", link: "#" },
];

const products = [
  { text: "Unicon Icon Font", link: "#" },
  { text: "Color Editor", link: "#" },
  { text: "Apps & Plugins", link: "#" },
  { text: "Hire Designers", link: "#" },
  { text: "IconScout API", link: "#" },
  { text: "Top Illustrations", link: "#" },
  { text: "Top 3D Assets", link: "#" },
  { text: "Reverse Image Search", link: "#" },
  { text: "Unicon Plugin for Figma", link: "#" },
];

const company = [
  { text: "Blog", link: "#" },
  { text: "About", link: "#" },
  { text: "Access Features", link: "#" },
  { text: "Sell on IconScout", link: "#" },
  { text: "Startup Program", link: "#" },
  { text: "We’re Hiring", link: "#" },
];

const legal = [
  { text: "Terms of Use", link: "#" },
  { text: "Privacy Policy", link: "#" },
  { text: "License Agreement", link: "#" },
  { text: "Contributor Terms", link: "#" },
  { text: "Support Center", link: "#" },
  { text: "Join Discord Community", link: "#" },
];
</script>

<template>
  <footer>
    <b-container fluid class="text-dark container">
      <b-row
        class="footer-head d-flex justify-content-between align-items-center py-4"
      >
        <b-col class="d-flex flex-row align-items-center">
          <SvgoLogo filled :fontControlled="false" class="logo" />
          <p class="my-auto px-2">Design Resource Marketplace</p>
        </b-col>
        <b-col class="d-flex flex-row justify-content-end align-items-center">
          <p class="my-auto">
            <strong class="text-primary">5,663,871</strong> graphic resources &
            counting
          </p>
        </b-col>
      </b-row>
      <b-row class="justify-content-between align-items-start py-4">
        <!-- Footer Links -->
        <b-col md="6">
          <b-row>
            <b-col md="3">
              <h6>Graphic Resources</h6>
              <b-list-group variant="flush">
                <b-list-group-item
                  v-for="item in graphicResources"
                  :key="item.text"
                  class="bg-light border-0 px-0"
                >
                  <a :href="item.link" class="text-dark text-decoration-none">{{
                    item.text
                  }}</a>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col md="3">
              <h6>Products</h6>
              <b-list-group variant="flush">
                <b-list-group-item
                  v-for="item in products"
                  :key="item.text"
                  class="bg-light border-0 px-0"
                >
                  <a :href="item.link" class="text-dark text-decoration-none">{{
                    item.text
                  }}</a>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col md="3">
              <h6>Company</h6>
              <b-list-group variant="flush">
                <b-list-group-item
                  v-for="item in company"
                  :key="item.text"
                  class="bg-light border-0 px-0"
                >
                  <a :href="item.link" class="text-dark text-decoration-none">{{
                    item.text
                  }}</a>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col md="3">
              <h6>Legal</h6>
              <b-list-group variant="flush">
                <b-list-group-item
                  v-for="item in legal"
                  :key="item.text"
                  class="bg-light border-0 px-0"
                >
                  <a :href="item.link" class="text-dark text-decoration-none">{{
                    item.text
                  }}</a>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-col>

        <!-- Social and App Links -->
        <b-col md="2" class="text-left">
          <h6>Get IconScout for Desktop</h6>
          <b-img src="/img/os-icons.png" alt="Apple" class="me-2"></b-img>

          <h6 class="mt-3">Get LottieFiles Mobile App</h6>
          <b-img
            src="/img/logo-app-store.png"
            alt="App Store"
            class="me-2 mt-2"
          ></b-img>
          <b-img
            src="/img/logo-play-store.png"
            alt="Google Play"
            class="mt-2"
          ></b-img>

          <h6 class="mt-3">Follow Us</h6>
          <div>
            <b-img src="/img/sns-icons.png"></b-img>
          </div>
        </b-col>
      </b-row>

      <hr class="bg-secondary my-3" />

      <!-- Bottom Footer -->
      <b-row class="justify-content-between align-items-center">
        <b-col md="6">
          <p>© 2021 Design Barn Inc. Made with ❤️ in India</p>
        </b-col>
        <b-col md="6" class="text-end">
          <p class="mb-0">Secure Payments</p>
          <b-img src="/img/logo-stripe.svg" alt="Stripe"></b-img>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background-color: #ebedf5;

  .container {
    max-width: 1113px;

    .footer-head {
      border-bottom: #d8dbeb 1px solid;
    }

    .logo {
      height: 35.85px;
      width: 185.32px;
    }
  }
}
</style>
