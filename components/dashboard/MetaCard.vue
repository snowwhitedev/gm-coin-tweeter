<template>
  <div>
    <h4>Stream</h4>
    <div class="card">
      <div class="card-body">
        <div class="text-center">
          <div class="row">
            <div class="col-6">
              <div class="py-1">
                <i class="bx bx-bitcoin font-24"></i>
                <h3>{{ assets }}</h3>
                <p class="text-uppercase mb-1 font-13 font-weight-medium">
                  Assets
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="py-1">
                <i class="fe-twitter font-24"></i>
                <h3>{{ influencers }}</h3>
                <p class="text-uppercase mb-1 font-13 font-weight-medium">
                  Influncers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MetaCard',
  props: {
    assets: {
      type: Number,
      default: 0
    },
    influencers: {
      type: Number,
      default: 0
    }
  }
};
</script>
