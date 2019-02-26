import axios from "axios";

const developUrl = "http://192.168.99.100/api";
const prodUrl = "http://212.109.193.230:8081/api";

export default axios.create({
  baseURL: prodUrl
});
