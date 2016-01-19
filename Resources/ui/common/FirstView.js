/**
 * @author Ade Mahendra
 */

	var screenwidth = Ti.Platform.displayCaps.platformWidth;
    var screenheight = Ti.Platform.displayCaps.platformHeight;
	BizDir.latitude = '-8.691039'; //e.coords.longitude;
    BizDir.longitude = '115.162806'; //e.coords.latitude;
	//gps start to get current location
	Titanium.Geolocation.purpose = "GPS user coordinates";
	Titanium.Geolocation.distanceFilter = 10; // set the granularity of the location event
 
	Titanium.Geolocation.getCurrentPosition(function(e)
	{
		if (e.error)
		{
                // manage the error
                return;
		}
 
		BizDir.longitude = e.coords.longitude;
		BizDir.latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;
 
                // we use the above data the way we need it
	});
 
	Titanium.Geolocation.addEventListener('location',function(e)
	{
		if (e.error)
		{
                // manage the error
		return;
		}
 
		BizDir.longitude = e.coords.longitude;
		BizDir.latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;
	});	
	
    if(!BizDir.isAndroid()){
	    Titanium.Geolocation.purpose = "For GPS Application";
	    Titanium.Geolocation.distanceFilter = 10;
	    Titanium.Geolocation.PROVIDER_GPS;
	    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    }

    var authoGeo = true;
    
    if (Titanium.Geolocation.locationServicesEnabled === false) {
        Titanium.UI.createAlertDialog({
            title: 'Enjoy Malang',
            message: 'Your device has GPS turned off - turn it on.'
        }).show();
        authoGeo = false;
    } else {
        if (Titanium.Platform.name !== 'android') {
            var authorization = Titanium.Geolocation.locationServicesAuthorization;

            if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
                Ti.UI.createAlertDialog({
                    title: 'Enjoy Malang',
                    message: 'You have disallowed Enjoy Malang from running geolocation services.'
                }).show();
                authoGeo = false;
            } else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
                Ti.UI.createAlertDialog({
                    title: 'Enjoy Malang',
                    message: 'Your system has disallowed Enjoy Malang from running geolocation services.'
                }).show();
                authoGeo = false;
            }
        }
    }	
    
// if (BizDir.isAndroid()) {
	// var MapModule = require('ti.map');
// }    
//       


(function(){
	// ALPHABYTES
	
	// Facebook like menu window
	var leftMenu	= Ti.UI.createWindow({
		backgroundColor: 'red',
		top:   0,
		left:  0,
		width: 150,
		zIndex: 1
	});
	var data = [{title:"Row 1"},{title:"Row 2"},{title:"Row 3"},{title:"Row 4"}];
	var tableView	= Ti.UI.createTableView({ data: data });
	leftMenu.add(tableView);
	leftMenu.open();
	
	// Facebook like menu window
	var rightMenu	= Ti.UI.createWindow({
		backgroundColor: 'red',
		top:   0,
		right:  0,
		width: 150,
		zIndex: 1
	});
	var data = [{title:"Row 1"},{title:"Row 2"},{title:"Row 3"},{title:"Row 4"}];
	var tableView	= Ti.UI.createTableView({ data: data });
	rightMenu.add(tableView);
	rightMenu.open();
	
	// animations
	var animateLeft	= Ti.UI.createAnimation({
		left: 150,
		curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
		duration: 500
	});
	var animateRight	= Ti.UI.createAnimation({
		left: 0,
		curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
		duration: 500
	});
	var animateNegativeLeft = Ti.UI.createAnimation({
					left: -150,
					curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
					duration: 500
	});
	
	
	var win = Titanium.UI.createWindow({
		left: 0,
		zIndex: 10
	});
	var win1 = Titanium.UI.createWindow({
	    backgroundColor: 'white',
	    title: 'Facebook menu',
	    left: 0,
		zIndex: 10
	});
	var nav = Titanium.UI.iOS.createNavigationWindow({
	   window: win1,
	   left: 0,
	   width: Ti.Platform.displayCaps.platformWidth
	});
	var button = Ti.UI.createButton({
		title: '<',
		left: 10,
		width: 30,
		height: 30,
		top: 10
	});
	var button2 = Ti.UI.createButton({
		title: '...',
		right: 10,
		width: 30,
		height: 30,
		top: 10
	});
	var touchStartX = 0;
	var touchStarted = false;
	win1.addEventListener('touchstart',function(e){
		touchStartX = parseInt(e.x,10);
	});
	win1.addEventListener('touchend',function(e){
		touchStarted = false;
		if( win.left < 0 ){
			if( win.left <= -140 ){
				win.animate(animateNegativeLeft);
				isToggled = true;
			} else {
				win.animate(animateRight);
				isToggled = false;
			}
		} else {
			if( win.left >= 140 ){
				win.animate(animateLeft);
				isToggled = true;
			} else {
				win.animate(animateRight);
				isToggled = false;
			}
		}
	});
	win1.addEventListener('touchmove',function(e){
		var x 		= e.x;//parseInt(e.x, 10);
		var newLeft = x - touchStartX;
		if( touchStarted ){
			if( newLeft <= 150 && newLeft >= -150)
			win.left	= newLeft;
		}
		// Minimum movement is 30
		if( newLeft > 30 || newLeft < -30 ){
			touchStarted = true;
		}
	});
	nav.add(button);
	nav.add(button2);
	win.add(nav);
	win.open();
	
	
	var isToggled = false;
	button.addEventListener('click',function(e){
		if( !isToggled ){
			win.animate(animateLeft);
			isToggled = true;
		} else {
			win.animate(animateRight);
			isToggled = false;
		}
	});
	
	button2.addEventListener('click',function(e){
		if( !isToggled ){
			win.animate(animateNegativeLeft);
			isToggled = true;
		} else {
			win.animate(animateRight);
			isToggled = false;
		}
	});	

	//pop up
	var winPopupBG = Ti.UI.createWindow({
		width:screenwidth,
		height:screenheight,
		backgroundColor:'transparent',
		backgroundImage:'/images/bgblack.png',
		fullscreen:true
		// modal:true
	});
	
	if(BizDir.isAndroid()){
		winPopupBG.modal = true;
	}
	
	var winPopup = Ti.UI.createView({
		width:screenwidth-50,
		height:screenheight-50,
		
		backgroundRepeat:true
	});
	
	if(BizDir.ui.device == 'ipad'){
		var imageAds = Ti.UI.createImageView({
			width:480,
			height:640,
		});
	} else {
		var imageAds = Ti.UI.createImageView({
			width:240,
			height:320,
		});
	}
	
	var closeButton = Ti.UI.createButton({
		// title:'X',
		width:32,
		height:32,
		top:10,
		right:10,
		backgroundImage:'/images/closebutton.png'
	});
	
	winPopupBG.add(winPopup);
	winPopup.add(imageAds);
	winPopupBG.add(closeButton);
	
	var getAds = function(idcat){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://api.enjoymalang.com/v1/getAds';
		Ti.API.info('URL : '+apiurl);
		var params = {
			'lang' : 'EN',
			'idcat':idcat,
		};
		xhr.open('POST', apiurl);
		xhr.send(params);
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			var json = JSON.parse(this.responseText);
			
			if(json.length > 0){
				imageAds.image = 'http://www.enjoymalang.com/uploads/malangpromotion/'+json[0].adsimages;
				
				imageAds.removeEventListener('click', function(){
					
				});
				
				imageAds.addEventListener('click', function(){
					Ti.Platform.openURL(json[0].url);
				});
				winPopupBG.open();
			}
		};
		
		xhr.onerror = function(e){
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	};
	
	Ti.App.Properties.setString('promo','false');
	
	var getAdsMultiTouch = function(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://api.enjoymalang.com/v1/getAdsMultiTouch';
		Ti.API.info('URL : '+apiurl);
		var params = {
			'lang' : 'EN'
		};
		xhr.open('POST', apiurl);
		xhr.send(params);
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			var json = JSON.parse(this.responseText);
			
			if(json.length > 0){
				imageAds.image = 'http://www.enjoymalang.com/uploads/malangpromotion/'+json[0].adsimages;
				
				imageAds.removeEventListener('click', function(){
					
				});
				
				imageAds.addEventListener('click', function(){
					Ti.App.Properties.setString('promo','true');
					Ti.Platform.openURL(json[0].url);
				});
				winPopupBG.open();
			}
		};
		
		xhr.onerror = function(e){
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	};
	
	var promo = Ti.App.Properties.getString('promo');
	if(promo === 'false'){
		getAdsMultiTouch();
	}
	
	var getAdsGeneral = function(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://api.enjoymalang.com/v1/getAdsGeneral';
		Ti.API.info('URL : '+apiurl);
		var params = {
			'lang' : 'EN'
		};
		xhr.open('POST', apiurl);
		xhr.send(params);
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			var json = JSON.parse(this.responseText);
			
			if(json.length > 0){
				imageAds.image = 'http://www.enjoymalang.com/uploads/ppimage/'+json[0].adsimages;
				
				imageAds.removeEventListener('click', function(){
					
				});
				
				imageAds.addEventListener('click', function(){
					BizDir.openBrowser(json[0].url);
				});
				winPopupBG.open();
			}
		};
		
		xhr.onerror = function(e){
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	};	
	
	getAdsGeneral();
	
	BizDir.showAds = function(catid){
		getAds(catid);
	};
	
	
	closeButton.addEventListener('click', function(){
		winPopupBG.close();	
	});

	//end pop up
	
	//inapp browser
	//pop up
	var winInAppBrowser = Ti.UI.createWindow({
		width:screenwidth,
		height:screenheight,
		backgroundColor:'transparent',
		backgroundImage:'/images/bgblack.png',
		fullscreen:true,
		modal:true,
		navBarHidden:true,
		tabBarHidden:true
	});
	
	var closeButtonInAppBrowser = Ti.UI.createButton({
		// title:'X',
		width:32,
		height:32,
		top:15,
		right:15,
		backgroundImage:'/images/closebutton.png'
	});
	
	closeButtonInAppBrowser.addEventListener('click', function(){
		winInAppBrowser.close();
	});
	
	if(BizDir.isAndroid()){
		winInAppBrowser.modal = true;
	}
	
	var webview = Titanium.UI.createWebView();
	winInAppBrowser.add(webview);
	winInAppBrowser.add(closeButtonInAppBrowser);
	
	BizDir.openBrowser = function(url){
		Ti.API.info('Masuk '+url);
		webview.url = url;
		winInAppBrowser.open();
	};
	//end of inapp browser
	Ti.API.info(BizDir.ui.device);

})();