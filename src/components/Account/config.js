import Metamask from "./WalletIcons/metamaskWallet.png";
import Coin98 from "./WalletIcons/Coin98.png";
import TIPSConnect from "../../assets/img/LogoTIPSparaLight.png";
import WalletConnect from "./WalletIcons/wallet-connect.svg";
import MathWallet from "./WalletIcons/MathWallet.svg";
import TokenPocket from "!file-loader!./WalletIcons/TokenPocket.svg";
import SafePal from "!file-loader!./WalletIcons/SafePal.svg";
import TrustWallet from "./WalletIcons/TrustWallet.png";

export const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "OHMIO Wallet",
    icon: TIPSConnect,
    connectorId: "walletconnect",
    priority: 2,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 3,
  },
  {
    title: "Trust Wallet",
    icon: TrustWallet,
    connectorId: "injected",
    priority: 4,
  },/* 
  {
    title: "MathWallet",
    icon: MathWallet,
    connectorId: "injected",
    priority: 999,
  },
  {
    title: "TokenPocket",
    icon: TokenPocket,
    connectorId: "injected",
    priority: 999,
  },
  {
    title: "SafePal",
    icon: SafePal,
    connectorId: "injected",
    priority: 999,
  },
  {
    title: "Coin98",
    icon: Coin98,
    connectorId: "injected",
    priority: 999,
  }, */
];
