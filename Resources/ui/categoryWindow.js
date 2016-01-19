Ti.include(	
	'/ui/common/category/subcategoryWindow.js',
	'/ui/common/category/listCategoryWindow.js'
);

BizDir.ui.createCategoryWindow = function () {
	// var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 1;

	var latitude = '-8.691039';	 //	e.coords.longitude;
    var longitude = '115.162806';//	e.coords.latitude;
	
	var categoryItem = [
		{title:'Nature Product',icon:'icon_4.png', id:1},
	];
	
	if(BizDir.isOS7()){
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'Category',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        tintColor:"#1e5c69",
	        navBarHidden:false,
	        navTintColor:'#fff',
	        titleAttributes:{color:'#fff'},
	        backgroundImage:BizDir.bgImage
		});	
	} else {
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'Category',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        navBarHidden:false,
	        backgroundImage:BizDir.bgImage,
	        titleAttributes:{color:'#fff'}
		});
	};
	
	var navIcon = Ti.UI.createButton({
		width:26,
		height:26,
		backgroundImage:'images/menu_navigation.png',
		top:20,
		left:10,
	});
	
	var spacer = 0;
	if (BizDir.ui.device == 'ipad') {
		spacer = 60;
		win.navBarHidden = true;
	}
	
	if (BizDir.ui.device !== 'ipad') {
		win.setLeftNavButton(navIcon);
		
		navIcon.addEventListener('click', function(){
			window.toggleLeftView();
		});	
	}
	var advertising = Ti.UI.createImageView({
		width:screenwidth,
		height:100,
		top:44 + spacer,
		image:'images/home/homeadvertising.jpg'
	});
	
	var areaView = Ti.UI.createView({
		width:screenwidth,
		height:44,
		backgroundColor:'#1e5c69',
		top:0 + spacer
	});
	
		var labelArea = Ti.UI.createLabel({
			text:'In: '+BizDir.locationArea,
			left:35,
			right:45,
			color:'#fff',
			textAlign:'left'
		});
		
		var iconArea = Ti.UI.createImageView({
			left:10,
			width:12,
			height:18,
			image:'images/marker.png'
		});
		
		var buttonSearchArea = Ti.UI.createButton({
			right:10,
			width:30,
			height:30,
			backgroundImage:'images/location.png'
		});
	
	
	var categoryView = Ti.UI.createScrollView({
		top:150 + spacer,
		width:screenwidth,
		contentWidth:screenwidth,
		contentHeight:'auto',
		height:screenheight - 210,
		layout:'horizontal'
	});
	
	var data = BizDir.selectCategory();
	
	for(var i = 0; i < data.length; i++){
		if (BizDir.ui.device == 'ipad') {
			var categoryContainer = Ti.UI.createView({
				width:screenwidth / 6,
				height:(screenwidth / 6) + 40,
				id:data[i].id,
				nama:data[i].nama
			});
			
			var categoryIcon = Ti.UI.createImageView({
				width:(screenwidth / 6) - 10,
				height:(screenwidth / 6) - 10,
				image:'images/category/'+data[i].picture,
				top:0,
				id:data[i].id,
				nama:data[i].nama
			});
			
			var categoryLabel = Ti.UI.createLabel({
				width:(screenwidth / 6) - 10,
				top:(screenwidth / 6),
				bottom:2,
				text:data[i].nama,
				color:'#fff',
				// height:40,
				font:{fontSize:14,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
				textAlign:'center',
				id:data[i].id,
				nama:data[i].nama
			});
		} else {
			var categoryContainer = Ti.UI.createView({
				width:screenwidth / 4,
				height:(screenwidth / 4) + 40,
				id:data[i].id,
				nama:data[i].nama
			});
			
			var categoryIcon = Ti.UI.createImageView({
				width:(screenwidth / 4) - 10,
				height:(screenwidth / 4) - 10,
				image:'images/category/'+data[i].picture,
				top:0,
				id:data[i].id,
				nama:data[i].nama
			});
			
			var categoryLabel = Ti.UI.createLabel({
				width:(screenwidth / 4) - 10,
				top:(screenwidth / 4),
				bottom:2,
				text:data[i].nama,
				color:'#fff',
				// height:40,
				font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
				textAlign:'center',
				id:data[i].id,
				nama:data[i].nama
			});
		}
		categoryContainer.add(categoryIcon);
		categoryContainer.add(categoryLabel);
		categoryView.add(categoryContainer);
		
		categoryContainer.addEventListener('click', function(e){
			Ti.API.info('Title : '+e.source.nama);
			BizDir.navGroupCat.openWindow(BizDir.ui.createSubCategoryWindow({
				nama:e.source.nama,
				id:e.source.id
			}));
		});
	}
	
	labelArea.addEventListener('click', function(){
		if(!BizDir.winCatOpen){
			BizDir.winCatOpen = true;
			BizDir.navGroupCat.openWindow(BizDir.ui.createAreaSearchWindow());
		}
	});
	
	buttonSearchArea.addEventListener('click', function(){
		if(!BizDir.winCatOpen){
			BizDir.winCatOpen = true;
			BizDir.navGroupCat.openWindow(BizDir.ui.createAreaSearchWindow());
		}	
	});
	
	function iPhoneinit(){
		areaView.add(iconArea);
		areaView.add(labelArea);
		areaView.add(buttonSearchArea);
		
		win.add(areaView);
		win.add(advertising);
		win.add(categoryView);
	}
	
	advertising.addEventListener('click', function(){
		Ti.Platform.openURL('http://bizdir.id/site/services');
	});
	
	win.addEventListener('open', function(){
		Ti.API.info('Masuk :'+BizDir.locationArea);
		labelArea.text = BizDir.locationArea;
	});
		
	Ti.App.addEventListener('updateAreaCat', function(data) 
	{ 
		labelArea.text = BizDir.locationArea; 
	});
	
	iPhoneinit();
	
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
			text:'Category',
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
		// padnavBar.add(backButton);
		win.add(padnavBar);
	}
	
	return win;
};	