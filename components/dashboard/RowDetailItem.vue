<template>
  <TransitionExpand>
    <div v-if="show">
      <b-card>
        <b-row class="mb-2">
          <b-col md="6">
            <b-img-lazy
              v-if="row.item.media_url"
              :src="row.item.media_url"
              class="media-img"
            />
            <div v-else class="media-img-alt">
              <coingecko-coin-ticker-widget
                :coin-id="row.item.asset_code"
                currency="usd"
                locale="en"
                height="205"
                class="coin-ticker-snapshot"
              >
              </coingecko-coin-ticker-widget>
            </div>
          </b-col>
          <b-col md="6">
            <coingecko-coin-price-chart-widget
              :coin-id="row.item.asset_code"
              currency="usd"
              height="205"
              locale="en"
            ></coingecko-coin-price-chart-widget>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </TransitionExpand>
</template>
<script>
import TransitionExpand from '../UI/TransitionExpand.vue';
export default {
  components: {
    TransitionExpand
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false
    };
  },
  head() {
    return {
      script: [
        {
          src:
            'https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js'
        },
        {
          src: 'https://widgets.coingecko.com/coingecko-coin-ticker-widget.js'
        }
      ]
    };
  },
  created() {
    this.$nextTick(() => (this.show = true));
  }
};
</script>

<style lang="scss" scoped>
.media-img {
  height: 205px;
  max-height: 205px;
  max-width: 100%;
}
.media-img-alt {
  width: 100%;
  height: 205px;
}
</style>
