Ti.include(	
	'/ui/common/forum/threadWindow.js',
	'/ui/common/forum/topicWindow.js'
);

BizDir.ui.createForumWindow = function () {
	// var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 0;
	var trendingPage = 0;

	var latitude = '-8.691039';	 //	e.coords.longitude;
    var longitude = '115.162806';//	e.coords.latitude;	
	
	if(BizDir.isOS7()){
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'Forums',
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
			title:'Forums',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        navBarHidden:false,
	        titleAttributes:{color:'#fff'},
	        // backgroundImage:BizDir.bgImage
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
	
	var blurBG = Ti.UI.createImageView({
        width:Ti.UI.FILL, height:Ti.UI.FILL, 
        image:BizDir.bgImage,
    });
    
    var overlayView = Ti.UI.createView({
    	width:Ti.UI.FILL, height:Ti.UI.FILL,
    	backgroundColor:'#fff',
    	opacity:0.2
    });	
	
	var advertising = Ti.UI.createImageView({
		width:screenwidth,
		height:100,
		top:0 + spacer,
		image:'images/home/homeadvertising.jpg'
	});
	
	var tabBarNews = Titanium.UI.iOS.createTabbedBar({
	    labels:['Categories', 'Trending Topics'],
	    backgroundColor:'#fff',
	    top:100 + spacer,
	    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	    height:35,
	    width:screenwidth,
	    color:'#fff'
	});
	
	var parentView = Ti.UI.createView({
	    height: Ti.UI.FILL,
	    top: 135 + spacer,
	    width: Ti.UI.FILL
	});
	
	var data1 = [];

	var data2 = [];
	
	var firsttabView = Ti.UI.createTableView({
		top:0,
		width:screenwidth,
		height:screenheight-35-64 - 100 - spacer,
		data: data1,
		backgroundColor:'transparent'
	});
	
	var secondtabView = Ti.UI.createTableView({
		top:0,
		width:screenwidth,
		height:screenheight-35-64 -100 - spacer,
		data: data2,
		backgroundColor:'transparent'
	});
	
	var tableData = [];
	var tableData2 = [];
	
// Create a TabbedBar.

   var flexSpace = Ti.UI.createButton({
	   systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
   });
   parentView.setToolbar([flexSpace, tabBarNews, flexSpace]);
					
	
	tabBarNews.addEventListener('click', function(e){
		switch(e.index){
	        case 0: {
	        	parentView.add(firsttabView);
	        	parentView.remove(secondtabView);
	            break;
	        }
	        case 1: {
	        	parentView.remove(firsttabView);
	        	parentView.add(secondtabView);
	            break;
	        }
       	}
	});
	
	tabBarNews.index = 0;
	parentView.add(firsttabView);	
		
	var topheaderRow = Ti.UI.createTableViewRow({
		width:screenwidth,
		height:50,
		selectedBackgroundColor:'transparent',
		selectedColor:'transparent'
	});
	
	var labelHeaderPopular = Ti.UI.createLabel({
		width:screenwidth,
		height:((screenwidth / 4) + 40) * 2,
		font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
		color:'#fff',
		left:10,
		text:'Popular Category'
	});
	
	topheaderRow.add(labelHeaderPopular);
	tableData.push(topheaderRow);
	
	var topRow = Ti.UI.createTableViewRow({
		width:screenwidth,
		height:(((screenwidth / 4) + 40) * 2) +10,
		selectedBackgroundColor:'transparent',
		selectedColor:'transparent'
	});
	
	var categoryView = Ti.UI.createView({
		top:10,
		width:screenwidth,
		height:((screenwidth / 4) + 40) * 2,
		layout:'horizontal'
	});
	
	topRow.add(categoryView);
	tableData.push(topRow);
	
	function categoryData(data){
		for(var i = 0; i < data.length; i++){
			if (BizDir.ui.device == 'ipad') {
				var categoryContainer = Ti.UI.createView({
					width:screenwidth / 6,
					height:(screenwidth / 6) + 40,
					id:data[i].id,
					nama:data[i].name
				});
				
				var categoryIcon = Ti.UI.createImageView({
					width:(screenwidth / 6) - 10,
					height:(screenwidth / 6) - 10,
					image:data[i].picture,
					top:0,
					id:data[i].id,
					nama:data[i].name,
					defaultImage:'/images/defaultimage.png'
				});
				
				var categoryLabel = Ti.UI.createLabel({
					width:(screenwidth / 6) - 10,
					top:(screenwidth / 6),
					bottom:2,
					text:data[i].name,
					color:'#fff',
					// height:40,
					font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
					textAlign:'center',
					id:data[i].id,
					nama:data[i].name
				});	
			} else {
				var categoryContainer = Ti.UI.createView({
					width:screenwidth / 4,
					height:(screenwidth / 4) + 40,
					id:data[i].id,
					nama:data[i].name
				});
				
				var categoryIcon = Ti.UI.createImageView({
					width:(screenwidth / 4) - 10,
					height:(screenwidth / 4) - 10,
					image:data[i].picture,
					top:0,
					id:data[i].id,
					nama:data[i].name,
					defaultImage:'/images/defaultimage.png'
				});
				
				var categoryLabel = Ti.UI.createLabel({
					width:(screenwidth / 4) - 10,
					top:(screenwidth / 4),
					bottom:2,
					text:data[i].name,
					color:'#fff',
					// height:40,
					font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
					textAlign:'center',
					id:data[i].id,
					nama:data[i].name
				});	
			}
			categoryContainer.add(categoryIcon);
			categoryContainer.add(categoryLabel);
			categoryView.add(categoryContainer);
			
			categoryContainer.addEventListener('click', function(e){
				Ti.API.info('Title : '+e.source.nama);
				BizDir.navGroupForum.openWindow(BizDir.ui.createThreadWindow({
					nama:e.source.nama,
					id:e.source.id
				}));
			});
		}
		topRow.addEventListener('click', function(e){
			Ti.API.info('Row Click : '+e.source.nama);			
		});
		firsttabView.data = tableData;
	}
	
	function fillCategory(data){
		var firstRow = Ti.UI.createTableViewRow({
			width:screenwidth,
			height:40,
			selectedBackgroundColor:'transparent',
			selectedColor:'transparent'
		});
		
		var catheaderLabel = Ti.UI.createLabel({
			width:screenwidth-20,
			left:10,
			text:'All Categories',
			color:'#fff',
			font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
		});
		
		firstRow.add(catheaderLabel);
		tableData.push(firstRow);
		for (var i=0; i < data.length; i++) {
			
			
				var row = Ti.UI.createTableViewRow({
					width:screenwidth,
					height:40,
					id:data[i].id,
					hasChild:true
				});
				
				var catWrapper = Ti.UI.createView({
					width:screenwidth-20,
					height:40,
					id:data[i].id,
					left:10
				});
				
				var catLabel = Ti.UI.createLabel({
					width:screenwidth-20,
					left:10,
					text:data[i].name,
					color:'#fff',
					font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
					id:data[i].id,
				});
			
			
			catWrapper.add(catLabel);
			row.add(catWrapper);
			row.addEventListener('click', function(e){
				BizDir.navGroupForum.openWindow(BizDir.ui.createThreadWindow({
					nama:e.source.nama,
					id:e.source.id
				}));
			});
			tableData.push(row);
		};
		
		firsttabView.data = tableData;
	}
	
	function fillTrending(data){
		for (var i=0; i < data.length; i++) {
			var row = Ti.UI.createTableViewRow({
				width:screenwidth,
				height:Ti.UI.SIZE,
				layout:'vertical',
				data:data[i]
			});
			
			var wrapper = Ti.UI.createView({
				width:screenwidth - 20,
				height:Ti.UI.SIZE,
				backgroundColor:'#333',
				layout:'vertical',
				opacity:0.8,
				top:0,
				data:data[i]
			});
			
			var titleLabel = Ti.UI.createLabel({
				text : data[i].title,
				color : '#fff',
				height : Ti.UI.SIZE,
				width : screenwidth-10,
				top : 5,
				left : 5,
				font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeue'},
				data:data[i]
			});
			
			var infoWrapper = Ti.UI.createView({
				width:screenwidth - 20,
				height:15,
				layout:'horizontal',
				data:data[i]
			});
			
				var viewCountImage = Ti.UI.createImageView({
					width:10,
					height:6,
					left:5,
					image:'images/forum/view.png',
					data:data[i]
				});
				
				var viewCountLabel = Ti.UI.createLabel({
					width: Ti.UI.SIZE,
					font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeue'},
					color:'#fff',
					text:data[i].viewCount,
					left:5,
					data:data[i]
				});
				
				var replyCountImage = Ti.UI.createImageView({
					width:10,
					height:9,
					left:5,
					image:'images/forum/comment.png',
					data:data[i]
				});
				
				var replyCountLabel = Ti.UI.createLabel({
					width:40,
					font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeue'},
					color:'#fff',
					text:data[i].viewCount,
					left:5,
					data:data[i]
				});
				
				var d = new Date(1000* data[i].time);
				
				var dateLabel = Ti.UI.createLabel({
					width:Ti.UI.SIZE,
					font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeue'},
					color:'#fff',
					text:BizDir.datetime.monthToName(d.getMonth())+" "+d.getDate()+", "+d.getFullYear(),
					left:10,
					data:data[i]
				});
				
			infoWrapper.add(viewCountImage);
			infoWrapper.add(viewCountLabel);
			infoWrapper.add(replyCountImage);
			infoWrapper.add(replyCountLabel);
			infoWrapper.add(dateLabel);
				
			var border = Ti.UI.createView({
				width:screenwidth-30,
				height:1,
				backgroundColor:'#fff',
				top:5,
				data:data[i]
			});
			
			var categoryLabel = Ti.UI.createLabel({
				width:Ti.UI.SIZE,
				font:{fontSize:10,fontWeight:'normal',fontFamily:'HelveticaNeue'},
				color:'#fff',
				text:data[i].Category,
				left:10,
				top:5,
				data:data[i]
			});
			
			var marginBottom = Ti.UI.createView({
				backgroundColor:'transparent',
				height:5,
				width:screenwidth - 20,
				top:0,
				data:data[i]
			});
			
			wrapper.add(titleLabel);
			wrapper.add(infoWrapper);
			wrapper.add(border);
			wrapper.add(categoryLabel);
			wrapper.add(marginBottom);
			// Add to the parent view.
			row.add(wrapper);
			row.add(marginBottom);
			
			row.addEventListener('click', function(e){
				BizDir.navGroupForum.openWindow(BizDir.ui.createTopicWindow(
					e.source.data
				));
			});
			
			tableData2.push(row);
		};
		secondtabView.data = tableData2;
	}
	
	function getPopular(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/forum/popularcategory';
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
			Ti.API.info('Response Popular : '+this.responseText);
			
			var json = JSON.parse(this.responseText);
			categoryData(json.result.data);
		};
		
		xhr.onerror = function(e){
			// dialog.show();
			// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}	
	getPopular();
	
	function getCategory(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/forum/category';
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
			Ti.API.info('Response Category : '+this.responseText);
			
			var json = JSON.parse(this.responseText);
			fillCategory(json.result.data);
		};
		
		xhr.onerror = function(e){
			// dialog.show();
			// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}	
	getCategory();
	
	function getTrending(pages){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/forum/trendingtopic/'+pages;
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
			Ti.API.info('Response Trending : '+this.responseText);
			
			var json = JSON.parse(this.responseText);
			fillTrending(json.result.data);
		};
		
		xhr.onerror = function(e){
			// dialog.show();
			// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}	
	getTrending(trendingPage);
	
	advertising.addEventListener('click', function(e){
		Ti.Platform.openURL('http://bizdir.id/site/services');
	});
	
	function iPhoneinit(){
		win.add(blurBG);
		// win.add(overlayView);		
		win.add(advertising);
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
			text:'Forum',
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