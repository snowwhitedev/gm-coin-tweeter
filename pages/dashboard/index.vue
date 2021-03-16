<template>
  <div>
    <div class="row mt-2">
      <div class="col-12">
        <MetaCard :assets="assets" :influencers="influencers" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <TweetTable :asset-types="assetTypes" />
      </div>
    </div>
  </div>
</template>

<script>
import MetaCard from '@/components/dashboard/MetaCard.vue';
import TweetTable from '@/components/dashboard/TweetTable.vue';
export default {
  components: {
    MetaCard,
    TweetTable
  },
  middleware: 'router-auth',
  data() {
    return {
      assets: 0,
      influencers: 0,
      assetTypes: []
    };
  },
  head() {
    return {
      title: `Sales Dashboard | Minton - Nuxtjs Responsive Admin Dashboard Template`
    };
  },
  async mounted() {
    try {
      const res = await this.$axios.get('/stream/metadata', {
        withCredentials: false
      });
      /* eslint-disable */
      const { asset_count, asset_types, influencer_count } = res.data;
      this.assets = asset_count;
      this.influencers = influencer_count;
      this.assetTypes = asset_types;
    } catch (error) {
      /* eslint-disable next*/
      console.log('[error]', error);
    }
  }
};
</script>
