/*
 * API JavaScript Library
 * Copyright (c) 2014 apicloud.com
 * 作者：徐达
 */
;! function(window) {
	window.serverUrl = "http://218.29.85.98:8080/wash/fileAction.do?pagetype=grid&nousercheck=1&eventcode=";
	window.ImgWebUrl = 'http://218.29.85.98:8080/wash/fileAction.do?';
	window.selectUrl = "&funid=app_remote";
	//	var isAndroid = (/android/gi).test(navigator.appVersion);
	//	var uzStorage = function() {
	//		var ls = window.localStorage;
	//		if (isAndroid) {
	//			ls = os.localStorage();
	//		}
	//		return ls;
	//	};
	var u = {
		DEFAULT_CONFIG : {
			openFrame_CONFIG : {
				bounces : true,
				bgColor : "rgba(0,0,0,0)",
				scrollToTop : true,
				vScrollBarEnabled : false,
				hScrollBarEnabled : false,
				scaleEnabled : false,
				rect : {
					x : 0,
					y : 0,
					w : 'auto',
					h : 'auto',
					marginLeft : 0,
					marginTop : 0,
					marginBottom : 0,
					marginRight : 0
				},
				//progress: {
				//    type: "page",
				//    color: "#45C01A"
				//},
				reload : false,
				allowEdit : false,
				softInputMode : 'auto'
			},
			openFrameGroup_CONFIG : {
				scrollEnabled : false,
				vScrollBarEnabled : false, //（可选项）是否显示垂直滚动条，布尔型，默认值：true
				hScrollBarEnabled : false,
				rect : {
					x : 0,
					y : 0,
					w : 'auto',
					h : 'auto',
					marginLeft : 0,
					marginTop : 0,
					marginBottom : 0,
					marginRight : 0
				},
				index : 0,
				preload : 1
			},
			closeWidget_CONFIG : {
				silent : true,
				animation : {
					type : 'flip',
					subType : 'from_bottom',
					duration : 500
				}
			},
			ajax_CONFIG : {
				cache : false,
				timeout : 6,
				dataType : "json",
				report : true,
				returnAll : false
			}
		},
		isArray : function(arr) {
			return (toString.apply(arr) === '[object Array]') || arr instanceof NodeList;
		},
		isFunction : function(obj) {
			var that = this;
			return that.isTargetType(obj, "function");
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
		isNumber : function(str) {
			return !isNaN(str);
		},
		isBoolean : function(obj) {
			var that = this;
			return that.isTargetType(obj, "boolean");
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
		offset : function(cssSelectorOrElement) {
			var that = this;
			var element = that.returnElement(cssSelectorOrElement);
			if (!that.isElement(element)) {
				return {
					l : 0,
					t : 0,
					w : 0,
					h : 0
				};
			} else {
				var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
				var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

				var rect = element.getBoundingClientRect();
				return {
					l : rect.left + sl,
					t : rect.top + st,
					w : element.offsetWidth,
					h : element.offsetHeight
				};
			}
		},
		Pajax : function(callback, url, method, data, options) {
			var that = this;
			var o = {};
			o.url = window.serverUrl + url;
			o.method = method ? method : "get";
			if (o.method == "post") {
				o.data = data;
			}
			options = options || {};
			var opt = that.extendObj(that.DEFAULT_CONFIG.ajax_CONFIG, o, options);
			if ( typeof callback == 'function') {
				api.ajax(opt, function(ret, err) {
					var systemType = api.systemType;
					if (systemType == "ios") {
						var rets = eval('(' + err.body + ')');
						callback(rets, err);
					} else {
						callback(ret.body, err);
					}
				});
			}
		},
		ajax : function(callback, url, method, data, options) {
			var that = this;
			var o = {};
			o.url = window.serverUrl + url;
			o.method = method ? method : "get";
			if (o.method == "post") {
				o.data = data;
			}
			options = options || {};
			var opt = that.extendObj(that.DEFAULT_CONFIG.ajax_CONFIG, o, options);
			if ( typeof callback == 'function') {
				api.ajax(opt, function(ret, err) {
					var systemType = api.systemType;
					if (systemType == "ios") {
						var rets = eval('(' + err.body + ')');
						callback(rets, err);
					} else {
						callback(ret, err);
					}
				});
			}
		},
		imgAjax : function(callback, method, data, options) {
			var that = this;
			var o = {};
			o.url = window.ImgWebUrl;
			o.method = method ? method : "get";
			if (o.method == "post") {
				o.data = data;
			}
			options = options || {};
			var opt = that.extendObj(that.DEFAULT_CONFIG.ajax_CONFIG, o, options);
			if ( typeof callback == 'function') {
				api.ajax(opt, function(ret, err) {
					var systemType = api.systemType;
					if (systemType == "ios") {
						var rets = eval('(' + err.body + ')');
						callback(rets, err);
					} else {
						callback(ret.body, err);
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
		userAjax : function(url) {
			api.getPrefs({
				key : 'userinfo'
			}, function(ret, err) {
				var user = eval('(' + ret.value + ')');
				api.ajax({
					url : window.serverUrl + url
				}, function(ret, err) {
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
			});
		},
		fixIos7Bar : function(cssSelectorOrElement) {
			var that = this;
			var element = that.returnElement(cssSelectorOrElement);
			if (!that.isElement(element)) {
				console.warn('没有找到DOM元素');
			}

			var strDM = api.systemType;
			if (strDM == 'ios') {
				var strSV = api.systemVersion;
				var numSV = parseInt(strSV, 10);
				var fullScreen = api.fullScreen;
				var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
				if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
					element.style.paddingTop = '20px';
				}
			}
		},
		fixStatusBar : function(callback, cssSelectorOrElement) {
			var that = this;
			var element = that.returnElement(cssSelectorOrElement);
			if (!that.isElement(element)) {
				console.error('没有找到DOM元素');
			}
			var sysType = api.systemType;
			if (sysType == 'ios') {
				that.fixIos7Bar(element);
			} else if (sysType == 'android') {
				var ver = api.systemVersion;
				ver = parseFloat(ver);
				if (ver >= 4.4) {
					element.style.paddingTop = '25px';
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
				that.openFrame(frameName, frameUrl, framepageParam, _options);
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
						h : api.winHeight - offset.h - footerOffset.h,
						w : api.winWidth
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
				options = options || {};
				options.rect = {
					x : 0,
					y : offset.h,
					h : api.winHeight - offset.h - footerOffset.h,
					w : api.winWidth
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
				//				var tempFrame = that.extendObj(that.DEFAULT_CONFIG.openFrame_CONFIG, _frame);
				delete _frame['rect'];
				_frames.push(_frame);
			}
			o.frames = _frames;

			options = options || {};

			var opt = that.extendObj(that.DEFAULT_CONFIG.openFrameGroup_CONFIG, o, options);

			api.openFrameGroup(opt, function(ret, err) {
				if (that.isFunction(callback)) {
					callback(ret, err);
				}
			});
		},
		userlogInfo : function(data) {
			api.setPrefs({
				key : 'userinfo',
				value : JSON.stringify(data)
			});
			api.execScript({
				name : 'main',
				frameName : 'me_index',
				script : 'reload();'
			});
			//			api.execScript({
			//				name : 'main',
			//				script : 'initInfo();'
			//			});
			//			api.sendEvent({
			//				name : 'userlogin'
			//			});
		},
		jsDateDiff : function(publishTime) {
			nowtime = (new Date).getTime();
			secondNum = parseInt((nowtime - publishTime * 1000) / 1000);
			if (secondNum >= 0 && secondNum < 60) {
				return secondNum + "秒前"
			} else {
				if (secondNum >= 60 && secondNum < 3600) {
					var nTime = parseInt(secondNum / 60);
					return nTime + "分钟前"
				} else {
					if (secondNum >= 3600 && secondNum < 3600 * 24) {
						var nTime = parseInt(secondNum / 3600);
						return nTime + "小时前"
					} else {
						var nTime = parseInt(secondNum / 86400);
						return nTime + "天前"
					}
				}
			}
		},
		toast : function(callback, msg, duration, location, global) {
			var that = this;
			if ((!that.isFunction(arguments[0])) && (arguments[0])) {
				msg = arguments[0];
			}

			msg = that.isObject(msg) ? (JSON.stringify(msg)) : msg;
			duration = Math.abs(that.isNumber(duration) ? Number(duration) : 2000);
			global = that.isBoolean(global) ? global : false;

			var locationArr = ["top", "middle", "bottom"];
			location = location ? location : "bottom";
			location = locationArr.indexOf(location) > -1 ? location : "bottom";
			api.toast({
				msg : msg,
				duration : duration,
				location : location,
				global : global
			});
			if (that.isFunction(callback)) {
				setTimeout(function() {
					callback();
				}, duration);
			}
		},
		closeWidget : function(wgtID, returnData, options) {
			var that = this;
			var o = {};
			if (wgtID) {
				o.id = wgtID;
			}
			if (that.isObject(returnData)) {
				o.retData = returnData;
			}

			options = options || {};
			var opt = that.extendObj(that.DEFAULT_CONFIG.closeWidget_CONFIG, o, options);
			api.closeWidget(opt);
		},
		// ######################### 自定义
		returnElement : function(cssSelectorOrElement) {
			var that = this;
			if (that.isElement(cssSelectorOrElement)) {
				return cssSelectorOrElement;
			} else {
				return that.D(cssSelectorOrElement);
			}
		},
		//querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
		D : function(cssSelectorOrElement, parentSelectorOrElement) {
			var that = this;
			parentSelectorOrElement = parentSelectorOrElement ? parentSelectorOrElement : document;
			parentSelectorOrElement = that.isString(parentSelectorOrElement) ? document.querySelector(parentSelectorOrElement) : parentSelectorOrElement;

			return parentSelectorOrElement.querySelector(cssSelectorOrElement);
		},
		//需要返回所有的元素，请使用 querySelectorAll() 方法替代。
		Ds : function(cssSelectorOrElement, parentSelectorOrElement) {
			var that = this;
			parentSelectorOrElement = parentSelectorOrElement ? parentSelectorOrElement : document;
			parentSelectorOrElement = that.isString(parentSelectorOrElement) ? document.querySelector(parentSelectorOrElement) : parentSelectorOrElement;

			return parentSelectorOrElement.querySelectorAll(cssSelectorOrElement);
		},
		//###################设备自有
		keyback : function(callback) {
			api.addEventListener({
				name : 'keyback'
			}, function(ret, err) {
				callback(ret, err);
			});
		},
		dblclickToCloseApp : function() {
			var that = this;

			var mkeyTime = new Date().getTime();
			that.keyback(function(ret, err) {
				if ((new Date().getTime() - mkeyTime) > 2000) {
					mkeyTime = new Date().getTime();
					//					var appname = api.appName;
					//					api.toast({
					//						msg : '再按一次退出' + api.appName
					//					});
					//that.toast(null, '再按一次退出' + api.appName, 2000);
					api.toast({
						msg : '再按一次返回键退出' + api.appName,
						duration : 2000,
						location : 'bottom'
					});
				} else {
					setTimeout(function() {
						that.closeWidget(api.appId, {
							name : 'closeWidget'
						});
					}, 300);
				}
			});
		},
		// 动态载入js，css，filetype类型就是js,css
		loadJsOrCssFile : function(filename, filetype) {
			if (filetype == "js") {
				var fileref = document.createElement('script');
				fileref.setAttribute("type", "text/javascript");
				fileref.setAttribute("src", filename);
			} else if (filetype == "css") {

				var fileref = document.createElement('link');
				fileref.setAttribute("rel", "stylesheet");
				fileref.setAttribute("type", "text/css");
				fileref.setAttribute("href", filename);
			}
			if ( typeof fileref != "undefined") {
				document.getElementsByTagName("head")[0].appendChild(fileref);
			}
		},
		// 异步载入Html
		loadHtml : function(filename, callback) {
			var that = this;
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					if (that.isFunction(callback)) {
						callback(xmlHttp.responseText);
					}
				}
			};
			xmlHttp.open("get", filename, true);
			xmlHttp.send(null);
		}
	};
	/*end*/
	window['$xy'] = u;
}(window);

