Ti.include(	
	'/ui/common/search/searchWindow.js'
);

BizDir.ui.createHomeWindow = function () {
	// var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 1;

	var latitude = '-8.691039'; //e.coords.longitude;
    var longitude = '115.162806'; //e.coords.latitude;
	
	if(BizDir.isOS7()){
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'Home',
			backgroundColor: '#f1f1f1',
	        barColor: '#2892ff',
	        tintColor:"#2892ff",
	        navTintColor:'#fff',
	        navBarHidden:true,
	        backgroundImage:BizDir.bgImage
		});	
	} else {
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'Home',
			backgroundColor: '#f1f1f1',
	        barColor: '#05bee0',
	        barImage:'images/template/bg.png',
	        navBarHidden:true,
	        backgroundImage:BizDir.bgImage,
		});
	};
	
	if (BizDir.ui.device !== 'ipad') {
		var navIcon = Ti.UI.createButton({
			width:26,
			height:26,
			backgroundImage:'images/menu_navigation.png',
			top:20,
			left:10,
		});
		
		navIcon.addEventListener('click', function(){
			window.toggleLeftView();
		});
	}
	var logo = Ti.UI.createImageView({
		width:40,
		height:Ti.UI.SIZE,
		top:20,
		image:BizDir.provinceImage
	});
	
	//home content
	var iconArea = Ti.UI.createImageView({
		left:10,
		width:12,
		height:18,
		top:172,
		image:'images/marker.png'
	});
	
	var labelLocation = Ti.UI.createLabel({
		top:170,
		height:25,
		text:BizDir.locationArea,
		left:30,
		color:'#fff',
		width:Ti.UI.SIZE
	});
	
	var iconWeather = Ti.UI.createImageView({
		right:50,
		width:20,
		height:20,
		top:170,
		defaultImage:'images/marker.png'
	});
	
	var labelWeather = Ti.UI.createLabel({
		top:160,
		height:Ti.UI.SIZE,
		width:30,
		// text:BizDir.locationArea,
		right:10,
		color:'#fff',
		width:Ti.UI.SIZE,
		textAlign:'center'
	});
	
	var inputSearch = Ti.UI.createView({
		left:10,
		right:10,
		height:33,
		top:200,
		
		backgroundColor:'#fff',
		borderRadius:3
	});
	//end home content
	var labelWhat = Ti.UI.createLabel({
		text:'What do you want to find?',
		color:'#ccc'
	});
	
	inputSearch.add(labelWhat);
	
	inputSearch.addEventListener('click', function(){
		BizDir.navGroup.openWindow(BizDir.ui.createSearchWindow(), {
			animated:false,
			
		});
	});
	
	var advertising = Ti.UI.createImageView({
		width:screenwidth,
		height:100,
		bottom:0,
		image:'images/home/homeadvertising.jpg',
		defaultImage:'images/home/homeadvertising.jpg',
		clickurl:'http://www.bizdir.id/ads/click/id/1'
	});
	
	var peluangView = Ti.UI.createView({
		width:200,
		bottom:110,
		height:130,
		backgroundImage:'images/home/black.png',
		backgroundRepeat:true,
		borderRadius:10
	});
	
	var peluangTop = Ti.UI.createView({
		width:200,
		top:0,
		height:40
	});
		var hotLabel = Ti.UI.createLabel({		
			text:'Hot Deals',
			font:{fontSize:18,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
			color:'#fff',
			height:Ti.UI.SIZE,
			width:Ti.UI.SIZE,
			textAlign:'center'						
		});
		
		var borderBottom = Ti.UI.createView({
			width:180,
			top:39,
			height:1,
			backgroundColor:'#fff'
		});
		
		peluangTop.add(hotLabel);
		peluangTop.add(borderBottom);
	
	var peluangBottom = Ti.UI.createView({
		width:200,
		top:50,
		height:75,
		layout:'vertical'
	});
		
		var peluangBottomLeft = Ti.UI.createView({
			width:200,
			top:0,
			height:30,
		});
		
			var topBottomLeft = Ti.UI.createLabel({		
				font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
				height:Ti.UI.SIZE,
				width:Ti.UI.SIZE,
				textAlign:'left',
				text:'Business Opportunities',				
				left:10					
			});
			
			var bottomBottomLeft = Ti.UI.createLabel({		
				font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
				height:25,
				width:40,
				textAlign:'center',
				text:'0',
				right:10,
				borderColor:'#fff',
				borderWidth:1,
				borderRadius:4
			});
			
			peluangBottomLeft.add(topBottomLeft);
			peluangBottomLeft.add(bottomBottomLeft);
		
		var peluangBottomRight = Ti.UI.createView({
			width:200,
			top:0,
			height:30,
		});
		
			var topBottomRight = Ti.UI.createLabel({		
				font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
				height:Ti.UI.SIZE,
				width:Ti.UI.SIZE,
				textAlign:'left',
				text:'Promo Product / Sales',
				left:10,
				
			});
			
			var bottomBottomRight = Ti.UI.createLabel({		
				font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
				height:25,
				width:40,
				textAlign:'center',
				text:'0',
				right:10,
				borderColor:'#fff',
				borderWidth:1,
				borderRadius:4						
			});
			
			peluangBottomRight.add(topBottomRight);
			peluangBottomRight.add(bottomBottomRight);
		
	peluangBottom.add(peluangBottomLeft);
	// peluangBottom.add(peluangBottomSeperator);
	peluangBottom.add(peluangBottomRight);	
	
	peluangView.add(peluangTop);
	peluangView.add(peluangBottom);
	iconWeather.hide();
	labelWeather.hide();
	
	peluangBottomRight.addEventListener('click', function(){
		window.setCenterWindow(promotionWindow());
        // window.toggleLeftView();
	});
	
	peluangBottomLeft.addEventListener('click', function(){
		window.setCenterWindow(peluangWindow());
        // window.toggleLeftView();
	});
	
	function iPhoneinit(){
		win.add(navIcon);
		win.add(logo);
		win.add(iconArea);
		win.add(labelLocation);
		win.add(iconWeather);
		win.add(labelWeather);
		win.add(inputSearch);
		win.add(peluangView);
		win.add(advertising);
	}
	
	function getCounter(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/api/counter';		
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		Ti.API.info('Weather: '+apiurl);
		xhr.open('GET', apiurl);
		
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			var json = JSON.parse(this.responseText);
			bottomBottomLeft.text = json.result.business;
			bottomBottomRight.text = json.result.promotion;
		};
		
		xhr.onerror = function(e){
			Ti.API.info('Something Wrong ::> '+e.error);
			// alert('Invalid username or password!');
		};
	}
	
	getCounter();
	
	function getWeather(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/cuaca/today/'+BizDir.cityID;		
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		Ti.API.info('Weather: '+apiurl);
		xhr.open('GET', apiurl);
		
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			var json = JSON.parse(this.responseText);
			iconWeather.show();
			labelWeather.show();
			iconWeather.image = json.result.icon;
			labelWeather.text = json.result.suhuMin+'\n'+'°C';
			labelWeather.cuaca = json.result.cuaca;
			labelWeather.suhuMax = json.result.suhuMax;
			iconWeather.cuaca = json.result.cuaca;
			iconWeather.suhuMax = json.result.suhuMax;		
		};
		
		xhr.onerror = function(e){
			Ti.API.info('Something Wrong ::> '+e.error);
			// alert('Invalid username or password!');
		};
	}
	
	labelWeather.addEventListener('click', function(e){
		BizDir.navGroup.openWindow(BizDir.ui.createWeatherWindow({
			cuaca:e.source.cuaca,
			suhuMax:e.source.suhuMax
		}));
	});
	
	iconWeather.addEventListener('click', function(e){
		BizDir.navGroup.openWindow(BizDir.ui.createWeatherWindow({
			cuaca:e.source.cuaca,
			suhuMax:e.source.suhuMax
		}));
	});
	
	function getAds(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/ads/1';		
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		Ti.API.info('Weather: '+apiurl);
		xhr.open('GET', apiurl);
		
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			var json = JSON.parse(this.responseText);
			if(json.result.data > 0){
				advertising.image = json.result.data[0].picture;
				advertising.clickurl = json.result.data[0].url;
			}
					
		};
		
		xhr.onerror = function(e){
			Ti.API.info('Something Wrong ::> '+e.error);
			// alert('Invalid username or password!');
		};
	}
	
	advertising.addEventListener('click', function(e){
		var url = e.source.clickurl;
		Ti.Platform.openURL(url);
	});

	getAds();
	
	if (BizDir.cityID !== null && BizDir.cityID !== undefined &&  BizDir.cityID !== 0) {
		getWeather();
	} else {
		iconWeather.hide();
		labelWeather.hide();
	}
	
	labelLocation.addEventListener('click', function(){
		BizDir.navGroup.openWindow(BizDir.ui.createAreaSearchWindow());
	});
	
	Ti.App.addEventListener('updateAreaHome', function(data) 
	{ 
		labelLocation.text = BizDir.locationArea;
		win.backgroundImage = BizDir.bgImage;
		logo.image = BizDir.provinceImage;
		if (BizDir.cityID !== null && BizDir.cityID !== undefined &&  BizDir.cityID !== 0) {
			getWeather();
		}
	});
	
	iPhoneinit();
	
	return win;
};	