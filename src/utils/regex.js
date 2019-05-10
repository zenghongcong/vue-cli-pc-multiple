//正则表达式
let regex = {
  isWeChat: /MicroMessenger/i.test(navigator.userAgent),
  isIOS: /ipad|iphone|iPod|Macintosh|mac os/i.test(navigator.userAgent),
  isAndroid: /Android/i.test(navigator.userAgent)
};

export default regex;
