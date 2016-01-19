Ti.include(	
	'/ui/common/news/newsPage.js'
);

BizDir.ui.createNewsWindow = function () {
	// var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 0;
	var page1 = 0;

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
			title:'News',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        tintColor:"#fff",
	        navBarHidden:false,	        
	        // backgroundImage:BizDir.bgImage,
	        titleAttributes:{color:'#fff'}
		});	
	} else {
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'News',
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

	
	var navIcon = Ti.UI.createButton({
		width:26,
		height:26,
		backgroundImage:'images/menu_navigation.png',
		top:20,
		left:10,
	});
	
	var blurBG = Ti.UI.createImageView({
        width:Ti.UI.FILL, height:Ti.UI.FILL, 
        image:BizDir.blurImage,
        // blur:{
	        // type:blur.IOS_BLUR, radiusInPixels:1
	    // }  
    });
    
    var overlayView = Ti.UI.createView({
    	width:Ti.UI.FILL, height:Ti.UI.FILL,
    	backgroundColor:'#fff',
    	opacity:0.2
    });
	if (BizDir.ui.device !== 'ipad') {
		win.setLeftNavButton(navIcon);
		
		navIcon.addEventListener('click', function(){
			window.toggleLeftView();
			
		});
	}
	
	var advertising = Ti.UI.createImageView({
		width:screenwidth,
		height:100,
		top:0 + spacer,
		image:'images/home/homeadvertising.jpg'
	});
	
	var tabBarNews = Titanium.UI.iOS.createTabbedBar({
	    labels:['Kadin News', 'Antara News', 'Stock'],
	    backgroundColor:'#fff',
	    top:0 + spacer,
	    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	    height:35,
	    width:screenwidth,
	    color:'#fff'
	});
	
	var parentView = Ti.UI.createView({
	    height: Ti.UI.FILL,
	    top: 35 + spacer,
	    width: Ti.UI.FILL
	});
	
	var data1 = [];

	var data2 = [];

	var data3 = [];

	
	var firsttabView = Ti.UI.createTableView({
		top:0,
		width:screenwidth,
		height:screenheight-35-64,
		data: data1,
		backgroundColor:'transparent'
	});
	
	var secondViewWrapper = Ti.UI.createView({
		top:0,
		width:screenwidth,
		height:screenheight-35-64,
	});
	
	var inputSelect = Ti.UI.createTextField({
		width:screenwidth,
		height:44,
		top:0,
		backgroundColor:'#fff',
		paddingLeft:5,
		paddingRight:5,
		hintText:'Click to select category'
	});	
		 
	var btncatCancel = Ti.UI.createButton({
	    title : 'Cancel',
	    style : 1
	});
	 
	var btncatDone = Ti.UI.createButton({
	    title : 'Done',
	    style : 1
	});
	
	var btnflexSpace = Titanium.UI.createButton({
	    systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var selectToolview = Ti.UI.iOS.createToolbar({
	    height : 40,
	    width : screenwidth,
	    left : 0,
	    top : 0,
	    items : [btncatCancel, btnflexSpace, btncatDone],
	    barColor : '#1e5c69'
	});
		
	var selectOption = Ti.UI.createPicker({
		width:screenwidth,
		// height:44,
		top:44,			
	});
	// 325329
	selectOption.hide();
	selectToolview.hide();
	
	btncatCancel.addEventListener('click', function(){
		selectOption.hide();
		selectToolview.hide();
	});
	
	btncatDone.addEventListener('click', function(){
		Ti.API.info('Picker Value: '+selectOption.getSelectedRow(0).title);
		inputSelect.value = selectOption.getSelectedRow(0).title;
		getNewsAntara(selectOption.getSelectedRow(0).id);		
		selectOption.hide();
		selectToolview.hide();
	});
	
	var secondtabView = Ti.UI.createTableView({
		top:44,
		width:screenwidth,
		height:screenheight-35-64-44,
		data: data2,
		backgroundColor:'transparent'
	});
	
	inputSelect.addEventListener('focus', function(){
		inputSelect.blur();
		selectOption.show();
		selectToolview.show();
	});
	
	
	var thirdtabView = Ti.UI.createTableView({
		top:44,
		width:screenwidth,
		height:screenheight-35-64-44,
		data: data2,
		backgroundColor:'transparent'
	});
	
	// begin stock exchange 
	
	var thirdViewWrapper = Ti.UI.createView({
		top:0,
		width:screenwidth,
		height:screenheight-35-64,
	});
	
	var inputSelect2 = Ti.UI.createTextField({
		width:screenwidth,
		height:44,
		top:0,
		backgroundColor:'#fff',
		paddingLeft:5,
		paddingRight:5,
		hintText:'Click to select stock category'
	});	
		 
	var btncatCancel2 = Ti.UI.createButton({
	    title : 'Cancel',
	    style : 1
	});
	 
	var btncatDone2 = Ti.UI.createButton({
	    title : 'Done',
	    style : 1
	});
	
	var btnflexSpace2 = Titanium.UI.createButton({
	    systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var selectToolview2 = Ti.UI.iOS.createToolbar({
	    height : 40,
	    width : screenwidth,
	    left : 0,
	    top : 0,
	    items : [btncatCancel2, btnflexSpace2, btncatDone2],
	    barColor : '#1e5c69'
	});
		
	var selectOption2 = Ti.UI.createPicker({
		width:screenwidth,
		// height:44,
		top:44,			
	});
	// 325329
	selectOption2.hide();
	selectToolview2.hide();
	
	btncatCancel2.addEventListener('click', function(){
		selectOption2.hide();
		selectToolview2.hide();
	});
	
	btncatDone2.addEventListener('click', function(){
		Ti.API.info('Picker Value: '+selectOption2.getSelectedRow(0).title);
		inputSelect2.value = selectOption2.getSelectedRow(0).title;
		getStock(selectOption2.getSelectedRow(0).id);		
		selectOption2.hide();
		selectToolview2.hide();
	});
	
	inputSelect2.addEventListener('focus', function(){
		inputSelect2.blur();
		selectOption2.show();
		selectToolview2.show();
	});
	
	
	
	var tableData = [];
	var tableData2 = [];
	// var tableData3 = [];
	function filltable1(data){
		for(var i = 0; i < data.length; i++){
			var row = Ti.UI.createTableViewRow({
				width:screenwidth,
				height:60,
				hasChild:true,
				data:data[i]
			});
			
			var container = Ti.UI.createView({
				width:screenwidth-20,
				height:60,
				left:0,
				backgroundColor:'transparent',
				data:data[i]
			});
			
			var imageFile = data[i].thumb;
			if(data[i].thumb == '' || data[i].thumb == null){
				var imageFile = '/images/defaultimage.png';
			}			
			
			var thumbView = Ti.UI.createImageView({
				width:45,
				height:45,
				image:imageFile,
				left:10,
				hires:true,
				data:data[i],
				defaultImage:'/images/defaultimage.png'
			});
			
			var contentWrapper = Ti.UI.createView({
				layout:'vertical',
				width: screenwidth - 65,
				height:50,
				left:60,
				data:data[i]
			});
			
			var titleLabel = Ti.UI.createLabel({				
				left:0,
				height:'auto',
				text:data[i].title,
				font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
				data:data[i]
			});
			
			var dateLabel = Ti.UI.createLabel({
				left:0,
				height:'auto',
				text:data[i].uDate,
				font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeue'},
				color:'#fff',
				data:data[i]
			});
			
			contentWrapper.add(titleLabel);
			contentWrapper.add(dateLabel);
			container.add(thumbView);
			container.add(contentWrapper);
			row.add(container);
			row.addEventListener('click', function(e){
				BizDir.navGroupNews.openWindow(BizDir.ui.createNewsPagesWindow(e.source.data));
			});
			tableData.push(row);
		}
		firsttabView.data = tableData;
	};
	
	function filltable2(data){
		tableData2 = [];
		for(var i = 0; i < data.length; i++){
			var row = Ti.UI.createTableViewRow({
				width:screenwidth,
				height:60,
				hasChild:true,
				data:data[i]
			});
			
			var container = Ti.UI.createView({
				width:screenwidth-20,
				height:60,
				left:0,
				backgroundColor:'transparent',
				data:data[i]
			});
			
			var imageFile = data[i].thumb;
			if(data[i].thumb == '' || data[i].thumb == null){
				var imageFile = '/images/defaultimage.png';
			}
			
			
			var thumbView = Ti.UI.createImageView({
				width:45,
				height:45,
				image:imageFile,
				left:10,
				hires:true,
				data:data[i],
				defaultImage:'/images/defaultimage.png'
			});
			
			var contentWrapper = Ti.UI.createView({
				layout:'vertical',
				width: screenwidth - 65,
				height:50,
				left:60,
				data:data[i]
			});
			
			var titleLabel = Ti.UI.createLabel({				
				left:0,
				height:'auto',
				text:data[i].title,
				font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
				data:data[i]
			});
			
			var dateLabel = Ti.UI.createLabel({
				left:0,
				height:'auto',
				text:data[i].uDate,
				font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeue'},
				color:'#fff',
				data:data[i]
			});
			
			contentWrapper.add(titleLabel);
			contentWrapper.add(dateLabel);
			container.add(thumbView);
			container.add(contentWrapper);
			row.add(container);
			row.addEventListener('click', function(e){
				BizDir.navGroupNews.openWindow(BizDir.ui.createNewsPagesWindow(e.source.data));
			});
			tableData2.push(row);
		}
		secondtabView.data = tableData2;
	};
	
	function filltable3(data){
		tableData3 = [];
		var row = Ti.UI.createTableViewRow({
			width:screenwidth,
			height:50,
			// hasChild:true,
			data:data[i]
		});
		
		var titleWrapper = Ti.UI.createView({
			width:screenwidth-10,
			height:50,
			layout:'horizontal',
			data:data[i]
		});
		
		var lCode = Ti.UI.createLabel({
			width:'35%',
			text:'Code',
			height:30,
			color:'#fff',
			font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
			left:10,
			textAlign:'left'
		});
		
		var lLast = Ti.UI.createLabel({
			width:'20%',
			text:'Last',
			height:30,
			color:'#fff',
			font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
			left:0,
			textAlign:'left'
		});
		
		var lChange = Ti.UI.createLabel({
			width:'20%',
			text:'Change',
			height:30,
			color:'#fff',
			font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
			left:0,
			textAlign:'left'
		});
		
		var lPercentChange = Ti.UI.createLabel({
			width:'20%',
			text:'Percent',
			height:30,
			color:'#fff',
			font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
			left:0,
			textAlign:'left'
		});
		titleWrapper.add(lCode);
		titleWrapper.add(lLast);
		titleWrapper.add(lChange);
		titleWrapper.add(lPercentChange);
		
		row.add(titleWrapper);
		tableData3.push(row);
		
		for(var i = 0; i < data.length; i++){
			var row = Ti.UI.createTableViewRow({
				width:screenwidth,
				height:30,
				// hasChild:true,
				data:data[i]
			});
			
			var wrapper = Ti.UI.createView({
				width:screenwidth-10,
				height:30,
				layout:'horizontal',
				data:data[i]
			});
			
			var labelCode = Ti.UI.createLabel({
				width:'30%',
    			text:data[i].stock_code,
    			height:30,
    			color:'#fff',
    			font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
    			left:10,
    			textAlign:'left'
			});
			
			var labelLast = Ti.UI.createLabel({
				width:'20%',
    			text:data[i].last,
    			height:30,
    			color:'#fff',
    			font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
    			left:0,
    			textAlign:'left'
			});
			
			var labelChange = Ti.UI.createLabel({
				width:'20%',
    			text:data[i].change,
    			height:30,
    			color:'#fff',
    			font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
    			left:0,
    			textAlign:'left'
			});
			
			var labelPercentChange = Ti.UI.createLabel({
				width:'20%',
    			text:data[i].percent_change,
    			height:30,
    			color:'#fff',
    			font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
    			left:0,
    			textAlign:'left'
			});
			
			wrapper.add(labelCode);
			wrapper.add(labelLast);
			wrapper.add(labelChange);
			wrapper.add(labelPercentChange);
			
			row.add(wrapper);
			
			
			tableData3.push(row);
		}
		thirdtabView.data = tableData3;
	};
	
// Create a TabbedBar.

   var flexSpace = Ti.UI.createButton({
	   systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
   });
   parentView.setToolbar([flexSpace, tabBarNews, flexSpace]);
					
	
	tabBarNews.addEventListener('click', function(e){
		switch(e.index){
	        case 0: {
	        	parentView.add(firsttabView);
	        	parentView.remove(secondViewWrapper);
	        	parentView.remove(thirdViewWrapper);
	            break;
	        }
	        case 1: {
	        	parentView.remove(firsttabView);
	        	parentView.add(secondViewWrapper);
	        	parentView.remove(thirdViewWrapper);
	            break;
	        }
	        case 2: {
	        	parentView.remove(firsttabView);
	        	parentView.remove(secondViewWrapper);
	        	parentView.add(thirdViewWrapper);
	            break;
	        }
       	}
	});
	
	tabBarNews.index = 0;
	parentView.add(firsttabView);
	
	secondViewWrapper.add(secondtabView);
	secondViewWrapper.add(inputSelect);
	secondViewWrapper.add(selectOption);
	secondViewWrapper.add(selectToolview);
	
	thirdViewWrapper.add(thirdtabView);
	thirdViewWrapper.add(inputSelect2);
	thirdViewWrapper.add(selectOption2);
	thirdViewWrapper.add(selectToolview2);	
	
	
	function getNews(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/news/list/'+page;
		// Ti.API.info('URL : '+apiurl);
		var params = {
			// 'lang' : 'EN'
		};
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('GET', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();
		// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			
			var json = JSON.parse(this.responseText);
			filltable1(json.result.data);
			page++;
		};
		
		xhr.onerror = function(e){
			// dialog.show();
			// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}	
	getNews();
	
	function addItemtoPicker(data){
		var rowItem = [];
		for(var i = 0; i < data.length; i++){
			rowItem.push(Ti.UI.createPickerRow({title:data[i].title, id:data[i].id}));
		}
		selectOption.add(rowItem);
	};
	
	function addItemtoStockPicker(){
		var rowItem = [];
		var stock = [
				{id:'0', title:'Stock Summary'},
				{id:'1', title:'Top Gainer'},
				{id:'2', title:'Top Looser'},
				{id:'3', title:'Top Value'},
				{id:'4', title:'Top Volume'},
				{id:'5', title:'Most Active'}
			];
		for(var i = 0; i < stock.length; i++){
			rowItem.push(Ti.UI.createPickerRow({title:stock[i].title, id:stock[i].id}));
		}
		selectOption2.add(rowItem);
	};
	
	function getAntaraNewsCategory(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/antara/category';
		// Ti.API.info('URL : '+apiurl);
		var params = {
			// 'lang' : 'EN'
		};
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('GET', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();
		// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			
			var json = JSON.parse(this.responseText);
			addItemtoPicker(json.result.data);
			// page++;
		};
		
		xhr.onerror = function(e){
			// dialog.show();
			// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}	
	getAntaraNewsCategory();
	
	function getNewsAntara(id){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/antara/'+page1+'/0';
		// Ti.API.info('URL : '+apiurl);
		var params = {
			// 'lang' : 'EN'
		};
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('GET', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();
		// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			
			var json = JSON.parse(this.responseText);
			filltable2(json.result.data);
			page1++;
		};
		
		xhr.onerror = function(e){
			// dialog.show();
			// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}
	
	function getStock(id){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/stock/list/'+id;
		// Ti.API.info('URL : '+apiurl);
		var params = {
			// 'lang' : 'EN'
		};
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('GET', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();
		// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			
			var json = JSON.parse(this.responseText);
			filltable3(json);
			//page++;
		};
		
		xhr.onerror = function(e){
			// dialog.show();
			// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}	
	getStock(0);
	addItemtoStockPicker();
	
	advertising.addEventListener('click', function(e){
		Ti.Platform.openURL('http://bizdir.id/site/services');
	});
	
	function iPhoneinit(){
		win.add(blurBG);
		// // win.add(overlayView);
		win.add(tabBarNews);
		win.add(parentView);
		
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
			width:screenwidth - 120,
			height:	Ti.UI.SIZE,
			text:'News',
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