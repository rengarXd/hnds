/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
;! function(window) {
	window.serverUrl = "http://218.28.41.134:8080/etax/fileAction.do?pagetype=grid&nousercheck=1&eventcode=";
	window.ImgWebUrl = 'http://218.28.41.134:8080/etax/fileAction.do';
	window.selectUrl = "&funid=app_remote";
	var isAndroid = (/android/gi).test(navigator.appVersion);
	var uzStorage = function() {
		var ls = window.localStorage;
		if (isAndroid) {
			ls = os.localStorage();
		}
		return ls;
	};
	var u = {
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
		nodata : function(callback, url, method, data, htmlId) {
			var that = this;
			var o = {};
			o.url = window.serverUrl + url;
			o.method = method ? method : "get";
			that.isString(htmlId) ? htmlId : console.warn('htmlId格式错误');
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
								callback(rets);
							} else {
								api.refreshHeaderLoadDone();
								//								console.log("无数据");
								var html = '<div class="H-position-absolute H-position-center-all"><div class="H-font-size-14 H-text-align-center"><i class="iconfont icon-jindu H-font-size-32 H-theme-font-color-999"></i><div class="H-theme-font-color-999">连接失败，请检查网络配置</div><button class="H-margin-vertical-top-10 H-position-static H-outline-none H-theme-font-color-999 H-theme-border-color-transparent H-border-radius-3 H-theme-font-color1-click" style="min-width:90px;background-color:active:#787373" tapmode onclick="location.reload();">重&nbsp;&nbsp;试</button></div></div>';
								//$('#progress_data_body').html(html);
								document.getElementById(htmlId).innerHTML = html;
							}
						}
					} else {
						if ( typeof callback == 'function') {
							if (ret) {
								callback(ret);
							} else {
								api.refreshHeaderLoadDone();
								//								console.log("无数据");
								var html = '<div class="H-position-absolute H-position-center-all"><div class="H-font-size-14 H-text-align-center"><i class="iconfont icon-jindu H-font-size-32 H-theme-font-color-999"></i><div class="H-theme-font-color-999">连接失败，请检查网络配置</div><button class="H-margin-vertical-top-10 H-position-static H-outline-none H-theme-font-color-999 H-theme-border-color-transparent H-border-radius-3 H-theme-font-color1-click" style="min-width:90px;background-color:active:#787373" tapmode onclick="location.reload();">重&nbsp;&nbsp;试</button></div></div>';
								//$('#progress_data_body').html(html);
								document.getElementById(htmlId).innerHTML = html;
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
		},
		isTargetType : function(obj, typeString) {
			return typeof obj === typeString;
		},
		isObject : function(obj) {
			var that = this;
			return (that.isTargetType(obj, "object") && obj != null && obj != undefined);
		},
		isElement : function(obj) {
			return !!(obj && obj.nodeType == 1);
		},
		isString : function(obj) {
			var that = this;
			return that.isTargetType(obj, "string") && obj != null && obj != undefined;
		},
		cloneObj : function(oldObj) {
			var that = this;

			if (that.isObject(oldObj) == false) {
				return oldObj;
			}
			var newObj = new Object();
			for (var i in oldObj) {
				newObj[i] = that.cloneObj(oldObj[i]);
			}
			return newObj;
		},
		extendObj : function() {
			var that = this;

			var args = arguments;
			if (args.length < 2) {
				return;
			}
			var temp = that.cloneObj(args[0]);
			//调用复制对象方法
			for (var n = 1; n < args.length; n++) {
				for (var i in args[n]) {
					temp[i] = args[n][i];
				}
			}
			return temp;
		},
		offset : function(el) {
			if (!u.isElement(el)) {
				console.warn('$api.offset Function need el param, el param must be DOM Element');
				return;
			}
			var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

			var rect = el.getBoundingClientRect();
			return {
				l : rect.left + sl,
				t : rect.top + st,
				w : el.offsetWidth,
				h : el.offsetHeight
			};
		},
		fixIos7Bar : function(el) {
			if (!u.isElement(el)) {
				console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
				return;
			}
			var strDM = api.systemType;
			if (strDM == 'ios') {
				var strSV = api.systemVersion;
				var numSV = parseInt(strSV, 10);
				var fullScreen = api.fullScreen;
				var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
				if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
					el.style.paddingTop = '20px';
				}
			}
		},
		fixStatusBar : function(callback, el) {
			if (!u.isElement(el)) {
				console.warn('$ds,Function need el param, el param must be DOM Element');
				return;
			}
			var sysType = api.systemType;
			if (sysType == 'ios') {
				u.fixIos7Bar(el);
			} else if (sysType == 'android') {
				var ver = api.systemVersion;
				ver = parseFloat(ver);
				if (ver >= 4.4) {
					el.style.paddingTop = '25px';
				}
			}
			var _offset = that.offset(element);
			if (that.isFunction(callback)) {
				callback(_offset);
			}
		},
		openFrame : function(frameName, frameUrl, framePageParam, options) {
			var that = this;
			var o = {};
			o.name = frameName;
			o.url = frameUrl;
			o.pageParam = that.isObject(framePageParam) ? framePageParam : {};
			options = options || {};
			var opt = that.extendObj(o, options);

			api.openFrame(opt);
		},
		openNewframeFix : function(frameName, frameUrl, pageParam) {
			var that = this;
			var framepageParam = that.isObject(pageParam) ? pageParam : {};
			that.fixStatusBar(function(offset) {
				var _options = {
					rect : {
						x : 0,
						y : offset.h,
						h : api.winHeight - offset.h,
						w : api.winWidth
					},
					bounces : false
				};
				H.openFrame(frameName, frameUrl, framepageParam, _options);
			}, "#header");
		},
		openFrameNavOrFoot : function(frameName, frameUrl, headerSelector, framePageParam, footerSelector, options) {
			var that = this;
			var footerOffset = that.offset(footerSelector);
			that.fixStatusBar(function(offset) {
				var _options = {
					rect : {
						x : 0,
						y : offset.h,
						h : that.winHeight - offset.h - footerOffset.h,
						w : that.winWidth
					}
				};

				options = options || {};
				var opt = that.extendObj(_options, options);
				that.openFrame(frameName, frameUrl, framePageParam, opt);

			}, headerSelector);
		},
		openFrameGroupNavOrFoot : function(callback, groupName, frames, index, headerSelector, footerSelector, options) {
			var that = this;
			var footerOffset = that.offset(footerSelector);
			that.fixStatusBar(function(offset) {
				options.rect = {
					x : 0,
					y : offset.h,
					h : that.winHeight - offset.h - footerOffset.h,
					w : that.winWidth
				};

				that.openFrameGroup(callback, groupName, frames, index, options);
			}, headerSelector);
		},
		openFrameGroup : function(callback, groupName, frames, index, options) {
			var that = this;
			var o = {};
			o.name = groupName;
			o.index = Math.abs(that.isNumber(index) ? Number(index) : 0);

			if (!that.isArray(frames)) {
				console.error("只接收frame对象数组");
			}
			if (frames.length == 0) {
				console.error("frame对象数组至少要有一个frame对象");
			}
			// 移除frame的rect
			var _frames = [];
			for (var i = 0; i < frames.length; i++) {
				var _frame = frames[i];
				var tempFrame = that.extendObj(that.DEFAULT_CONFIG.openFrame_CONFIG, _frame);
				delete tempFrame['rect'];
				_frames.push(tempFrame);
			}
			o.frames = _frames;

			options = options || {};
			var opt = that.extendObj(o, options);
			api.openFrameGroup(opt, function(ret, err) {
				if (that.isFunction(callback)) {
					callback(ret, err);
				}
			});
		}
	};
	/*end*/
	window['$ds'] = u;
}(window);

