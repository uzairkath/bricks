import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20ABI } from "wagmi";
import { bsc } from "wagmi/chains";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20ABI,
    },
  ],
  plugins: [
    etherscan({
      apiKey: "",
      chainId: bsc.id,
      contracts: [
        {
          name: "My USD",
          address: {
            [bsc.id]: "0xAD9317601872De47a92A175a94Feb18e72CB5bD5",
          },
        },
        {
          name: "My Rocks",
          address: {
            [bsc.id]: "0x6D635dc4a2A54664B54dF6a63e5ee31D5b29CF6e",
          },
        },
        {
          name: "My LP",
          address: {
            [bsc.id]: "0x85f94745D1B401617119a4E53F11484053C0EA42",
          },
        },
        {
          name: "My Bond",
          address: {
            [bsc.id]: "0xF347bDc0e502D33978b3c4d187bf75E5B452E491",
          },
        },
        {
          name: "MyUSD REWARDPOOL",
          address: {
            [bsc.id]: "0x51a93E1484C3562632d4e480ffc9BF4ac1AFe64D",
          },
        },
        {
          name: "TaxOracle",
          address: {
            [bsc.id]: "0x1b1D898A7b27629Ff99504d8e923B6BaA4fe69F4",
          },
        },
        {
          name: "Boardroom",
          address: {
            [bsc.id]: "0x950715C1828178343d5285948c45Ad1F713715A8",
          },
        },
        {
          name: "Treasury",
          address: {
            [bsc.id]: "0x1A2c2204fEe5355080a1bCbC0F4E8aDd58d4b6d7",
          },
        },
        {
          name: "ZAPPER",
          address: {
            [bsc.id]: "0x2De0b483E9eaC4189F02E4c4d805302C3b52eb7a",
          },
        },
        {
          name: "My USD Oracle",
          address: {
            [bsc.id]: "0x8192bC0d3CaBc8A9ffE47c3C77d85262D183c3b2",
          },
        },
        // {
        //   name: "Referral",
        //   address: {
        //     [bsc.id]: "0xD147c4f188a617e9f8C2e55c91306BcEa49a9918",
        //   },
        // },
        {
          name: "Pancake Swap Pair",
          address: {
            [bsc.id]: "0x85f94745D1B401617119a4E53F11484053C0EA42",
          },
        },
      ],
    }),
    react(),
  ],
});
