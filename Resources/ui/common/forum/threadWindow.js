BizDir.ui.createThreadWindow = function (data) {
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
	        navTintColor:'#fff',
	        navBarHidden:false,	        
	        backgroundImage:BizDir.bgImage,
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
	        navTintColor:'#fff',
	        titleAttributes:{color:'#fff'},
	        backgroundImage:BizDir.bgImage
		});
	};
	
	var spacer = 0;
	if (BizDir.ui.device == 'ipad') {
		spacer = 60;
		win.navBarHidden = true;
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
    	opacity:0.6
    });
	
	
	var data1 = [];
	
	var firsttabView = Ti.UI.createTableView({
		top:0 + spacer,
		width:screenwidth,
		height:Ti.UI.FILL,
		// data: data1,
		backgroundColor:'transparent'
	});
	
	var tableData = [];
	// parentView.add(firsttabView);
	
	function fillThread(data){
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
			
			tableData.push(row);
		};
		firsttabView.data = tableData;
	}	
	
	function getTrending(id,pages){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/forum/topic/'+id+'/'+pages;
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
			fillThread(json.result.data);
		};
		
		xhr.onerror = function(e){
			// dialog.show();
			// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}	
	getTrending(data.id, page);
	
	function iPhoneinit(){
		// win.add(overlayView);
		win.add(firsttabView);
		
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
		padnavBar.add(backButton);
		win.add(padnavBar);
	}
	
	return win;
};	