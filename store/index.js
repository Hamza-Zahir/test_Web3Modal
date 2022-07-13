import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

const INFURA_KEY = "09d37c7748e64852b6335d3f0f6ce928";
const APP_NAME = "test Web3Modal";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_KEY,
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: APP_NAME,
      infuraId: INFURA_KEY,
      rpc: "",
      chainId: 4,
      darkMode: true,
    },
  },

  binancechainwallet: {
    package: true,
  },


};

const state = {
  CurrentAccount: "",
  ChainId: "",
  Library:""
};

const getters = {
  CurrentAccount: (state) => state.CurrentAccount,
  ChainId: (state) => state.ChainId,
  Library: (state) => state.Library,
};

const actions = {
  async connect_wallet({ commit }) {
    try {
      const web3Modal = new Web3Modal({
        network: "rinkeby",
        cacheProvider: true,
        providerOptions,
      });
      web3Modal.clearCachedProvider();

      const _provider = await web3Modal.connect();
      window.location.reload();
      // const _library  = new ethers.providers.Web3Provider(
      //   _provider
      // );

      // if (_library) {
      //   commit("setCurrentAccount", _library.provider.selectedAddress);
      //   commit("setChainId", Number(_library.provider.chainId));
      // }
    } catch (error) {
      console.log(error);
    }
  },
  async checkWalletIsConnected({ commit }) {
    const provider = window.ethereum;
    if (provider) {
      const accountes = await provider.request({ method: "eth_accounts" });
      const library = new ethers.providers.Web3Provider(provider);
      const signer = library.getSigner();
      const chainId = await signer.getChainId();
      if (accountes.length) {
        commit("setCurrentAccount", accountes[0]);
        commit("setChainId", Number(chainId));
      }

      function handleAccountsChanged(accounts) {
        commit("setCurrentAccount", accounts[0]);
      }
      function handleChainChanged(_chainId) {
        commit("setChainId", Number(_chainId) );
      }
      const handleDisconnect = () => {
        disconnect();
      };
      // ......................................
      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);
    }
  },


};
const mutations = {
  setCurrentAccount: (state, addres) => (state.CurrentAccount = addres),
  setChainId: (state, chainId) => (state.ChainId = chainId),
  setLibrary: (state, library) => (state.Library = library),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
