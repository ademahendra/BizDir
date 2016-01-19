BizDir.ui.createFaqWindow = function () {
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
			title:'FAQ',
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
			title:'FAQ',
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
	
	var faqView = Ti.UI.createScrollView({
		backgroundColor:'transparent',
		separatorColor:'transparent',
		top:0 + spacer,
		height:Ti.UI.FILL,
		contentWidth:screenwidth,
		contentHeight:'auto'
	});	
	
	var contentWrapper = Ti.UI.createView({
		top:100,
		width:screenwidth,
		height:Ti.UI.FILL,
		backgroundColor:'#fff',
		layout:'vertical'
	});
		
	var contentLabel = Ti.UI.createLabel({
	    color : '#333',
	    width:screenwidth-20,
	    font : {
	        fontSize : 14,
	        fontWeight : 'normal',
	        fontFamily:'HelveticaNeue'
	    },
	    height : Ti.UI.SIZE,
	    text : '1. Apakah Anda telah menjadi member BIZDIR di kota Anda?  Anda dapat menjadi anggota BIZDIR dengan menghubungi\n'+
				'2. Bagaimana cara meng-upload dan melakukan pembaruan data untuk Perusahaan saya?Setelah menjadi anggota BIZDIR, Anda akan mendapatkan informasi akses login melalui email.\n'+
				'3. Bagaimana cara mempromosikan usaha saya melalui aplikasi BIZDIR? Anda dapat memilih beberapa jenis iklan yang telah kami siapkan. Hubungi KADIN Indonesia atau email',
	    textAlign : 'left',
	    top:20
	});
		
	contentWrapper.add(contentLabel);	

	faqView.add(contentWrapper);
	
	function promoInit(){		
		win.add(blurBG);
		win.add(faqView);		
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
			text:'FAQ',
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