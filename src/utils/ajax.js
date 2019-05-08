import axios from "axios";
import store from "@/store";
import Qs from "qs";
import md5 from "md5";

let axiosConfig = axios.create({
  baseURL: process.globalConfig.baseUrl,
  timeout: 16000, //请求超时设置
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

//异步拦截器request配置
axiosConfig.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//异步拦截器response配置
axiosConfig.interceptors.response.use(
  response => {
    if (response.data.code != "0000") {
      return Promise.reject(response.data);
    }
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);
let ajax = function(config) {
  let loading = config.loading !== undefined ? config.loading : true; //loading监听
  config.method = config.type;

  if (!config.data) config.data = {};

  //签名
  config.data.sign && delete config.data.sign;
  config.data.sign = getSign(config.data);

  if (config.type && config.type == "get") {
    config.params = config.data;
    delete config.data;
  }

  if (config.type && config.type == "post") {
    config.data = Qs.stringify(config.data);
  }

  delete config.type;
  delete config.loading;
  let ajax = axiosConfig(config);
  if (loading) {
    store.commit("updateLoading", true);
    store.dispatch("globalLoading", ajax);
  }
  return ajax;
};

function getSign(param) {
  var signArr = [];
  for (var k in param) {
    signArr.push({
      key: k,
      val: param[k]
    });
  }
  var str = "",
    key = "21b35fa480505dbae4a50668182e6008";
  signArr && signArr.sort(compare("key"));
  signArr.forEach(function(item) {
    str += item.key + "=" + item.val + "&";
  });
  str += "secret=" + key;
  return md5(str);
}

//对象数组排序函数
function compare(pro) {
  return function(a, b) {
    if (
      a &&
      b &&
      (typeof a).toLowerCase() === "object" &&
      (typeof b).toLowerCase() === "object"
    ) {
      var param1 = a[pro],
        param2 = b[pro];
      if (param1 === param2) {
        return 0;
      }
      if (typeof param1 === typeof param2) {
        return param1 < param2 ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    } else {
      throw "error";
    }
  };
}

export default {
  methods: {
    ajax
  }
};
