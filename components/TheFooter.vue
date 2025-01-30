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
      <b-row class="footer-head py-4">
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
        <b-col md="9" class="links">
          <b-row>
            <b-col md="3">
              <h6>Graphic Resources</h6>
              <b-list-group>
                <b-list-group-item
                  v-for="item in graphicResources"
                  :key="item.text"
                  class="border-0 px-0 bg-transparent"
                >
                  <a :href="item.link">{{ item.text }}</a>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col md="3">
              <h6>Products</h6>
              <b-list-group>
                <b-list-group-item
                  v-for="item in products"
                  :key="item.text"
                  class="bg-transparent border-0 px-0"
                >
                  <a :href="item.link">{{ item.text }}</a>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col md="3">
              <h6>Company</h6>
              <b-list-group>
                <b-list-group-item
                  v-for="item in company"
                  :key="item.text"
                  class="bg-transparent border-0 px-0"
                >
                  <a :href="item.link">{{ item.text }}</a>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col md="3">
              <h6>Legal</h6>
              <b-list-group>
                <b-list-group-item
                  v-for="item in legal"
                  :key="item.text"
                  class="bg-transparent border-0 px-0"
                >
                  <a :href="item.link">{{ item.text }}</a>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-col>

        <!-- Social and App Links -->
        <b-col md="3" class="text-left">
          <h6>Get IconScout for Desktop</h6>
          <b-img
            src="/img/os-icons.png"
            alt="Apple"
            class="os-icons mt-2"
          ></b-img>

          <h6 class="mt-5">Get LottieFiles Mobile App</h6>
          <div class="mt-2 store-logos">
            <b-img
              src="/img/logo-app-store.png"
              alt="App Store"
              class="me-2"
            ></b-img>
            <b-img src="/img/logo-play-store.png" alt="Google Play"></b-img>
          </div>

          <h6 class="mt-5">Follow Us</h6>
          <div>
            <b-img src="/img/sns-icons.png" class="mt-2 sns-icons"></b-img>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <!-- Bottom Footer -->
    <div class="bottom">
      <b-row class="justify-content-between align-items-center bottom-row">
        <b-col md="6">
          <p class="my-auto copyright">
            © 2021 Design Barn Inc. Made with ❤️ in India
          </p>
        </b-col>
        <b-col
          md="6"
          class="text-end d-flex flex-row justify-content-end align-items-center"
        >
          <SvgoIcoYellowLock filled :fontControlled="false" class="lock" />
          <p class="my-auto stripe">Secure Payments</p>
          <b-img
            src="/img/logo-stripe.svg"
            alt="Stripe"
            class="stripe-logo"
          ></b-img>
        </b-col>
      </b-row>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  font-size: 14px;
  line-height: 21px;
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

    h6 {
      color: #2e334c;
      font-weight: 700;
      text-wrap: nowrap;
    }

    .links {
      line-height: 24px;
      text-wrap: nowrap;

      a {
        font-weight: 400;
        color: #424866;
        text-decoration: none;
      }
    }

    img.os-icons {
      width: 94px;
    }

    .store-logos {
      display: flex;
      justify-content: start;

      img {
        width: 118.25px;
      }
    }

    img.sns-icons {
      width: 241px;
    }
  }

  .bottom {
    display: flex;
    justify-content: center;
    background-color: #d8dbeb;
    height: 88px;

    .bottom-row {
      width: 1113px;
    }
    .lock {
      width: 24px;
      height: 24px;
    }

    p {
      font-family: "Karla", sans-serif;
      color: #424866;
      font-size: 14px;
      line-height: 24px;
    }

    .copyright {
      font-weight: 400;
    }

    .stripe {
      font-weight: 200;
      font-style: italic;
    }

    .stripe-logo {
      width: 83.9px;
      height: 40px;
      margin-left: 23px;
    }
  }
}
</style>
