<template>
  <div class="switchcard">
    <div class="bg-blue_dark text-light pr rounded-10">
      <div
        class="py-2 px-3 fw-bold bg-blue_dark d-flex justify-content-between rounded-10"
        @click="showNetworks = !showNetworks"
      >
        {{ chainName }}

        <b-icon icon="chevron-down" class="ms-1 pt-1"></b-icon>
      </div>

      <div
        class="content bg-blue_dark pat0l0 cp rounded-10"
        v-if="showNetworks"
      >
        <div v-for="net in networksManage" :key="net.chainName">
          <div
            class="py-2 px-3 fw-bold p-1 border-top rounded-10"
            :class="net.chainName == chainName ? 'd-none' : ''"
            @click="
              () => {
                chengNetwork(net);
                showNetworks = false;
              }
            "
          >
            {{ net.chainName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import networks from "~/json/networks.json";
import { mapActions, mapGetters } from "vuex";
import ethers from "ethers";
// const networksManage = ;
export default {
  data() {
    return {
      networksManage: networks,
      chainId: 42,
      chainName: "Kovan",
      showNetworks: false,
    };
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
  },
  mounted() {
    this.manegChainId();
    this.getchainID();
  },
  methods: {
    ...mapActions(["checkWalletIsConnected"]),
    async getchainID() {
      await this.checkWalletIsConnected();
      let count = 0;

      networks.map((e) => {
        if (e.chainId == this.ChainId) {
          this.chainName = e.chainName;
          count++;
        }
        if (count == 0) {
          this.chainName = "networ Error";
        }
      });
    },
    manegChainId() {
      this.networksManage.map((e) => {
        e.chainId = `0x${Number(e.chainId).toString(16)}`;
      });
    },

    async chengNetwork(networkData) {
      try {
        const ethereum = window.ethereum;
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networkData.chainId }],
        });
        this.getchainID();
      } catch (switchError) {
        console.log(switchError);
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{ ...networkData }],
            });
            this.getchainID();
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.switchcard {
  position: relative;
  width: 260px;
}
.content {
  position: absolute;
  top: 100%;
  width: 100%;
}
.bg-blue_dark {
  background: #0c0149;
}
.rounded-10 {
  border-radius: 10px;
}
</style>
