<template>
  <div class="card">
    <div v-if="isTableLoading" class="card-body">
      <div class="row mb-md-2 p-4" style="height: 300px">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <b-spinner
            style="width: 4.5rem; height: 4.5rem"
            label="Large Spinner"
          ></b-spinner>
        </div>
      </div>
    </div>
    <div v-if="!isTableLoading" class="card-body">
      <div class="row mb-md-2">
        <div class="col-sm-12 col-md-6">
          <div class="dataTables_length d-flex">
            <label class="d-inline-flex align-items-center">
              Show&nbsp;
              <b-form-select
                v-model="perPage"
                size="sm"
                :options="pageOptions"
              ></b-form-select
              >&nbsp;entries
            </label>
            <label class="d-inline-flex align-items-center ml-2">
              <b-form-select
                v-model="assetType"
                size="sm"
                :options="assetTypes"
                value-field="code"
                text-field="name"
                @change="onFilterByType"
              />
            </label>
          </div>
        </div>
        <!-- Search -->
        <div class="col-sm-12 col-md-6">
          <div
            id="tickets-table_filter"
            class="dataTables_filter text-md-right"
          >
            <label class="d-inline-flex align-items-center">
              Search:
              <b-form-input
                v-model="filter"
                type="search"
                placeholder="Search..."
                class="form-control form-control-sm ml-2"
              ></b-form-input>
            </label>
          </div>
        </div>
      </div>
      <div class="table-responsive mb-0">
        <b-table
          id="table-tweet-recent"
          table-class="tweet-table table table-centered w-100"
          :items="tableData"
          :fields="fields"
          responsive="sm"
          :tbody-transition-props="transProps"
          :per-page="perPage"
          :current-page="currentPage"
          :filter="filter"
          details-td-class="tweet-table-row-detail"
          primary-key="idx"
          @filtered="onFiltered"
        >
          <template #cell(direction)="row">
            <i v-if="row.item.direction === 'down'" class="fas fa-arrow-down">
            </i>
            <i v-else class="fas fa-arrow-up"></i>
          </template>
          <template #cell(asset)="row">
            <div class="cell-wrapper">
              <img
                :src="row.item.asset_image_url"
                :alt="row.item.asset_symbol"
                lt="image"
                class="rounded-circle"
              />
              <span>{{ row.item.asset_name }}</span>
            </div>
          </template>
          <template #cell(influencer)="row">
            <div class="cell-wrapper">
              <img
                :src="row.item.influencer_image_url"
                lt="image"
                class="rounded-circle"
              />
              <div>
                <p class="influencer-name">
                  {{ row.item.influencer_name | ellipsisName }}
                </p>
                <p class="influencer-handle">
                  {{ row.item.influencer_handle | ellipsisHandle }}
                </p>
              </div>
            </div>
          </template>
          <template #cell(timestamp)="row">
            <span>{{ row.item.signal_time | timeSince }}</span>
          </template>
          <template #cell(show_details)="row">
            <i
              :class="{
                ' fas fa-chevron-down': !row.detailsShowing,
                'fas fa-chevron-up': row.detailsShowing
              }"
              @click="row.toggleDetails"
            />
          </template>
          <template #row-details="row">
            <RowDetailItem :row="row" />
          </template>
        </b-table>
      </div>
      <div class="row">
        <div class="col">
          <div class="dataTables_paginate paging_simple_numbers float-right">
            <ul class="pagination pagination-rounded mb-0">
              <!-- pagination -->
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
              ></b-pagination>
            </ul>
          </div>
        </div>
      </div>
      <div class="row"></div>
    </div>
  </div>
</template>

<script>
import { ellipsisTxt, getTimeSince } from '../../plugins/utility';
import { TABLE_ROWS_PER_PAGE } from '../../store/constant';
import RowDetailItem from './RowDetailItem.vue';
const PubNub = require('pubnub');
export default {
  components: {
    RowDetailItem
  },
  filters: {
    ellipsisName(str) {
      return ellipsisTxt(str);
    },
    ellipsisHandle(str) {
      return ellipsisTxt('@' + str, 22);
    },
    timeSince(timeStr) {
      return getTimeSince(timeStr);
    }
  },
  props: {
    assetTypes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      assetType: null,
      currentPage: 1,
      perPage: TABLE_ROWS_PER_PAGE[0],
      pageOptions: TABLE_ROWS_PER_PAGE,
      filter: null,
      tableData: [],
      tableDataAll: [],
      fields: [
        {
          key: 'direction',
          tdClass: 'direction-cell',
          thClass: 'tweet-recent-thClass'
        },
        {
          key: 'asset',
          tdClass: 'asset-cell',
          thClass: 'tweet-recent-thClass'
        },
        {
          key: 'asset_symbol',
          tdClass: 'asset-symbol-cell',
          thClass: 'tweet-recent-thClass'
        },
        {
          key: 'influencer',
          tdClass: 'influencer-cell',
          thClass: 'tweet-recent-thClass'
        },
        {
          key: 'timestamp',
          tdClass: 'timestamp-cell',
          thClass: 'tweet-recent-thClass'
        },
        {
          key: 'post_contents',
          tdClass: 'post_contents-cell',
          thClass: 'tweet-recent-thClass'
        },
        {
          key: 'show_details',
          tdClass: 'show-details-cell',
          thClass: 'tweet-recent-thClass'
        }
      ],
      transProps: {
        // Transition name
        name: 'flip'
      },
      isTableLoading: true
    };
  },
  computed: {
    rows() {
      return this.tableData.length;
    }
  },
  watch: {
    assetTypes: {
      handler() {
        if (this.assetTypes.length > 0) {
          this.assetType = this.assetTypes[0].code;
        }
      },
      deep: true,
      immediate: true
    }
  },
  async mounted() {
    this.isTableLoading = true;
    try {
      const res = await this.$axios.get('/stream/recent', {
        withCredentials: false
      });
      const {
        result: { items }
      } = res.data;
      const itemsIdx = items.map((item, idx) => {
        return {
          idx,
          ...item
        };
      });
      this.tableData = [...itemsIdx];
      this.tableDataAll = [...itemsIdx];
    } catch (error) {
      console.log('[error]', error);
    }
    this.isTableLoading = false;
    // this.$pnSubscribe({ channels: [process.env.pubNubChannel] });
    const currentUser = JSON.parse(localStorage.getItem('auth.currentUser'));
    const pubNub = new PubNub({
      subscribeKey: process.env.pubNubSubKey,
      uuid: currentUser.email
    });
    pubNub.subscribe({
      channels: ['godmode']
    });
    pubNub.addListener({
      message: (messageEvent) => {
        const { message } = messageEvent.message;
        if (message.type === 'asset-post') {
          this.tableData.unshift({
            idx: this.tableDataAll.length,
            ...message.content
          });
          this.tableDataAll.unshift({
            idx: this.tableDataAll.length,
            ...message.content
          });
        }
      }
    });
  },
  methods: {
    onFiltered(filteredItems) {
      this.currentPage = 1;
    },
    onFilterByType() {
      this.filterOn = [];
      const compareArray = ['BTC', 'ETH'];
      switch (Number(this.assetType)) {
        case 1 /** All Assets */:
          this.tableData = [...this.tableDataAll];
          break;
        case 2 /** Exlcude BTC/ETH */:
          this.tableData = this.tableDataAll.filter((item) => {
            return !compareArray.includes(item.asset_symbol.toUpperCase());
          });
          break;
        case 3 /** BTC/ETH Only */:
          this.tableData = this.tableDataAll.filter((item) => {
            return compareArray.includes(item.asset_symbol.toUpperCase());
          });
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
@media (max-width: 500px) {
  .card-body {
    padding: 1rem 0.5rem;
  }
}
</style>
<style lang="scss">
.table {
  overflow: hidden;
}
@import '~assets/tweetTable.scss';
table#table-tweet-recent.table td {
  padding: 0.6rem 0.5rem;
}
.flip-enter {
  opacity: 0;
}
.flip-enter-active {
  animation: slide-in 0.25s ease-out forwards;
  transition: opacity 0.25s;
}
.flip-leave-active {
  animation: slide-out 0.25s ease-out forwards;
  transition: opacity 0.25s;
  opacity: 0;
  position: absolute;
}
.flip-move {
  transition: transform 0.25s;
}
@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(20px);
  }
}
</style>
