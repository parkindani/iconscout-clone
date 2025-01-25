import * as DotLottiePlayer from "@dotlottie/player-component";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      DotLottiePlayer,
    },
  };
});
