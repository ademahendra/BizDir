var BizDir = {
	android: {
		menu: {}	
	},
	datetime: {},
    ui: {},
    __isLargeScreen: undefined,
    __isAndroid: undefined,
    navGroup: undefined,
    navGroupCat: undefined,
    navGroupNews: undefined,
    navGroupCalendar: undefined,
    navGroupFave: undefined,
    navGroupSearch: undefined,
    navGroupForum: undefined,
    navGroupProfile: undefined,
    navGroupPromotion: undefined,
    navGroupAbout: undefined,
    navGroupFaq: undefined,
    calendarGroup : undefined,
    calendarTab1 : undefined,
    calendarTab2 : undefined,
    calendarTab3 : undefined,
    peluangGroup : undefined,
    peluangTab1 : undefined,
    peluangTab2 : undefined,
    peluangTab3 : undefined,
    peluangTab4 : undefined
};

function getDistance(latitudeFrom, longitudeFrom, latitudeTo, longitudeTo)
{
	//= 6371000
	var earthRadius = 6371000;
	
  // convert from degrees to radians
	var latFrom = deg2rad(latitudeFrom);
	var lonFrom = deg2rad(longitudeFrom);
	var latTo = deg2rad(latitudeTo);
	var lonTo = deg2rad(longitudeTo);

	var lonDelta = lonTo - lonFrom;
	var a = Math.pow(Math.cos(latTo) * Math.sin(lonDelta), 2) + Math.pow(Math.cos(latFrom) * Math.sin(latTo) - Math.sin(latFrom) * Math.cos(latTo) * Math.cos(lonDelta), 2);
	var b = Math.sin(latFrom) * Math.sin(latTo) + Math.cos(latFrom) * Math.cos(latTo) * Math.cos(lonDelta);

	var angle = Math.atan2(Math.sqrt(a), b);
	return angle * earthRadius;
}
		       
    function deg2rad (angle) {
    		return (angle / 180) * Math.PI;
    	}
    	
(function() {
	BizDir.extend = function(obj) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    for (var i = 0; i < args.length; i++) {
	    	var source = args[i];
	      	for (var prop in source) {
	        	if (source[prop] !== void 0) obj[prop] = source[prop];
	      	}
	    }
	    return obj;
	};
	
	BizDir.isLargeScreen = function() {
		if (BizDir.__isLargeScreen === undefined) {
			BizDir.__isLargeScreen = (Ti.Platform.displayCaps.platformWidth >= 600);
		}
		return BizDir.__isLargeScreen;
	};
	
	BizDir.isAndroid = function() {
		if (BizDir.__isAndroid === undefined) {
			BizDir.__isAndroid = (Ti.Platform.osname == 'android');
		}
		return BizDir.__isAndroid;
	};
	
	BizDir.isOS7 = function()
	{
		// iOS-specific test
		if (Titanium.Platform.name == 'iPhone OS')
		{
			var version = Titanium.Platform.version.split(".");
			var major = parseInt(version[0],10);
			Ti.API.info('Major : '+major);
			// Can only test this support on a 3.2+ device
			if (major >= 7)
			{
				return true;
			}
		}
		return false;
	};
	
	BizDir.cleanSpecialChars = function(str) {
  		if (str == null) {
    		return '';
  		}
  		if (typeof str === 'string') {
    		return  str
      			.replace(/&quot;/g,'"')
      			.replace(/\&amp\;/g,"&")
      			.replace(/&lt;/g,"<")
      			.replace(/&gt;/g,">")
      			.replace(/&#039;/g, "'");
  		}
  		return '';
	};
	
	BizDir.android.menu = {
		data: [],
		init: function(params) {
			var activity = params.win.activity; 
	        activity.onCreateOptionsMenu = function (e) {
	          	var optionsmenu = e.menu;
	          	for (k = 0; k < params.buttons.length; k++) {
	            	BizDir.android.menu.data[k] = optionsmenu.add({
	              		title: params.buttons[k].title
	            	});
	            	BizDir.android.menu.data[k].addEventListener("click", params.buttons[k].clickevent);
	          	}
	        };
		}
	};
	
	BizDir.decodeLine = function (encoded) {
	    var len = encoded.length;
	    var index = 0;
	    var array = [];
	    var lat = 0;
	    var lng = 0;
	 
	    while (index < len) {
	        var b;
	        var shift = 0;
	        var result = 0;
	        do {
	            b = encoded.charCodeAt(index++) - 63;
	            result |= (b & 0x1f) << shift;
	            shift += 5;
	        } while (b >= 0x20);
	        var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
	        lat += dlat;
	 
	        shift = 0;
	        result = 0;
	        do {
	            b = encoded.charCodeAt(index++) - 63;
	            result |= (b & 0x1f) << shift;
	            shift += 5;
	        } while (b >= 0x20);
	        var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
	        lng += dlng;
	 
	        array.push({longitude:lng * 1e-5, latitude:lat * 1e-5});
	    };
	 
	    return array;
	};
	
	
	BizDir.sanitize = function(txt) {
	    
	    return txt.replace('#<a.*?>(.*?)</a>#i', '');
	};	
})();