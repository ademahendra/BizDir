Ti.include(	
	'/ui/common/promotionPage.js'
);

BizDir.ui.createPromotionWindow = function () {
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
			title:'Promotion',
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
			title:'Promotion',
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
	
	var navIcon = Ti.UI.createButton({
		width:26,
		height:26,
		backgroundImage:'images/menu_navigation.png',
		top:20,
		left:10,
	});
	
	win.setLeftNavButton(navIcon);
	
	navIcon.addEventListener('click', function(){
		window.toggleLeftView();
	});
	
	var blurBG = Ti.UI.createImageView({
        width:Ti.UI.FILL, height:Ti.UI.FILL, 
        image:BizDir.bgImage,
        // blur:{
	        // type:blur.IOS_BLUR, radiusInPixels:2
	    // }  
    });
	
	var promoTable = Ti.UI.createTableView({
		backgroundColor:'transparent',
		separatorColor:'transparent',
		top:0 + spacer,
		height:Ti.UI.FILL,
		
	});
	
	
	var tableData = [];
	// Ti.API.info('Length: '+data.length);
	function displayPromo(data){
		for(var i = 0; i < data.length; i++){
			var row = Ti.UI.createTableViewRow({
				backgroundColor:'transparent',
				width:screenwidth,
				height:Ti.UI.SIZE,
				data:data[i]			
			});
			
			var imagePromo = Ti.UI.createImageView({
				width:screenwidth,
				height:Ti.UI.SIZE,
				data:data[i],
				image:data[i].picture,
				defaultImage:'images/promotion/adsholder.png'
			});
			
			row.add(imagePromo);
			row.addEventListener('click', function(e){
				BizDir.navGroupPromotion.openWindow(BizDir.ui.createPromotionPage(e.source.data));
			});
			
			tableData.push(row);
		}
		promoTable.data = tableData;
	}
	
	function getPromotion(){
    	var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/promotion/list/'+page;
		
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('GET', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();

		xhr.onload = function(data){
			Ti.API.info('fave: '+this.responseData);
			var json = JSON.parse(this.responseText);
		 	displayPromo(json.result.data);		
		};
		xhr.onerror = function(e){			
			Ti.API.info('Something Wrong ::> '+e.error);
		};
    }
	
	function promoInit(){		
		getPromotion();
		win.add(blurBG);
		win.add(promoTable);		
	}
		
	promoInit();
	
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
			text:'Promotion',
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