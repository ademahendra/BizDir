BizDir.ui.createTopicWindow = function (data) {
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
    
    var replyButton = Ti.UI.createButton({
    	systemButton:Ti.UI.iPhone.SystemButton.COMPOSE,
    	width:40,
    	height:40,
    	color:'#fff',
    	style:Ti.UI.iPhone.SystemButtonStyle.PLAIN
    });
    
    win.setRightNavButton(replyButton);
    
    var bgopacity = Ti.UI.createView({
    	width:screenwidth,
    	height:screenheight,
    	backgroundColor:'#000',
    	opacity:0.8
    });
    
    var popUpbg = Ti.UI.createView({
    	width:screenwidth-20,
    	height:screenheight-200,
    	top:20 + spacer,
    	backgroundColor:'#ccc'
    });
    
    var sendButton = Ti.UI.createButton({
    	systemButton:Ti.UI.iPhone.SystemButton.DONE,
    	color:'#fff',
    	style:Ti.UI.iPhone.SystemButtonStyle.PLAIN
    });
    
    var cancelButton = Ti.UI.createButton({
    	systemButton:Ti.UI.iPhone.SystemButton.CANCEL,
    	// width:40,
    	// height:40,
    	color:'#fff',
    	style:Ti.UI.iPhone.SystemButtonStyle.PLAIN
    });
    
    var btnflexSpace = Titanium.UI.createButton({
	    systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
    
   var selectToolview = Ti.UI.iOS.createToolbar({
	    height : 40,
	    width : screenwidth-20,
	    left : 0,
	    top : 0,
	    items : [cancelButton, btnflexSpace, sendButton],
	    barColor : '#1e5c69'
	});
	
    var inputReply = Ti.UI.createTextArea({
    	width:screenwidth-30,
    	height:screenheight-260,
    	borderColor:'#ccc',
    	backgroundColor:'#fff',
    	top:50	
    });
    
    popUpbg.add(selectToolview);
    popUpbg.add(inputReply);
    
    replyButton.addEventListener('click', function(){
    	Ti.API.info('reply Click');
    	popUpbg.show();
    	bgopacity.show();
    });
    
    cancelButton.addEventListener('click', function(){
    	Ti.API.info('cancel Click');
    	popUpbg.hide();
    	bgopacity.hide();
    });
    
    sendButton.addEventListener('click', function(){
    	sendReply(data.id);
    });
    
    var overlayView = Ti.UI.createView({
    	width:Ti.UI.FILL, height:Ti.UI.FILL,
    	backgroundColor:'#fff',
    	opacity:0.5
    });
	
	var data1 = [];
	
	var tableView = Ti.UI.createTableView({
		top:0 + spacer,
		width:screenwidth,
		height:screenheight-100 - spacer,
		backgroundColor:'transparent'
	});
	
	var navigationBottom = Ti.UI.createView({
		width:screenwidth,
		height:40,
		bottom:60,
		backgroundColor:'#333',
		layout:'horizontal'
	});
	
		var firstButtonView = Ti.UI.createButton({
			width:screenwidth/4,
			height:40,			
		});
		
		var firstButton = Ti.UI.createButton({
			width:40,
			height:27,
			backgroundImage:'images/forum/first.png'
		});
		
		firstButtonView.add(firstButton);
		
		var prevButtonView = Ti.UI.createButton({
			width:screenwidth/4,
			height:40,			
		});
		
		var prevButton = Ti.UI.createButton({
			width:40,
			height:27,
			backgroundImage:'images/forum/prev.png'
		});
		
		prevButtonView.add(prevButton);
		
		var nextButtonView = Ti.UI.createButton({
			width:screenwidth/4,
			height:40,			
		});
		
		var nextButton = Ti.UI.createButton({
			width:40,
			height:27,
			backgroundImage:'images/forum/next.png'
		});
		
		nextButtonView.add(nextButton);
		
		var lastButtonView = Ti.UI.createButton({
			width:screenwidth/4,
			height:40,			
		});
		
		var lastButton = Ti.UI.createButton({
			width:40,
			height:27,
			backgroundImage:'images/forum/last.png'
		});
		
		lastButtonView.add(lastButton);
	
	navigationBottom.add(firstButtonView);
	navigationBottom.add(prevButtonView);
	navigationBottom.add(nextButtonView);
	navigationBottom.add(lastButtonView);
	
	firstButton.enabled = false;
	prevButton.enabled = false;
	nextButton.enabled = false;
	lastButton.enabled = false;
	
	nextButton.addEventListener('click', function(){
		page++;
		getTopic(data.id, page);
	});
	
	prevButton.addEventListener('click', function(){
		page--;
		getTopic(data.id, page);
	});
	
	firstButton.addEventListener('click', function(){
		page = 0;
		getTopic(data.id, 0);
	});
	
	lastButton.addEventListener('click', function(){
		// page = 0;
		getTopic(data.id, (totalPage - 1));
	});
	
	var totalPage = 0;
	// parentView.add(firsttabView);
	
	function fillTopic(data){
		var tableData = [];
		if(data.next){
			nextButton.enabled = true;
			lastButton.enabled = true;
		} else {
			nextButton.enabled = false;
			lastButton.enabled = false;
		}
		
		if(data.prev){
			firstButton.enabled = true;
			prevButton.enabled = true;
		} else {
			firstButton.enabled = false;
			prevButton.enabled = false;
		}
		
		
		for (var i=0; i < data.length; i++) {
			var row = Ti.UI.createTableViewRow({
				width:screenwidth,
				height:Ti.UI.SIZE,
				selectedBackgroundColor:'transparent',
				selectedColor:'transparent'
			});
			
			var wrapper = Ti.UI.createView({
				width:screenwidth,
				height:Ti.UI.SIZE,
				layout:'vertical'
			});
			
			var topWrapper = Ti.UI.createView({
				width:screenwidth,
				height:Ti.UI.SIZE,
				top:0
			});
			
				if(i == 0){
					var titleLabel = Ti.UI.createLabel({
						left:10,
						width:screenwidth - 90,
						font:{fontSize:14,fontWeight:'normal',fontFamily:'HelveticaNeue'},
						color:'#fff',
						text:data[i].title
					});
					
					topWrapper.add(titleLabel);
				}
				
				var d = new Date(1000* data[i].time);
				var dateLabel = Ti.UI.createLabel({
					width:75,
					font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeue'},
					color:'#fff',
					text:BizDir.datetime.monthToName(d.getMonth())+" "+d.getDate()+", "+d.getFullYear(),
					right:10,
					data:data[i]
				});
				topWrapper.add(dateLabel);
			
			var secondWrapper = Ti.UI.createView({
				width:screenwidth,
				height:Ti.UI.SIZE,
				top:0
			});
			
				var userLabel = Ti.UI.createLabel({
					left:10,
					width:screenwidth - 60,
					font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeue'},
					color:'#fff',
					text:data[i].user
				});
				var numberLabel = Ti.UI.createLabel({
					width:45,
					font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeue'},
					color:'#fff',
					text:'#'+data[i].number,
					right:10,
					data:data[i]
				});
				
				secondWrapper.add(userLabel);
				secondWrapper.add(numberLabel);
				
			var contentWrapper = Ti.UI.createView({
				width:screenwidth,
				height:Ti.UI.SIZE,
				top:0,
				backgroundColor:'#fff'
			});
			
				var contentLabel = styedlabel.createLabel({
			        width: screenwidth - 20,
			        height:Ti.UI.SIZE,
			        top: 10,
			        color: '#000000',
			        font: {
			            fontSize: 12,
			            fontWeight: 'normal',
			            fontFamily: 'Helvetica Neue'
			        },
			        html: data[i].content
			    });
			
			contentWrapper.add(contentLabel);
			
			wrapper.add(topWrapper);
			wrapper.add(secondWrapper);
			wrapper.add(contentWrapper);
			
			row.add(wrapper);
			tableData.push(row);
		};	
		tableView.data = tableData;
	}	
	
	function getTopic(id,pages){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/forum/detailtopic/'+id+'/'+pages;
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
			// Ti.API.info('Response Trending : '+this.responseText);			
			var json = JSON.parse(this.responseText);
			fillTopic(json.result.data);
			totalPage = json.totalPage;
			
			Ti.API.info('Page '+page+' total : '+totalPage);
			if(page == 0 && totalPage > 1){
				nextButton.enabled = true;
				lastButton.enabled = true;
				firstButton.enabled = false;
				prevButton.enabled = false;
			}
			
			if(page > 0 && totalPage > 1){
				firstButton.enabled = true;
				prevButton.enabled = true;
				nextButton.enabled = true;
				lastButton.enabled = true;
			}
			
			if(page == (totalPage - 1)){
				firstButton.enabled = true;
				prevButton.enabled = true;
				nextButton.enabled = false;
				lastButton.enabled = false;
			}
		};
		
		xhr.onerror = function(e){
			// dialog.show();
			// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}	
	getTopic(data.id, page);
	
	function sendReply(id){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/forum/topic/reply';
		// Ti.API.info('URL : '+apiurl);
		var params = {
			'userid' : Ti.App.Properties.getString('uid'),
			'topicid' : id,
			'content' : inputReply.value
		};
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('POST', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send(params);
		// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
		xhr.onload = function(){
			// Ti.API.info('Response Trending : '+this.responseText);			
			var json = JSON.parse(this.responseText);
			popUpbg.hide();
    		bgopacity.hide();
			
		};
		
		xhr.onerror = function(e){
			// dialog.show();
			// Ti.API.info('Send Params '+xhr.getResponseHeader('X_REST_USERNAME'));
			Ti.API.info('Something Wrong ::> '+e.error);
			alert('Failed to post reply');
		};
	}
	
	function iPhoneinit(){
		popUpbg.hide();
		bgopacity.hide();
		// win.add(overlayView);
		win.add(tableView);
		win.add(navigationBottom);
		win.add(bgopacity);
		win.add(popUpbg);
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