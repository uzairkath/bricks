import axios from "axios";
import Cookie from "js-cookie";

const createBackendServer = (baseURL) => {
  const api = axios.create({
    baseURL: `${baseURL}`,
    headers: { Accept: "application/json" },
    timeout: 60 * 1000,
  });

  api.interceptors.request.use((config) => {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);
    const token = userData?.token?.access?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  });

  const sendOTP = (body) => api.post("/client/auth/send_login_otp", body);
  const LoginOTP = (body) => api.post("/client/auth/login_with_otp", body);
  const getReferralData = () => api.get("/client/api/v1/user/referral_data");
  const getBNBTransaction = (body) => api.get(`/client/api/v1/trans/buy_bnb?email=${body?.email}&walletAddress=${body?.walletAddress}`)
  const getNoOfRefree = () => api.get("/client/api/v1/user/get_no_of_refree/");
  const allRefrees = () => api.get("/client/api/v1/user/all_refrees/");
  const sendInvite = (body) => api.post("/client/api/v1/user/send_invitation_code/", body);
  const getDecryptedAddress = () => api.get("/client/api/v1/user/get_decrypted_address/");
  const setReferralData = (body) => api.post("/client/api/v1/user/set_referral_data", body);
  const authenticateUser = (body) => api.post("/client/auth/authenticate", body);
  const rockSold = (body) => api.post("/client/api/v1/user/rocks_sold/", body);
  const getRockSold = () => api.get("/client/api/v1/user/get_rocks_sold/");
  const getLPsEarned = () => api.get("/client/api/v1/user/no_Of_LPs_Earned/");
  const updatePortfolio = (body) => api.post("/client/api/v1/trans/update_portfolio", body);
  const getPortfolioValues = (body) => api.get(`/client/api/v1/trans/get_portfolio_values?walletAddress=${body.walletAddress}&duration=${body.duration}`, body);

  return {
    sendOTP,
    LoginOTP,
    getReferralData,
    authenticateUser,
    setReferralData,
    getDecryptedAddress,
    getBNBTransaction,
    sendInvite,
    getNoOfRefree,
    allRefrees,
    rockSold,
    getRockSold,
    getLPsEarned,
    updatePortfolio,
    getPortfolioValues
  };
};

const SERVER_URL = import.meta.env["VITE_SERVER_URL"];
const apis = createBackendServer(SERVER_URL);

export default apis;
