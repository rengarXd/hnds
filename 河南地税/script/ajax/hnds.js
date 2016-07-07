/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
;! function() {
	window.serverUrl = "http://218.29.85.98:8080/etax/fileAction.do?pagetype=grid&nousercheck=1&eventcode=";
	window.ImgWebUrl = 'http://218.29.85.98:8080/etax/fileAction.do';
	window.selectUrl = "&funid=app_remote";
	var isAndroid = (/android/gi).test(navigator.appVersion);
	var uzStorage = function() {
		var ls = window.localStorage;
		if (isAndroid) {
			ls = os.localStorage();
		}
		return ls;
	};
	window['$ds'] = {
		DEFAULT_CONFIG : {
			parseArguments : function(url, data, fnSuc, dataType) {
				if ( typeof (data) == 'function') {
					dataType = fnSuc;
					fnSuc = data;
					data = undefined;
				}
				if ( typeof (fnSuc) != 'function') {
					dataType = fnSuc;
					fnSuc = undefined;
				}
				return {
					url : url,
					data : data,
					fnSuc : fnSuc,
					dataType : dataType
				};
			},
		},
		ajax : function(callback, url, method, data) {
			var o = {};
			o.url = window.serverUrl + url;
			o.method = method ? method : "get";
			if (o.method == "post") {
				o.data = data;
			}
			if ( typeof callback == 'function') {
				api.ajax(o, function(ret, err) {
					var systemType = api.systemType;
					if (systemType == "ios") {
						var rets = eval('(' + err.body + ')');
						if ( typeof callback == 'function') {
							if (rets) {
								if (rets.success) {
									callback(rets);
								} else {
									api.toast({
										msg : rets.message
									});
								}
							} else {
								api.toast({
									msg : '连接错误，请检查网络配置'
								});
							}

						}
					} else {
						if ( typeof callback == 'function') {
							if (ret) {
								if (ret.success) {
									callback(ret);
								} else {
									api.toast({
										msg : ret.message
									});
								}
							} else {
								api.toast({
									msg : '连接错误，请检查网络配置'
								});
							}
						}
					}
				});
			}
		},
		openTimePick : function(callback) {
                var that = this;
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                api.openPicker({
                    type : 'date',
                    date : "'" + currentdate + "'"
                }, function(ret, err) {
                    if (ret) {
                        if (that.isFunction(callback)) {
                            callback(ret);
                        }
                    } else {
                        api.toast({
                            msg : '选择时间错误'
                        });
                    }
                });
            },
		getUserPref : function(callback) {
			api.getPrefs({
				key : 'userinfo'
			}, function(ret, err) {
				userinfo = eval('(' + ret.value + ')');
				if ( typeof callback == 'function') {
					callback();
				}
			});
		}
	};
	/*end*/
	//	window.$ds = u;
}();

