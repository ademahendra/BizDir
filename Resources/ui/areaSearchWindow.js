Ti.include(	
	
);

BizDir.ui.createAreaSearchWindow = function () {
	// var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 0;

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
			title:'Select Location',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',	        
	        tintColor:"#fff",	        
	        navBarHidden:false,	  
	        navTintColor:'#fff',      
	        // backgroundImage:BizDir.bgImage,
	        titleAttributes:{color:'#fff'}
		});	
	} else {
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'Select Location',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        navBarHidden:false,
	        titleAttributes:{color:'#fff'},
	        // backgroundImage:BizDir.bgImage
		});
	};
	
	var spacer = 0;
	if (BizDir.ui.device == 'ipad') {
		spacer = 60;
		win.navBarHidden = true;
	}
	
	if (BizDir.ui.device !== 'ipad') {
		var navIcon = Ti.UI.createButton({
			width:26,
			height:26,
			backgroundImage:'images/menu_navigation.png',
			top:20,
			left:10,
		});
	
	}
	var blurBG = Ti.UI.createImageView({
        width:Ti.UI.FILL, height:Ti.UI.FILL, 
        image:BizDir.bgImage,
        // blur:{
	        // type:blur.IOS_BLUR, radiusInPixels:1
	    // }  
    });
    
    var overlayView = Ti.UI.createView({
    	width:Ti.UI.FILL, height:Ti.UI.FILL,
    	backgroundColor:'#fff',
    	opacity:0.2
    });
	
	// win.setLeftNavButton(navIcon);
// 	
	// navIcon.addEventListener('click', function(){
		// window.toggleLeftView();
	// });	
// 	
	var currentCity = Ti.UI.createView({
		width:screenwidth,
		height:44,
		backgroundColor:'#1e5c69',
		top:0 + spacer
	});
	
	var iconArea = Ti.UI.createImageView({
		left:10,
		width:12,
		height:18,
		image:'images/marker.png'
	});
	
	var labelCurrent = Ti.UI.createLabel({
		width:screenwidth-100,
		left:32,
		top:8,
		text:'Current Location:',
		color:'#fff',
		font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeue'},
	});
	
	var labelCurrentArea = Ti.UI.createLabel({
		width:screenwidth-100,
		left:32,
		bottom:8,
		text:BizDir.locationArea,
		color:'#fff',
		font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeue'},
	});
		
	currentCity.add(iconArea);	
	currentCity.add(labelCurrent);
	currentCity.add(labelCurrentArea);	
	
	var tabBarNews = Titanium.UI.iOS.createTabbedBar({
	    labels:['Cities', 'Provinces'],
	    backgroundColor:'#fff',
	    top:44 + spacer,
	    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	    height:35,
	    width:screenwidth,
	    color:'#fff'
	});
	
	var parentView = Ti.UI.createView({
	    height: Ti.UI.FILL,
	    top: 35+44 + spacer,
	    width: Ti.UI.FILL
	});
	
	var parentView2 = Ti.UI.createView({
	    height: Ti.UI.FILL,
	    top: 35+44 + spacer,
	    width: Ti.UI.FILL
	});
	
	var data1 = [
		{title:'Indonesia', id:0},
		{title:'Aceh Barat', id:1},
		{title:'Aceh Besar', id:2},
		{title:'Aceh Jaya', id:3},
		{title:'Aceh Selatan', id:4},
		{title:'Aceh Singkil', id:5}
	];
	
	var cityList = BizDir.selectCity();
	var provinceList = BizDir.selectProvince();
	
	var searchBar1 = Ti.UI.createSearchBar({
		barColor:'#1e5c69', 
	    showCancel:false,
	    hintText:'Search for City',
	    backgroundColor:'transparent',
	    top:0,
	    height:44	    
	});
	
	var searchBar2 = Ti.UI.createSearchBar({
		barColor:'#1e5c69', 
	    showCancel:false,
	    hintText:'Search for Province',
	    backgroundColor:'transparent',	
	    top:0,
	    height:44   
	});
	
	var firsttabView = Ti.UI.createTableView({
		top:44,
		width:screenwidth,
		// height:screenheight-35-64-44-44,
		height:Ti.UI.FILL,
		// data: cityList,
		// search:searchBar1,
		color:'#fff',
		backgroundColor:'transparent',
		filterAttribute:'filter'
	});	
	
	var secondtabView = Ti.UI.createTableView({
		top:44,
		width:screenwidth,
		height:Ti.UI.FILL,
		// data: provinceList,
		// search:searchBar2,
		color:'#fff',
		backgroundColor:'transparent',
		filterAttribute:'filter'
	});
	
	function fillCity(data){
		var tableData = [];
		for(var i = 0; i < data.length; i++){
			var tableRow = Titanium.UI.createTableViewRow({
			    height : 50,
			    id : data[i].id,
			    idProvinsi : data[i].idProvinsi,
			    filter : data[i].title,
			    text : data[i].title,
			    width:screenwidth-20,
			});
			var labTitle = Ti.UI.createLabel({
			    color : 'white',
			    width:screenwidth-20,
			    font : {
			        fontSize : 14,
			        fontWeight : 'normal'
			    },
			    height : Ti.UI.SIZE,
			    text : data[i].title,
			    filter : data[i].title,
			    width:screenwidth-20,
			    id : data[i].id,
			    idProvinsi : data[i].idProvinsi,
			    textAlign : 'left'
			});
			tableRow.add(labTitle);
			tableRow.addEventListener('click', function(e){
				var id = e.source.id;
				var idProvinsi = e.source.idProvinsi;	
				BizDir.locationArea = e.source.text;
				BizDir.locationID = idProvinsi;
				BizDir.cityID = id;
				// BizDir.bgImage = 'images/provinsi/bg_'+idProvinsi+'.jpg';
				BizDir.provinceImage = 'images/logoprovinsi/'+idProvinsi+'.png';
				// BizDir.blurImage = 'images/provinsi/bg_'+idProvinsi+'_wf.jpg';
				//update area
				if (BizDir.ui.device == 'ipad') {
					Ti.App.fireEvent('updatePadHome');
				}
				Ti.App.fireEvent('updateAreaCat');
				Ti.App.fireEvent('updateAreaSearch');
				Ti.App.fireEvent('updateAreaHome');
				Ti.App.fireEvent('updateAreaSubCat');
				Ti.App.fireEvent('updateAreaListCat');		
				
				win.close();
			});
			
			tableData.push(tableRow);
		}
		firsttabView.data = tableData;
	}

	function fillProvince(data){
		var tableData = [];
		for(var i = 0; i < data.length; i++){
			var tableRow = Titanium.UI.createTableViewRow({
			    height : 50,
			    id : data[i].id,
			    filter : data[i].title,
			    text : data[i].title,
			    width:screenwidth-20,
			});
			var labTitle = Ti.UI.createLabel({
			    color : 'white',
			    width:screenwidth-20,
			    font : {
			        fontSize : 14,
			        fontWeight : 'normal'
			    },
			    height : Ti.UI.SIZE,
			    text : data[i].title,
			    id : data[i].id,
			    filter : data[i].title,
			    textAlign : 'left'
			});
			tableRow.add(labTitle);
			tableRow.addEventListener('click', function(e){
				var id = e.source.id;
				BizDir.locationArea = e.source.text;
				BizDir.locationID = id;
				BizDir.cityID = null;
				// BizDir.bgImage = 'images/provinsi/bg_'+id+'.jpg';
				BizDir.provinceImage = 'images/logoprovinsi/'+id+'.png';
				// BizDir.blurImage = 'images/provinsi/bg_'+id+'_wf.jpg';

				if (BizDir.ui.device == 'ipad') {
					Ti.App.fireEvent('updatePadHome');
				}
				Ti.App.fireEvent('updateAreaCat');
				Ti.App.fireEvent('updateAreaSearch');
				Ti.App.fireEvent('updateAreaHome');
				Ti.App.fireEvent('updateAreaSubCat');
				Ti.App.fireEvent('updateAreaListCat');
				
				win.close();
			});
			
			tableData.push(tableRow);			
		}
		secondtabView.data = tableData;
	}	
	
	fillCity(cityList);
	fillProvince(provinceList);
// Create a TabbedBar.

	var flexSpace = Ti.UI.createButton({
	   systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
   	});
   	parentView.setToolbar([flexSpace, tabBarNews, flexSpace]);
	
	searchBar1.addEventListener('change', function(e){
		var citySearch = BizDir.selectCitySearch(searchBar1.value);
	
		fillCity(citySearch);
	});
	
	searchBar2.addEventListener('change', function(e){
		var provinceSearch = BizDir.selectProvinceSearch(searchBar2.value);
		fillProvince(provinceSearch);	
	});
	
	searchBar1.addEventListener('return', function(e){
		searchBar1.blur();
	});
	
	searchBar2.addEventListener('change', function(e){
		searchBar2.blur();	
	});			
	
	tabBarNews.addEventListener('click', function(e){
		switch(e.index){
	        case 0: {
	        	parentView.show();
	        	parentView2.hide();
	            break;
	        }
	        case 1: {
	        	parentView.hide();
	        	parentView2.show();
	            break;
	        }
       	}
	});
	
	tabBarNews.index = 0;
	
	parentView.add(searchBar1);	
	parentView.add(firsttabView);		
	
	parentView2.add(searchBar2);
	parentView2.add(secondtabView);
	
	parentView2.hide();
	
	function iPhoneinit(){
		win.add(blurBG);
		// win.add(overlayView);
		win.add(currentCity);
		win.add(tabBarNews);
		win.add(parentView);
		win.add(parentView2);
	}
	iPhoneinit();
	
	if (BizDir.ui.device == 'ipad') {
		var padnavBar = Ti.UI.createView({
			height:60,
			backgroundColor: '#1e5c69',
			width:screenwidth,
			top:0
		});
		
		var titleLabel = Ti.UI.createLabel({
			width:Ti.UI.SIZE,
			height:	Ti.UI.SIZE,
			text:'Select Location',
			color:'#fff',
			font:{fontSize:18,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
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
	
	win.addEventListener('open', function(){
		//avoid double window opened
		BizDir.winCatOpen = false;
	});
	
	
	return win;
};	