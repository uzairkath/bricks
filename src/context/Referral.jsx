import { BigNumber, ethers, providers } from "ethers";
import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import {
  referralAbi,
  contractAddress,
  tokenAbi,
  BusdAddr,
  bricksAddr,
  routerAddr,
  routerAbi,
  wbnbAddr,
  usdcAddr,
  myusdAddr,
  pairAddr,
  rocksAddr,
  nftAbi
} from "./utils/constant";
import useLocalStorage from "../hooks/useLocalStorage";
import apis from "../services";
import axios from "axios";

export const ReferralContext = createContext();

const { ethereum } = window;

export const getReferralContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const ReferralContract = new ethers.Contract(
    contractAddress,
    referralAbi,
    signer
  );
  return ReferralContract;
};

export const ERC20Contract = (addr) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const ReferralContract = new ethers.Contract(addr, tokenAbi, signer);
  return ReferralContract;
};

export const ERC721Contract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const rocksContract = new ethers.Contract(rocksAddr, nftAbi, signer);
  return rocksContract;
};

export const getRouterContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const RouterContract = new ethers.Contract(routerAddr, routerAbi, signer);
  return RouterContract;
};

export const ReferralProvider = ({ children }) => {
  const [user] = useLocalStorage("user", null);
  const [currentAccount, setCurrentAccount] = useState();
  const [myUsdBalance, setMyUsdBalance] = useState("")
  const [myBricksBalance, setMyBricksBalance] = useState("")
  const [myUsdPrice, setMyUsdPrice] = useState("")
  const [pairBalance, setPairBalance] = useState("")
  const [rocksBalance, setRocksBalance] = useState("")
  const [rocksPrice, setRocksPrice] = useState("")
  const [lPPrice, setLPPrice] = useState("")
  const [whiteListed, setWhiteListed] = useState(false);
  const [hashValue, setHashValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [chain, setChainId] = useState("");
  const [price, setPrice] = useState("");
  const [balance, setBalance] = useState("");
  const [response, setResponse] = useState(false);
  const [allowance, setAllowance] = useState("");
  const [refer, setRefer] = useState("");
  const [bricksPrice, setBricksPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(user?.referredBy);

  const chainId = async () => {
    const res = await ethereum.chainId;
    setChainId(res);
  };

  const checkWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please Install Metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

      } else {
        console.log("No account found");
      }
    } catch (err) {
      // setError(err.message);
      throw new Error("No ethereum object.");
    }
  };

  const sendMetaMaskAddress = async (addr, val) => {
    try {
      const body = {
        account: addr,
        value: val
      }
      console.log(addr, "sensend", body)

      await apis.updatePortfolio(body);
    } catch (err) { console.log(err) }

  }


  const connectWallet = async () => {
    try {
      console.log("hello")

      setLoading(true);
      if (!ethereum) return alert("Please Install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      const res1 = await getRocksBalance(accounts[0]);
      const res2 = await getMyUsdBalance(accounts[0]);
      const res3 = await getPairBalance(accounts[0]);
      const res4 = await getRocksPrice();
      const res5 = await getMyBricksBalance(accounts[0]);
      const res6 = await getBricksPrice();
      const res7 = await getmyUSDPrice();
      const res8 = await getLPTokenPrice();
      let temp = parseFloat(((res1 * res4) + (res2 * res7) + (res3 * res8) + (res5 * 0.00024))).toFixed(2)
      console.log("ERABeEB", res1, res2, res3, res4, res5, res6, res7, res8)
      console.log("ERABeEB", temp)
      await sendMetaMaskAddress(accounts[0], temp);


      setLoading(false);
    } catch (err) {
      throw new Error("No ethereum object.");
    }
  };

  ethereum.on("accountsChanged", async (account) => {
    setCurrentAccount(account[0]);
    console.log("Rabeeb", currentAccount)
    // if(currentAccount !== undefined) {
    //  window.location.reload()

    // }
    setQuantity("");
  });

  ethereum.on("chainChanged", async () => {
    chainId();
    navigate(0);
  });

  const changeNetwork = async () => {
    try {
      setLoading(true);
      if (!ethereum) throw new Error("No crypto wallet found");
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0x539",
            //chainId: "0x1"
          },
        ],
      });
      await connectWallet();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  const buyRock = async () => {
    console.log("REABEEB", refer);
    let referAddr = "";
    if (user?.referredBy !== null && refer == "" && !whiteListed) {
      try {
        setLoading(true);
        const response = await apis.getDecryptedAddress();
        console.log("Rabeeb", response.data.data.custodialWalletAddress);
        const res = await getReferralContract().addReferral(
          response?.data?.data?.custodialWalletAddress
        );
        await res.wait();
        referAddr = await getRefer();
        console.log("chl gya", referAddr);
      } catch (err) {
        setLoading(false);
        return console.log("Error 1", err);
      }
    }
    if (Number(allowance) < Number(price * quantity)) {
      try {
        setLoading(true);
        await UsdcApproval(quantity);
      } catch (err) {
        setLoading(false);
        return console.log("Error 2", err);
      }
    }
    try {
      setLoading(true);
      console.log("Before Bricks");
      const res = await BricksRewardAmount(200);
      if (balance >= res && response == false) {
        const val = await BricksRewardAmount(50);
        await BricksApproval(val.toString());
      }
      console.log("After Bricks");
      if (whiteListed) {
        console.log("Whitelisted Part");
        const res = await getReferralContract().buyNFT(1, quantity);
        await res.wait();
        setQuantity("");
      } else {
        console.log("HERE");
        if (referAddr == "" && refer == "") {
          console.log("Non Whitelisted Part");
          const res = await getReferralContract().buyNFT(3, quantity);
          await res.wait();
          setQuantity("");
        } else {
          console.log("Referral part", referAddr);
          const res = await getReferralContract().buyNFT(2, quantity);
          await res.wait();
          const temp = await getLPTokens()
          console.log("Tjsssssssssssssssiiii", parseFloat(temp * quantity).toFixed(2))
          const body = {
            quantity: quantity,
            lp: parseFloat(temp * quantity).toFixed(2)
          };
          await apis.rockSold(body);
          setQuantity("");
        }
      }
      setLoading(false);
      navigate("/portfolio");
    } catch (err) {
      setLoading(false);
      setQuantity("");
      // setLink("")
      console.log(err);
    }
  };

  const buyMyusd = () => {
    console.log("Rabeeb");

  };

  const swapBricksTokens = async (value) => {
    try {
      setLoading(true);
      const _amount = ethers.utils.parseEther(value);
      const path = [wbnbAddr, bricksAddr];
      const res = await checkAmount(value);
      console.log(ethers.utils.parseUnits(res, "9").toString());
      const temp = ethers.utils.parseUnits(res, "9").toString();
      const res2 = await getRouterContract().swapExactETHForTokens(
        temp,
        path,
        currentAccount,
        Math.floor(Date.now() / 1000) + 60 * 10,
        { value: _amount }
      );
      await res2.wait();
      console.log("Success");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error--->", err);
    }
  };

  const swapMyUSDTokens = async (value) => {
    try {
      setLoading(true);
      const _amount = ethers.utils.parseEther(value);
      const path = [wbnbAddr, usdcAddr, myusdAddr];
      const res = await checkAmount2(value);
      console.log(ethers.utils.parseUnits(res, "18").toString());
      const temp = ethers.utils.parseUnits(res, "18").toString();
      const res2 = await getRouterContract().swapExactETHForTokens(
        temp,
        path,
        currentAccount,
        Math.floor(Date.now() / 1000) + 60 * 10,
        { value: _amount }
      );
      await res2.wait();
      console.log("Success");
      setLoading(false);



    } catch (err) {
      setLoading(false);
      console.log("Error--->", err);
    }
  };

  const swapUSDCToMyUSDTokens = async (value) => {
    try {
      setLoading(true);
      const _amount = ethers.utils.parseEther(value);
      const path = [usdcAddr, myusdAddr];
      const res = await checkAmount4(value);
      console.log(ethers.utils.parseUnits(res, "18").toString());
      const temp = ethers.utils.parseUnits(res, "18").toString();
      console.log("Running")
      await ERC20Contract(usdcAddr).approve(routerAddr, _amount);
      const res2 = await getRouterContract().swapExactTokensForTokens(
        _amount,
        temp,
        path,
        currentAccount,
        Math.floor(Date.now() / 1000) + 60 * 10
      );
      await res2.wait();
      console.log("Success");
      setLoading(false);


    } catch (err) {
      setLoading(false);
      console.log("Error--->", err);
    }
  };

  const swapUSDCTokens = async (value) => {
    try {
      setLoading(true);
      const _amount = ethers.utils.parseEther(value);
      const path = [wbnbAddr, usdcAddr];
      const res = await checkAmount3(value);
      console.log(ethers.utils.parseUnits(res, "18").toString());
      const temp = ethers.utils.parseUnits(res, "18").toString();
      const res2 = await getRouterContract().swapExactETHForTokens(
        temp,
        path,
        currentAccount,
        Math.floor(Date.now() / 1000) + 60 * 10,
        { value: _amount }
      );
      await res2.wait();
      console.log("Success");
      setLoading(false);


      return true;

    } catch (err) {
      setLoading(false);
      console.log("Error--->", err);
    }
  };
  const checkAmount = async (value) => {
    const _amount = ethers.utils.parseEther(value);
    const path = [wbnbAddr, bricksAddr];
    const res3 = await getRouterContract().getAmountsOut(_amount, path);
    console.log(ethers.utils.formatUnits(res3[1].toString(), "9"));
    return ethers.utils.formatUnits(res3[1].toString(), "9");
  };

  const checkAmount2 = async (value) => {
    const _amount = ethers.utils.parseEther(value);
    const path = [wbnbAddr, usdcAddr, myusdAddr];
    const res3 = await getRouterContract().getAmountsOut(_amount, path);
    console.log(ethers.utils.formatUnits(res3[2].toString(), "18"));
    return ethers.utils.formatUnits(res3[2].toString(), "18");
  };

  const checkAmount4 = async (value) => {

    const _amount = ethers.utils.parseEther(value);
    const path = [usdcAddr, myusdAddr];
    const res3 = await getRouterContract().getAmountsOut(_amount, path);
    console.log(ethers.utils.formatUnits(res3[1].toString(), "18"));
    return ethers.utils.formatUnits(res3[1].toString(), "18");
  };

  const checkAmount3 = async (value) => {
    const _amount = ethers.utils.parseEther(value);
    const path = [wbnbAddr, usdcAddr];
    const res3 = await getRouterContract().getAmountsOut(_amount, path);
    console.log(ethers.utils.formatUnits(res3[1].toString(), "18"));
    return ethers.utils.formatUnits(res3[1].toString(), "18");
  };

  const getPrice = async () => {
    const price = await getReferralContract().viewPrice();
    setPrice(ethers.utils.formatUnits(price));
  };

  const getBalance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const RouterContract = new ethers.Contract(routerAddr, routerAbi, signer);
      const balance = await provider.getBalance(currentAccount);
      const balance1 = ethers.utils.formatEther(balance);
      const gas = await provider.getGasPrice();
      const gas1 = ethers.utils.formatEther(gas);
      //args//
      const path = [wbnbAddr, bricksAddr];
      const _amount = ethers.utils.parseEther(balance1);
      const res = await checkAmount(balance1?.toString());
      const temp = ethers.utils.parseUnits(res, "9").toString();
      console.log("runni", temp);

      const gasPrice = await RouterContract.estimateGas.swapExactETHForTokens(
        temp,
        path,
        currentAccount,
        Math.floor(Date.now() / 1000) + 60 * 10,
        { value: _amount }
      );
      console.log("dsddsd", balance1);
      console.log("gas price", gasPrice.toString() * gas1 * 40);
      console.log("dsd", balance1 - gasPrice.toString() * gas1 * 40);
      let balanceInEth = 0;
      if (Number(gasPrice.toString() * gas1 * 40) > Number(balance1)) {
        console.log("INNN");
        balanceInEth = String(balance1 - gasPrice.toString() * gas1);
      } else {
        balanceInEth = String(balance1 - gasPrice.toString() * gas1 * 40);
      }

      console.log(balanceInEth);
      return balanceInEth;
    } catch (err) {
      console.log("err", err);
    }
  };

  const getBalance2 = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const RouterContract = new ethers.Contract(routerAddr, routerAbi, signer);
      const balance = await provider.getBalance(currentAccount);
      const balance1 = ethers.utils.formatEther(balance);
      const gas = await provider.getGasPrice();
      const gas1 = ethers.utils.formatEther(gas);
      //args//
      const path = [wbnbAddr, usdcAddr, BusdAddr];
      const _amount = ethers.utils.parseEther(balance1);
      const res = await checkAmount2(balance1?.toString());
      const temp = ethers.utils.parseUnits(res, "18").toString();
      console.log("runni", temp);
      const gasPrice = await RouterContract.estimateGas.swapExactETHForTokens(
        temp,
        path,
        currentAccount,
        Math.floor(Date.now() / 1000) + 60 * 10,
        { value: _amount }
      );
      console.log("dsddsd", balance1);
      console.log("gas price", gasPrice.toString() * gas1 * 40);
      console.log("dsd", balance1 - gasPrice.toString() * gas1 * 40);
      let balanceInEth = 0;
      if (Number(gasPrice.toString() * gas1 * 40) > Number(balance1)) {
        console.log("INNN");
        balanceInEth = String(balance1 - gasPrice.toString() * gas1);
      } else {
        balanceInEth = String(balance1 - gasPrice.toString() * gas1 * 40);
      }

      console.log(balanceInEth);
      return balanceInEth;
    } catch (err) {
      console.log("err", err);
    }
  };

  const getBalance3 = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const RouterContract = new ethers.Contract(routerAddr, routerAbi, signer);
      const balance = await provider.getBalance(currentAccount);
      const balance1 = ethers.utils.formatEther(balance);
      const gas = await provider.getGasPrice();
      const gas1 = ethers.utils.formatEther(gas);
      //args//
      const path = [wbnbAddr, BusdAddr];
      const _amount = ethers.utils.parseEther(balance1);
      const res = await checkAmount3(balance1?.toString());
      const temp = ethers.utils.parseUnits(res, "18").toString();
      console.log("runni", temp);
      const gasPrice = await RouterContract.estimateGas.swapExactETHForTokens(
        temp,
        path,
        currentAccount,
        Math.floor(Date.now() / 1000) + 60 * 10,
        { value: _amount }
      );
      console.log("dsddsd", balance1);
      console.log("gas price", gasPrice.toString() * gas1 * 40);
      console.log("dsd", balance1 - gasPrice.toString() * gas1 * 40);
      let balanceInEth = 0;
      if (Number(gasPrice.toString() * gas1 * 40) > Number(balance1)) {
        console.log("INNN");
        balanceInEth = String(balance1 - gasPrice.toString() * gas1);
      } else {
        balanceInEth = String(balance1 - gasPrice.toString() * gas1 * 40);
      }

      console.log(balanceInEth);
      return balanceInEth;
    } catch (err) {
      console.log("err", err);
    }
  };

  const getBalance4 = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const RouterContract = new ethers.Contract(routerAddr, routerAbi, signer);
      const balance = await ERC20Contract(usdcAddr).balanceOf(currentAccount)
      const balance1 = ethers.utils.formatEther(balance);
      const gas = await provider.getGasPrice();
      const gas1 = ethers.utils.formatEther(gas);
      //args//
      const path = [usdcAddr, myusdAddr];
      const _amount = ethers.utils.parseEther(balance1);
      const res = await checkAmount4(balance1?.toString());

      const temp = ethers.utils.parseUnits(res, "18").toString();

      console.log("runni", _amount, temp, path, currentAccount, Math.floor(Date.now() / 1000) + 60 * 10);
      await ERC20Contract(usdcAddr).approve(routerAddr, _amount);
      const gasPrice = await RouterContract.estimateGas.swapExactTokensForTokens(
        _amount,
        temp,
        path,
        currentAccount,
        Math.floor(Date.now() / 1000) + 60 * 10,
      );
      console.log("YAHAN TAk")
      console.log("dsddsd", balance1);
      console.log("gas price", gasPrice.toString() * gas1 * 40);
      console.log("dsd", balance1 - gasPrice.toString() * gas1 * 40);
      let balanceInEth = 0;
      if (Number(gasPrice.toString() * gas1 * 40) > Number(balance1)) {
        console.log("INNN");
        balanceInEth = String(balance1 - gasPrice.toString() * gas1);
      } else {
        balanceInEth = String(balance1 - gasPrice.toString() * gas1 * 40);
      }

      console.log(balanceInEth);
      return balanceInEth;
    } catch (err) {
      console.log("err", err);
    }
  };

  const getRefer = async () => {
    const refer = await getReferralContract().refer(currentAccount);
    console.log("Reg", refer);
    if (refer == "0x0000000000000000000000000000000000000000") {
      setRefer("");
      return "";
    } else {
      setRefer(refer);
      return refer;
    }
  };

  const UsdcApproval = async (quantity) => {
    const total = quantity * price;
    const decimals = 18;
    const input = total;
    const amount = BigNumber.from(input).mul(BigNumber.from(10).pow(decimals));
    console.log(amount.toString());
    await ERC20Contract(usdcAddr).approve(contractAddress, amount.toString());
  };

  const getBusdAllowance = async () => {
    try {
      const res = await ERC20Contract(BusdAddr).allowance(
        currentAccount,
        contractAddress
      );
      setAllowance(res.toString());
      console.log("Allowance", res.toString());
      return res;
    } catch (err) {
      console.log("Error", err);
    }
  };

  const BricksApproval = async (quantity) => {
    try {
      await ERC20Contract(bricksAddr).approve(contractAddress, quantity);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const BricksRewardAmount = async (amount) => {
    try {
      const res = await getReferralContract().BricksCalculation(amount);
      // setRequiredAmount(Number(res.toString()))

      console.log(Number(res.toString()));
      return Number(res.toString());
    } catch (err) {
      console.log("Error", err);
    }
  };

  const getBricksBalance = async () => {
    const balance = await ERC20Contract(bricksAddr).balanceOf(currentAccount);
    setBalance(Number(balance.toString()));

    console.log(Number(balance.toString()));
  };

  const checkForReward = async () => {
    const res = await getReferralContract().brickReward(currentAccount);
    setResponse(res);
    console.log(res);
  };

  const isWhiteListed = async () => {
    const res = await getReferralContract().whitelist(currentAccount);
    setWhiteListed(res);
    console.log("White", res);
  };

  const getLPTokens = async () => {
    const res = await getReferralContract().LPCalculation();
    const val = parseFloat(ethers.utils.formatEther(res)).toFixed(2)
    return val;
  }

  const encrypt = () => {
    const secretPass = import.meta.env.VITE_SECRET_KEY;
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(currentAccount),
      secretPass
    ).toString();

    setHashValue(data);
  };

  const getRocksBalance = async (addr) => {
    try {
      const balance = await ERC721Contract().balanceOf(addr);
      setRocksBalance(balance.toString())
      return balance.toString()
    }
    catch (err) {
      console.log(err)
    }
  };

  const getRocksPrice = async () => {
    try {
      const balance = await ERC721Contract().price();
      setRocksPrice(ethers.utils.formatEther(balance)?.toString())
      return ethers.utils.formatEther(balance)?.toString();
    }
    catch (err) {
      console.log(err)
    }
  };

  const getMyUsdBalance = async (addr) => {
    try {
      const balance = await ERC20Contract(myusdAddr).balanceOf(addr);
      const temp = BigNumber.from(balance).toString()
      setMyUsdBalance(ethers.utils.formatEther(temp)?.toString());
      return ethers.utils.formatEther(temp)?.toString()
    } catch (err) {
      console.log(err)
    }

  };

  const getMyBricksBalance = async (addr) => {
    try {
      const balance = await ERC20Contract(bricksAddr).balanceOf(addr);
      const temp = BigNumber.from(balance).toString()

      setMyBricksBalance(ethers.utils.formatUnits(temp, "9")?.toString());
      return ethers.utils.formatUnits(temp, "9")?.toString()
    } catch (err) {
      console.log(err)
    }

  };

  const getPairBalance = async (addr) => {
    try {
      const balance = await ERC20Contract(pairAddr).balanceOf(addr);
      const temp = BigNumber.from(balance).toString()
      //  console.log("ahhh",ethers.utils.formatEther(temp).toString());   
      setPairBalance(ethers.utils.formatEther(temp)?.toString());
      return ethers.utils.formatEther(temp)?.toString()
    } catch (err) {
      console.log(err)
    }
  }

  const getmyUSDPrice = async () => {
    const _amount = ethers.utils.parseEther("1");
    const path = [myusdAddr, usdcAddr];
    const res3 = await getRouterContract().getAmountsOut(_amount, path);
    console.log("ASMAR", res3[1].toString());
    setMyUsdPrice(ethers.utils.formatUnits(res3[1].toString(), "18"))
    return ethers.utils.formatUnits(res3[1].toString(), "18")
  }

  const getBricksPrice = async () => {
    try {
      const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=mybricks&vs_currencies=usd';

      const response = await axios.get(apiUrl);
      const price = response?.data?.mybricks?.usd;
      // console.log(price)
      setBricksPrice(price)
      return price
      // console.log(price);
    } catch (error) {
      console.error(error);
    }
  };

  const getLPTokenPrice = async () => {
    const res = await getReferralContract().LPCalculation()
    const temp = 50 / (ethers.utils.formatEther((res?.toString())))
    setLPPrice(temp)
    return temp
  };



  useEffect(() => {
    checkWalletIsConnected();

    if (getReferralContract()) {
      chainId();
      getPrice();
      getLPTokens()
    }
  }, []);

  useEffect(() => {
    if (currentAccount) {
      getBricksBalance();
      checkForReward();
      encrypt();
      isWhiteListed();
      getBusdAllowance();
      getRefer();
      getRocksBalance(currentAccount);
      getMyUsdBalance(currentAccount);
      getPairBalance(currentAccount);
      getRocksPrice();
      getMyBricksBalance(currentAccount);
      getBricksPrice();
      getmyUSDPrice();
      getLPTokenPrice();
    }
  }, [currentAccount, quantity, allowance]);

  return (
    <ReferralContext.Provider
      value={{
        changeNetwork,
        currentAccount,
        loading,
        buyRock,
        buyMyusd,
        whiteListed,
        chain,
        setQuantity,
        quantity,
        hashValue,
        refer,
        swapBricksTokens,
        checkAmount,
        checkAmount2,
        checkAmount3,
        checkAmount4,
        getBalance,
        getBalance2,
        getBalance3,
        getBalance4,
        swapMyUSDTokens,
        swapUSDCTokens,
        swapUSDCToMyUSDTokens,
        myUsdBalance,
        pairBalance,
        rocksBalance,
        myBricksBalance,
        rocksPrice,
        bricksPrice,
        myUsdPrice,
        lPPrice,
        sendMetaMaskAddress,
        getRocksBalance,
        getMyUsdBalance,
        getPairBalance,
        getRocksPrice,
        getMyBricksBalance,
        getBricksPrice,
        getmyUSDPrice,
        getLPTokenPrice
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
};
