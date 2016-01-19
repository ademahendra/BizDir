BizDir.ui.createWeatherWindow = function (data) {
	// var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 0;

	var latitude = '-8.691039'; //e.coords.longitude;
    var longitude = '115.162806'; //e.coords.latitude;
	
	if(BizDir.isOS7()){
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'Weather',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        tintColor:"#333",
	        navTintColor:'#fff',
	        navBarHidden:false,
	        titleAttributes:{color:'#fff'}
		});	
	} else {
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'Weather',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        navBarHidden:false,
	        titleAttributes:{color:'#fff'}
		});
	};
	
	var spacer = 0;
	if (BizDir.ui.device == 'ipad') {
		spacer = 60;
		win.navBarHidden = true;
	}
	
	
	var blurBG = Ti.UI.createImageView({
        width:Ti.UI.FILL, height:Ti.UI.FILL, 
        image:BizDir.blurImage
    });
	
	var weatherView = Ti.UI.createView({		
		top:0 + spacer,
		height:Ti.UI.FILL,		
	});
	
	var cityLabel = Ti.UI.createLabel({
		width:screenwidth,
		font:{fontSize:25,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
		color:'#fff',
		text:BizDir.locationArea,
		top:20 + spacer,
		textAlign:'center'
	});
	
	var cuacaLabel = Ti.UI.createLabel({
		width:screenwidth,
		font:{fontSize:14,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
		color:'#fff',
		text:data.cuaca,
		top:50 + spacer,
		textAlign:'center'
	});
	
	var suhuLabel = Ti.UI.createLabel({
		width:screenwidth,
		font:{fontSize:30,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
		color:'#fff',
		text:data.suhuMax+' °C',
		top:70 + spacer,
		textAlign:'center'
	});
	
	var forecastWrapper = Ti.UI.createScrollView({
		width:screenwidth,
		height:350,
		top:110 + spacer,
		layout:'vertical',
		contentWidth:screenwidth,
		contentHeight:'auto'
	});
	
	var tableData = [];
	// Ti.API.info('Length: '+data.length);
	function displayWeather(data){
		for(var i = 0; i < data.length; i++){
			
			var wrapper = Ti.UI.createView({
				width:screenwidth,
				height:70
			});
			
			var dayLabel = Ti.UI.createLabel({
				width:'40%',
				font:{fontSize:18,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
				text:data[i].day, //+' °C',
				textAlign:'left',
				left:20
			});
			
			var iconWeather = Ti.UI.createImageView({
				width:20,
				height:Ti.UI.SIZE,
				image:data[i].icon,
				defaultImage:'/images/defaultimage.png',
				right:145
			});
			
			var daymaxLabel = Ti.UI.createLabel({
				width:Ti.UI.SIZE,
				font:{fontSize:18,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
				text:data[i].suhuMax+' °C',
				textAlign:'left',
				right:80
			});
			
			var dayminLabel = Ti.UI.createLabel({
				width:Ti.UI.SIZE,
				font:{fontSize:18,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
				text:data[i].suhuMin+' °C',
				textAlign:'left',
				right:20
			});
			
			wrapper.add(dayLabel);
			wrapper.add(iconWeather);
			wrapper.add(daymaxLabel);
			wrapper.add(dayminLabel);
			forecastWrapper.add(wrapper);
		}
	}
	
	function getWeather(){
    	var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/cuaca/'+BizDir.cityID;
		
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('GET', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();

		xhr.onload = function(data){
			Ti.API.info('fave: '+this.responseData);
			var json = JSON.parse(this.responseText);
		 	displayWeather(json.result.data);		
		};
		xhr.onerror = function(e){			
			Ti.API.info('Something Wrong ::> '+e.error);
		};
    }
	
	function weatherInit(){		
		getWeather();
		win.add(blurBG);
		
		weatherView.add(cityLabel);
		weatherView.add(cuacaLabel);
		weatherView.add(suhuLabel);
		weatherView.add(forecastWrapper);
		win.add(weatherView);		
	}
		
	weatherInit();
	
	win.addEventListener('open', function(){
		
	});
	
	if (BizDir.ui.device == 'ipad') {
		var padnavBar = Ti.UI.createView({
			height:60,
			backgroundColor: '#1e5c69',
			width:screenwidth,
			top:0
		});
		
		var titleLabel = Ti.UI.createLabel({
			width:screenwidth - 120,
			height:	Ti.UI.SIZE,
			text:'Weather',
			color:'#fff',
			font:{fontSize:18,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
			textAlign:'center'
		});
		
		var backButton = Ti.UI.createButton({
			width:40,
			height:40,
			backgroundImage:'images/back.png',
			left:10
		});
		
		backButton.addEventListener('click', function(){
			win.close();
		});
		
		padnavBar.add(titleLabel);
		padnavBar.add(backButton);
		win.add(padnavBar);
	}
	
	return win;
};	