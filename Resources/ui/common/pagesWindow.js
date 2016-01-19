Ti.include(	
	'/ui/common/galleryWindow.js',
	'/ui/common/mapWindow.js'
);

BizDir.ui.createPagesWindow = function (data, navwindow) {
	// var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 1;

	var latitude = '-8.691039';	 //	e.coords.longitude;
    var longitude = '115.162806';//	e.coords.latitude;	
	
	if(BizDir.isOS7()){
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:data.nama,
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        tintColor:"#1e5c69",
	        navBarHidden:false,
	        navTintColor:'#fff',
	        titleAttributes:{color:'#fff'},
	        // backgroundImage:BizDir.bgImage
		});	
	} else {
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:data.nama,
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        navBarHidden:false,
	        // backgroundImage:BizDir.bgImage,
	        titleAttributes:{color:'#fff'}
		});
	};	
	
	var spacer = 0;
	if (BizDir.ui.device == 'ipad') {
		spacer = 60;
		win.navBarHidden = true;
	}

	var imageFile = 'http://www.bizdir.id/images/anggota/'+data.dir+'/'+data.id+'/'+data.id+'_bg.jpg';
	var imageBG = 'http://www.bizdir.id/images/anggota/'+data.dir+'/'+data.id+'/'+data.id+'_bg.jpg';
	var blurBG = Ti.UI.createImageView({
        width:Ti.UI.FILL, 
        height:screenwidth/2, 
        image:imageBG,
        // blur:{
	        // type:blur.IOS_BLUR, radiusInPixels:1
	    // }  
    });	
	
	var faveIcon = Ti.UI.createButton({
		width:26,
		height:26,
		backgroundImage:'images/icon/ic_favorite_add.png',
		top:20,
		left:10,
		id:data.id
	});
	
	win.setRightNavButton(faveIcon);
	
	faveIcon.addEventListener('click', function(e){
		var idPage = e.source.id;
		Ti.API.info(':::> '+idPage);
		addFave(idPage);
	});
	
	function addFave(id){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/favorite/add';
		var params = {
			'userid' : Ti.App.Properties.getString('uid'),
			'anggotaid' : id
		};
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('POST', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send(params);

		xhr.onload = function(data){
			Ti.API.info('fave: '+this.responseData);
			var json = JSON.parse(this.responseText);
			alert('This Company has Added to Your Favorite'); 			
		};
		xhr.onerror = function(e){			
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	
	}
	
	var overlayView = Ti.UI.createView({
    	width:Ti.UI.FILL, 
    	height:Ti.UI.FILL,
    	// backgroundColor:'#fff',
    	opacity:0.4
    });
    
    var headerBGView = Ti.UI.createImageView({
    	width:screenwidth,
    	height:screenheight/2,
    	top:0 + spacer,
    	image:imageBG,
    	defaultImage:BizDir.bgImage,
    	// zIndex:88
    });
    
    var headerView = Ti.UI.createView({
    	width:screenwidth,
    	height:screenheight/2,
    	layout:'vertical',
    	top:0 + spacer,
    	// backgroundImage:imageBG
    });
    
    var imageVerified;
	if(data.verifikasi == '1'){
		imageVerified = "images/verified.png";
	} else {
		imageVerified = "images/unverified.png";
	}
    
    var verifikasiIcon = Ti.UI.createImageView({
    	top: 5,
    	right: 5,
    	width:83,
    	height:25,
    	image:imageVerified,
    	zIndex:9999
    });
    
    	var logoFile = 'http://www.bizdir.id/images/anggota/'+data.dir+'/'+data.id+'/'+data.id+'_lg.png';
    	
    	var companyLogo = Ti.UI.createImageView({
    		width:60,
    		height:60,
    		image:logoFile,
    		top:5,
    		defaultImage:'/images/defaultimage.png'
    	});
    	
    	var titleLabel = Ti.UI.createLabel({
    		width:screenwidth - 20,
    		height:20,
    		top:10,
    		text:data.nama,
    		font:{fontSize:14,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
    		color:'#fff',
    		textAlign:'center'
    	});
    	
    	var locationWrapper = Ti.UI.createView({
    		width:Ti.UI.SIZE,
    		height:30,
    		top:0,
    		layout:'horizontal'
    	});
    		
    		var marker = Ti.UI.createImageView({
    			width:12,
				height:18,
				image:'images/marker.png',
				
    		});
    		
    		var address = data.kota+', '+data.provinsi;
    		if(data.kota == null){
    			address = data.provinsi;
    		}
    		
    		var addressLabel = Ti.UI.createLabel({
    			width:Ti.UI.SIZE,
    			text:address,
    			height:30,
    			color:'#fff',
    			font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
    			left:10,
    			textAlign:'center'
    		});
    		
    		locationWrapper.add(marker);
    		locationWrapper.add(addressLabel);
    	
    	var tabWrapper = Ti.UI.createView({
    		width:screenwidth,
    		height:50,
    		top:(screenheight / 2) - 240 //145 + 50 + 50 +15 - 20
    	});
    	
    	var tab1 = Ti.UI.createView({
    		width:screenwidth/3,
    		height:50,
    		left:0,
    		bottom:0
    	});
    		
    		var tab1Icon = Ti.UI.createImageView({
    			width:25,
    			height:25,
    			top:0,
    			image:'images/profile/profile.png'
    		});
    		
    		var tab1Label = Ti.UI.createLabel({
    			width:screenwidth/3,
    			textAlign:'center',
    			bottom:3,
    			color:'#fff',
    			font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
    			text:'Profile'
    		});
    		
    		var tab1Indicator = Ti.UI.createImageView({
    			width:10,
    			height:10,
    			bottom:-5,
    			image:'images/indicator.png'
    		});
    	
    	tab1.add(tab1Icon);
    	tab1.add(tab1Label);	
    	tab1.add(tab1Indicator);
    	
    	var tab2 = Ti.UI.createView({
    		width:screenwidth/3,
    		height:50,
    		left:screenwidth/3,
    		bottom:0
    	});
    		
    		var tab2Icon = Ti.UI.createImageView({
    			width:28,
    			height:24,
    			top:0,
    			image:'images/profile/contact.png'
    		});
    		
    		var tab2Label = Ti.UI.createLabel({
    			width:screenwidth/3,
    			textAlign:'center',
    			bottom:3,
    			color:'#fff',
    			font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
    			text:'Contact'
    		});
    		
    		var tab2Indicator = Ti.UI.createImageView({
    			width:10,
    			height:10,
    			bottom:-5,
    			image:'images/indicator.png'
    		});
    	
    	tab2.add(tab2Icon);
    	tab2.add(tab2Label);
    	tab2.add(tab2Indicator);
    	
    	var tab3 = Ti.UI.createView({
    		width:screenwidth/3,
    		height:55,
    		left:(screenwidth/3) * 2,
    		bottom:0
    	});
    	
    		var tab3Icon = Ti.UI.createImageView({
    			width:25,
    			height:19,
    			top:5,
    			image:'images/profile/gallery.png'
    		});
    		
    		var tab3Label = Ti.UI.createLabel({
    			width:screenwidth/3,
    			textAlign:'center',
    			bottom:3,
    			color:'#fff',
    			font:{fontSize:12,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
    			text:'Gallery'
    		});
    		
    		var tab3Indicator = Ti.UI.createImageView({
    			width:10,
    			height:10,
    			bottom:-5,
    			image:'images/indicator.png'
    		});
    		
    	
    	tab3.add(tab3Icon);
    	tab3.add(tab3Label);
    	tab3.add(tab3Indicator);
    	
    	tabWrapper.add(tab1);
    	tabWrapper.add(tab2);
    	tabWrapper.add(tab3);
    	
    	
    	headerView.add(companyLogo);
    	headerView.add(titleLabel);
    	headerView.add(locationWrapper);
    	headerView.add(tabWrapper);
    	
    var view1 = Ti.UI.createView({ 
    	width:screenwidth,
    	height:(screenheight/2),
    });
    
    var view1Wrapper = Ti.UI.createScrollView({ 
    	layout:'vertical',
    	width:screenwidth-20,
    	height:(screenheight/2)-20,
    	contentWidth:screenwidth-20,
    	contentHeight:'auto'
    });
     
    	var overviewLabel = Ti.UI.createLabel({
			text:'OVERVIEW',
			color:'#000',
			font:{fontSize:14,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
			top:0,
			width:screenwidth-20
		});
		
		var overviewcontentLabel = Ti.UI.createLabel({
			text:data.deskripsi,
			color:'#000',
			font:{fontSize:14,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
			top:10,
			width:screenwidth-20,
			height:'auto'
		});
		
		var productLabel = Ti.UI.createLabel({
			text:'PRODUCT',
			color:'#000',
			font:{fontSize:14,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
			top:10,
			width:screenwidth-20
		});
		
		var productcontentLabel = Ti.UI.createLabel({
			text:data.produk,
			color:'#000',
			font:{fontSize:14,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
			top:10,
			width:screenwidth-20,
			height:'auto'
		});
		
		var brandLabel = Ti.UI.createLabel({
			text:'BRAND',
			color:'#000',
			font:{fontSize:14,fontWeight:'bold',fontFamily:'HelveticaNeueBold'},
			top:10,
			width:screenwidth-20
		});
		
		var brandcontentLabel = Ti.UI.createLabel({
			text:data.brand,
			color:'#000',
			font:{fontSize:14,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
			top:10,
			width:screenwidth-20,
			height:'auto'
		});
   	view1Wrapper.add(overviewLabel);
   	view1Wrapper.add(overviewcontentLabel);
   	view1Wrapper.add(productLabel);
   	view1Wrapper.add(productcontentLabel);
   	view1Wrapper.add(brandLabel);
   	view1Wrapper.add(brandcontentLabel);
   	view1.add(view1Wrapper);
    
	var view2 = Ti.UI.createView({ 
		backgroundColor:'#fff',
		width:screenwidth,
    	height:(screenheight/2), 
	});
	
	var view2wrapper = Ti.UI.createScrollView({ 
		backgroundColor:'#fff',
		width:screenwidth,
    	height:(screenheight/2),
    	contentHeight:'auto',
    	contentWidth:screenwidth,
    	layout:'vertical' 
	});
	
		var companyName = Ti.UI.createLabel({
			width:screenwidth - 20,
			color:'#000',
			font:{fontSize:14,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
			height:30,
			text:data.nama
		});
		
		var addressLabel = Ti.UI.createLabel({
			width:screenwidth - 20,
			color:'#4592F4',
			font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
			text:'Address',
			top:10,
			height:20
		});
		
		var addressContentWrapper = Ti.UI.createView({
			width:screenwidth - 20,
			height:50,
			top:5,
		});
		// navwindow
			var addressContentLabel = Ti.UI.createLabel({
				width:screenwidth - 55,
				color:'#000',
				font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
				text:data.alamat,
				height:50,
				left:10			
			});
			
			var markerIcon = Ti.UI.createImageView({
				width:22,
				height:33,
				right:10,
				image:'images/ic_pin_blue.png',
				data:data
			});
			
			markerIcon.addEventListener('click', function(e){
				navwindow.openWindow(BizDir.ui.createMapWindow(e.source.data, latitude, longitude));
			});
			
			addressContentWrapper.add(addressContentLabel);
			addressContentWrapper.add(markerIcon);
			
		var phoneLabel = Ti.UI.createLabel({
			width:screenwidth - 20,
			color:'#4592F4',
			font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
			text:'Phone',
			top:10,
			height:20
		});
		
		var phoneContentWrapper = Ti.UI.createView({
			width:screenwidth - 20,
			height:30,
			top:5,
			
		});
		
			var phoneContentLabel = Ti.UI.createLabel({
				width:screenwidth - 20,
				color:'#000',
				font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
				text:data.telepon,
				height:30		
			});
			
			phoneContentWrapper.add(phoneContentLabel);	
			
		var faxLabel = Ti.UI.createLabel({
			width:screenwidth - 20,
			color:'#4592F4',
			font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
			text:'Fax',
			top:10,
			height:20
		});
		
		var faxContentWrapper = Ti.UI.createView({
			width:screenwidth - 20,
			height:30,
			top:5,
			
		});
		
			var faxContentLabel = Ti.UI.createLabel({
				width:screenwidth - 20,
				color:'#000',
				font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
				text:data.faksimili,
				height:30		
			});
			
			faxContentWrapper.add(faxContentLabel);	
			
		var emailLabel = Ti.UI.createLabel({
			width:screenwidth - 20,
			color:'#4592F4',
			font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
			text:'Email',
			top:10,
			height:20
		});
		
		var emailContentWrapper = Ti.UI.createView({
			width:screenwidth - 20,
			height:30,
			top:5,
			
		});
		
			var emailContentLabel = Ti.UI.createLabel({
				width:screenwidth - 20,
				color:'#000',
				font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
				text:data.email,
				height:30		
			});
			
			emailContentWrapper.add(emailContentLabel);		
			
		var webLabel = Ti.UI.createLabel({
			width:screenwidth - 20,
			color:'#4592F4',
			font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
			text:'Website',
			top:10,
			height:20
		});
		
		var webContentWrapper = Ti.UI.createView({
			width:screenwidth - 20,
			height:30,
			top:5,			
		});
		
			var webContentLabel = Ti.UI.createLabel({
				width:screenwidth - 20,
				color:'#000',
				font:{fontSize:12,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
				text:data.website,
				height:30		
			});
			
			webContentWrapper.add(webContentLabel);				
	
		view2wrapper.add(companyName);
		view2wrapper.add(addressLabel);
		view2wrapper.add(addressContentWrapper);
		view2wrapper.add(phoneLabel);
		view2wrapper.add(phoneContentWrapper);
		view2wrapper.add(faxLabel);
		view2wrapper.add(faxContentWrapper);
		view2wrapper.add(emailLabel);
		view2wrapper.add(emailContentWrapper);
		view2wrapper.add(webLabel);
		view2wrapper.add(webContentWrapper);
		
	view2.add(view2wrapper);
	
	var view3 = Ti.UI.createView({ 
		backgroundColor:'#fff',
		width:screenwidth,
    	height:(screenheight/2), 
	});
	
	var view3wrapper = Ti.UI.createScrollView({ 
		backgroundColor:'#fff',
		width:screenwidth,
    	height:(screenheight/2),
    	contentHeight:'auto',
    	contentWidth:screenwidth,
    	layout:'horizontal' 
	});
	
	
	tab1.addEventListener('click', function(){
		slider.currentPage = 0;
		tab1Indicator.show();
		tab2Indicator.hide();
		tab3Indicator.hide();
	});
	
	tab2.addEventListener('click', function(){
		slider.currentPage = 1;
		tab1Indicator.hide();
		tab2Indicator.show();
		tab3Indicator.hide();
	});
	
	tab3.addEventListener('click', function(){
		slider.currentPage = 2;
		tab1Indicator.hide();
		tab2Indicator.hide();
		tab3Indicator.show();
	});
    
    var slider = Ti.UI.createScrollableView({
    	views:[view1,view2,view3],
    	width:screenwidth,
    	height:(screenheight/2),
    	top:((screenheight/2) - 60) + spacer,
    	backgroundColor:'#fff',
    	showPagingControl:false
    });
    
    function fillGallery(gallery){
    	for (var i=0; i < gallery.length; i++) {
			var galleryImage = Ti.UI.createImageView({
				width:(screenwidth/4)-5,
				left:4,
				height:Ti.UI.SIZE,
				top:5,
				image:gallery[i].thumb,
				id:gallery[i].id,
				defaultImage:'/images/defaultimage.png',
				data:gallery
			});
			
			galleryImage.addEventListener('click', function(e){				
				navwindow.openWindow(BizDir.ui.createGalleryPagesWindow(e.source.data));
			});
			
			view3wrapper.add(galleryImage);	
		};
		view3.add(view3wrapper);		
    }
    
    function getGallery(id){
    	var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/gallery/'+id;
		
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('GET', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();

		xhr.onload = function(data){
			Ti.API.info('fave: '+this.responseData);
			var json = JSON.parse(this.responseText);
		 	fillGallery(json.result.data);		
		};
		xhr.onerror = function(e){			
			Ti.API.info('Something Wrong ::> '+e.error);
		};
    }
    
    function getDetail(id){
    	var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/anggota/'+id;
		
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('GET', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send();

		xhr.onload = function(data){
			Ti.API.info('Detail : '+this.responseData);
			var json = JSON.parse(this.responseText);
			var result = json.result.data;
		 	addressLabel.text = result.namaKota+', '+result.namaProvinsi;
		 	addressContentLabel.text = result.alamat;
		 	phoneContentLabel.text = result.telepon;
		 	faxContentLabel.text = result.faksimili;
		 	emailContentLabel.text = result.email;
		 	webContentLabel.text = result.website;	
		 	overviewcontentLabel.text = result.deskripsi;
		 	latitude = result.latitude;
		 	longitude = result.longitude;	
		};
		xhr.onerror = function(e){			
			Ti.API.info('Something Wrong ::> '+e.error);
		};
    }
	
	getGallery(data.id);
	getDetail(data.id);
	
	tab2Indicator.hide();
	tab3Indicator.hide();
	
	slider.addEventListener('scrollend',function(){
		if(slider.currentPage == 0){
			tab1Indicator.show();
			tab2Indicator.hide();
			tab3Indicator.hide();
		} else if(slider.currentPage == 1){
			tab1Indicator.hide();
			tab2Indicator.show();
			tab3Indicator.hide();
		} else if(slider.currentPage == 2){
			tab1Indicator.hide();
			tab2Indicator.hide();
			tab3Indicator.show();
		}
	});
	
	function iPhoneinit(){
		
		// win.add(blurBG);
		// // win.add(overlayView);	
		
		win.add(headerBGView);
		win.add(headerView);
		win.add(verifikasiIcon);
		win.add(slider);
	}
	
	win.addEventListener('open', function(){
		BizDir.winisOpen = false;
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
			text:data.nama,
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