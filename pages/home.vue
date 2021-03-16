<template>
  <div>
    <div class="my-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="text-center">
              <img
                src="~/assets/images/animat-rocket-color.gif"
                alt
                height="160"
              />

              <h3 class="mt-4">Stay tunned, we're launching very soon</h3>
              <p class="text-muted">We're making the system more awesome.</p>

              <div class="row mt-5 justify-content-center">
                <div class="col-md-8">
                  <div data-countdown="2020/12/31" class="counter-number">
                    <div class="coming-box">
                      {{ days }}
                      <span>Days</span>
                    </div>
                    <div class="coming-box">
                      {{ hours }}
                      <span>Hours</span>
                    </div>
                    <div class="coming-box">
                      {{ minutes }}
                      <span>Minutes</span>
                    </div>
                    <div class="coming-box">
                      {{ seconds }}
                      <span>Seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center mt-4">
          <div class="col-12 d-flex justify-content-center">
            <b-button variant="primary" class="ml-1" @click="login">
              Login
            </b-button>
            <b-button variant="primary" class="ml-1" @click="register">
              Register
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Coming-soon component
 */
export default {
  layout: 'auth',
  data() {
    return {
      title: 'Coming-soon',
      start: '',
      end: '',
      interval: '',
      days: '',
      minutes: '',
      hours: '',
      seconds: '',
      starttime: 'Nov 5, 2018 15:37:25',
      endtime: 'Dec 31, 2020 16:37:25'
    };
  },
  head() {
    return {
      title: `Coming-soon | Minton - Nuxtjs Responsive Admin Dashboard Template`
    };
  },
  mounted() {
    this.start = new Date(this.starttime).getTime();
    this.end = new Date(this.endtime).getTime();
    // Update the count down every 1 second
    this.timerCount(this.start, this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end);
    }, 1000);
  },
  methods: {
    timerCount(start, end) {
      // Get todays date and time
      const now = new Date().getTime();

      // Find the distance between now an the count down date
      const distance = start - now;
      const passTime = end - now;

      if (distance < 0 && passTime < 0) {
        clearInterval(this.interval);
      } else if (distance < 0 && passTime > 0) {
        this.calcTime(passTime);
      } else if (distance > 0 && passTime > 0) {
        this.calcTime(distance);
      }
    },
    calcTime(dist) {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    },
    login() {
      this.$router.push({ path: '/auth/login' });
    },
    register() {
      this.$router.push({ path: '/auth/register' });
    }
  }
};
</script>
