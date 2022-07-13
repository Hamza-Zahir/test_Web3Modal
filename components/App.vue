<template>
  <div>
    <div
      class="bg-dark text-light p-2 d-flex justify-content-around align-items-center flex-wrap"
    >
      <h2 class="">test Web3Modal</h2>
      <div
        class="btn btn-primary"
        @click="
          () => {
            connect_wallet();
          }
        "
      >
        {{
          CurrentAccount
            ? `${CurrentAccount.slice(0, 5)}...${CurrentAccount.slice(
                CurrentAccount.length - 4
              )}`
            : " Conect Wallet"
        }}
      </div>
      <div v-if="CurrentAccount">
        <ChangeNetwork />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
    ...mapGetters(["provider"]),
  },
  mounted() {
    this.checkWalletIsConnected();
  },
  methods: {
    ...mapActions(["checkWalletIsConnected"]),
    ...mapActions(["connect_wallet"]),
    // ...mapActions(["switchNetwork"]),
  },
};
</script>
