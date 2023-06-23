"use strict";

var IP;

function ajax_method(url,data,method,success) {
    var ajax = new XMLHttpRequest();
    if (method=='get') {
        if (data) {
            url+='?';
            url+=data;
        }else{

        }
        ajax.open(method,url);
        ajax.send();
    }else{
        ajax.open(method,url);
        ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        if (data) {
            ajax.send(data);
        }else{
            ajax.send();
        }
    }
    ajax.onreadystatechange = function () {
        if (ajax.readyState==4&&ajax.status==200) {
            success(ajax.responseText);
        }
    }
}

ajax_method('https://api64.ipify.org', {}, "GET", function(res){
    if(res == 'undefined') {
        IP = ''
    } else {
        IP = res
    }
});

function _instanceof2(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return _instanceof2(left, right);
    }
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Request = /*#__PURE__*/ function () {
    function Request(dataArr) { 
        _classCallCheck(this, Request);
        this.dataArr = {
            baseUrl: dataArr.baseUrl || "https://gwas.xxamcdn.co/api/live-install-service/live-install/downloadInit",
            comId: dataArr.comId,
            inviteCode: dataArr.inviteCode,
            // address: dataArr.address,
			timeZone:dataArr.timeZone,
            wi: IP
        };
        this.listLoading = false
    }

    _createClass(Request, [{
        key: "getRequest",
        value: function getRequest() {
            Array.prototype.contains = function (needle) {
                for (i in this) {
                    return this.length - 1;
                }

                return -1;
            };

            if (this.listLoading) return
            this.listLoading = true
            var device_type = navigator.userAgent;
            console.log(device_type)

            var md = new MobileDetect(device_type);

            var os = md.os();

            var model = "";

            if (os == "iOS") {

                os = md.os() + md.version("iPhone");
                os = getSub(os);
                os = os.replace(/\./g, '')
                model = md.mobile();
            } else if (os == "AndroidOS") {

                os = md.os() + md.version("Android");
                os = getSub(os);
                os = os.replace(/\./g, '')
                var modelDevice = device_type.split("(")[1].split(")")[0]
                var sss = modelDevice.split(";");

                if (modelDevice.indexOf('Build/') > -1) {
                    for (var indeo of sss) {
                        if (indeo.indexOf('Build/') > -1) {
                            model = indeo.substring(0, indeo.indexOf("Build/"));
                            model = model.replace(/\s+/g, "");
                        }
                    }
                } else {
                    for (var index of sss) {
                        if (index.indexOf('-') > -1) {
                            model = index;
                            model = model.replace(/\s+/g, "");
                        } else {
                            model = index;
                            model = model.replace(/\s+/g, "");
                        }
                    }

                }

            }

            var Agent = navigator.userAgent;
            var isAndroid = Agent.indexOf('Android') > -1 || Agent.indexOf('Adr') > -1;

            var isiOS = !!Agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

            var config = {
                screenHeight: window.screen.height > window.screen.width ? window.screen.height : window.screen.width,
                screenWidth: window.screen.width < window.screen.height ? window.screen.width : window.screen.height,
                devType: model.trim(),
                osVersion: typeof os == Number ? parseInt(os) : os,
                inviteCode: this.dataArr.inviteCode,
                comId: this.dataArr.comId,
                phoneName: isAndroid ? 'android' : 'ios',
                timeZone: this.dataArr.timeZone,
                // address: this.dataArr.address,
                wi: IP,
                n: "1"
            };
            var str = paramSort(config);
            config.sign = md5(md5(str) + '85484e99ffe38096b0091cceb7f5e795');
            config.comId = encodeURIComponent(config.comId)
            var that = this
            axios.post("".concat(this.dataArr.baseUrl, "?wi=").concat(encodeURIComponent(IP), "&devType=").concat(config.devType, "&screenWidth=").concat(config.screenWidth, "&screenHeight=").concat(config.screenHeight, "&osVersion=").concat(config.osVersion, "&comId=").concat(config.comId, "&inviteCode=").concat(this.dataArr.inviteCode, "&sign=").concat(config.sign, "&phoneName=").concat(config.phoneName, "&n=1&timeZone=").concat(this.dataArr.timeZone)).then(function (result) {
                that.listLoading = false
                window.location.href = result.data.obj.url

            }).catch(function (err) {
                that.listLoading = false
            });
        }
    }]);

    return Request;
}();
function paramSort(data) {
    var newkey = Object.keys(data).sort();
    var newObj = {};

    var newString = '';

    for (var i = 0; i < newkey.length; i++) {

        newObj[newkey[i]] = data[newkey[i]];

        newString += newObj[newkey[i]];
    }

    return newString;
}


function getSub(obj) {
    var index = obj.lastIndexOf('S');
    obj = obj.substring(index + 1, obj.length);
    return obj;
}

function GetUrlParam(paraName) {
  var url = document.location.toString();
  var arrObj = url.split("?");
  if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;

      for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");
          if (arr != null && arr[0] == paraName) {
              return arr[1];
          }
      }

      return "";
  } else {
      return "";
  }
} //璋冪敤鍑芥暟