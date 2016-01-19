BizDir.ui.createProfileWindow = function (data) {
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
			title:'Profile',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        navTintColor:'#fff',
	        navBarHidden:false,	        
	        // backgroundImage:BizDir.bgImage,
	        titleAttributes:{color:'#fff'}
		});	
	} else {
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'Profile',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        navBarHidden:false,
	        navTintColor:'#fff',
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
	
	navIcon.addEventListener('click', function(){
		window.toggleLeftView();
	});
	
	win.setLeftNavButton(navIcon);
	
	var spacer = 0;
	if (BizDir.ui.device == 'ipad') {
		spacer = 60;
		win.navBarHidden = true;
	}
	
	var activityIndicator = Ti.UI.createActivityIndicator({
	  color: '#333',
	  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
	  message: 'Please Wait...',
	  style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
	  height:Ti.UI.SIZE,
	  width:Ti.UI.SIZE	  
	});
	
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
    
    var scrollView = Ti.UI.createScrollView({
    	width:screenwidth,
    	height:screenheight-60,
    	top:0 + spacer,
    	contentWidth:screenwidth,
    	contentHeight:'auto',
    	backgroundColor:'#fff',
    	layout:'vertical'
    });
    
    var labelName = Ti.UI.createLabel({
		text:"Name",
		width: screenwidth-20,
		height:Ti.UI.SIZE,
		color:'#1b636f',
		top:10
	});
    
    var inputName = Ti.UI.createTextField({
		width: screenwidth-20,
		top:10,
		height:40,
		backgroundColor:'#fff',
		borderColor:'#333',
		borderRadius:5,
		color:'#333',
		hintText:'Name',
		value:Titanium.App.Properties.getString('name'),
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	});
	
	var labelEmail = Ti.UI.createLabel({
		text:"Email",
		width: screenwidth-20,
		height:Ti.UI.SIZE,
		color:'#1b636f',
		top:10
	});
    
    var inputEmail = Ti.UI.createTextField({
		width: screenwidth-20,
		top:10,
		height:40,
		backgroundColor:'#fff',
		borderColor:'#333',
		borderRadius:5,
		color:'#333',
		hintText:'Email',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Titanium.UI.KEYBOARD_EMAIL,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	});
	
	var labelPhone = Ti.UI.createLabel({
		text:"Phone",
		width: screenwidth-20,
		height:Ti.UI.SIZE,
		color:'#1b636f',
		top:10
	});
    
    var inputPhone = Ti.UI.createTextField({
		width: screenwidth-20,
		top:10,
		height:40,
		backgroundColor:'#fff',
		borderColor:'#333',
		borderRadius:5,
		color:'#333',
		hintText:'Phone Number',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Titanium.UI.KEYBOARD_NAMEPHONE_PAD,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	});
	
	var labelGender = Ti.UI.createLabel({
		text:"Gender",
		width: screenwidth-20,
		height:Ti.UI.SIZE,
		color:'#1b636f',
		top:10
	});
    
    var genderWrapper = Ti.UI.createView({
		width: screenwidth-20,
		top:10,
		height:40,		
	});
		
	var buttonObjects = [
	  {title:'Male'},
	  {title:'Female'}  
	];
	 
	var genderBb = Titanium.UI.createButtonBar({
	    labels:buttonObjects,
	    top:0,
	    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    height:40,
	    width:screenwidth-40
	});	
	
	genderBb.addEventListener("click", function(e){
	  for(var i=0;i<buttonObjects.length;i++) {
	     buttonObjects[i].enabled = (i != e.index);
	  }	  
	  Ti.API.info("You picked: " + buttonObjects[e.index].title);
	  selectedGender.text = "Selected Gender: "+buttonObjects[e.index].title;
	});
	
	var labelGender = Ti.UI.createLabel({
		text:"Gender",
		width: screenwidth-20,
		height:Ti.UI.SIZE,
		color:'#1b636f',
		top:10
	});
	
	var selectedGender = Ti.UI.createLabel({
		text:"Selected Gender: Male",
		width: screenwidth-20,
		height:Ti.UI.SIZE,
		color:'#1b636f',
		top:10
	});
   
	var labelBirthday = Ti.UI.createLabel({
		text:"Birthday",
		width: screenwidth-20,
		height:Ti.UI.SIZE,
		color:'#1b636f',
		top:10
	});
	
	var datePicker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE,
	  	minDate:new Date(1915,1,1),
	  	maxDate:new Date(2014,12,31),
	  	value:new Date(1900,1,1),
	  	top:10,
	  	width:screenwidth
	});
	
	var interest = [
		{title:'Nature Product', id:0},
		{title:'Gift Arts & Craft', id:1},
		{title:'Automotive Components', id:2},
		{title:'Chemical Products', id:3},
		{title:'Electricity & Electronics', id:4},
		{title:'Food & Beverages', id:5},
		{title:'Home, Lights & Construction', id:6},
		{title:'Jewellery, Bags & Shoes', id:7},
		{title:'Health & Beauty', id:8},
		{title:'Machine, Hardware & Tools', id:9},
		{title:'Printing, Advertising & Office', id:10},
		{title:'Raw Minerals & Energy', id:11},
		{title:'Business & Other Services', id:12},
		{title:'Sport, Toys & Hobbies', id:13},
		{title:'Apparel, Textile & Accessories', id:14}
	];
	
	var labelInterest = Ti.UI.createLabel({
		text:'Interest',
		width: screenwidth-20,
		height:Ti.UI.SIZE,
		color:'#1b636f',
		top:10
	});
	
	function removeA(arr) {
	    var what, a = arguments, L = a.length, ax;
	    while (L > 1 && arr.length) {
	        what = a[--L];
	        while ((ax= arr.indexOf(what)) !== -1) {
	            arr.splice(ax, 1);
	        }
	    }
	    return arr;
	}
	var interestArray = [];

	
	function createInterest(data){
		var labelInterest = [];
		var interestWrapper = [];
		var InterestSwitch = [];
		var lInterest = [];
		for (var i=0; i < data.length; i++) {
			interestWrapper[i] = Ti.UI.createView({
				height:40,
				top:10,
				layout:'horizontal',
				width: screenwidth-20,
				val:data[i].title,
			});
			
			InterestSwitch[i] = Ti.UI.createSwitch({
				value:false, // mandatory property for iOS
				title:data[i].title,
				width: Ti.UI.SIZE,
				height:Ti.UI.SIZE,
				left:0,
				val:data[i].title,
			});
			
			lInterest[i] = Ti.UI.createLabel({
				text:data[i].title,
				width:Ti.UI.SIZE,
				height:Ti.UI.SIZE,
				color:'#333',
				left:10,
				val:data[i].title,
			});
			
			interestWrapper[i].add(InterestSwitch[i]);
			interestWrapper[i].add(lInterest[i]);
			InterestSwitch[i].addEventListener('change', function(e){
				Ti.API.info('Arr Val: '+interestArray.toString());
				if(this.value){
					interestArray.push(e.source.val);
				} else {
					removeA(interestArray, e.source.val);
				}
				Ti.API.info('Arr Length'+interestArray.length);
			});
			scrollView.add(interestWrapper[i]);
		};	
	}	
	
	var buttonSave = Ti.UI.createButton({
		title:'Save',
		left:10,
		right:10,
		top:20,
		height:40,
		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		color:'#fff',
		backgroundColor:'#1b636f'
	});
	
	var buttonCancel = Ti.UI.createButton({
		title:'Cancel',
		left:10,
		right:10,
		top:20,
		height:40,
		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		color:'#333',
		backgroundColor:'#ccc'
	});
	
	function updateProfile(){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/member/update';
		var params = {
			'id' : Ti.App.Properties.getString('uid'),
			'name' : inputName.value,
			'email' : inputEmail.value,
			'phone': inputPhone.value,
			'birthday' : datePicker.value,
			'interest' : interestArray,
			'gender' : selectedGender.text
		};
		xhr.username = 'bizdir';
		xhr.password = 'm4Pl1x231';
		
		xhr.open('POST', apiurl);
		xhr.setRequestHeader('X_REST_USERNAME', 'bizdir');
		xhr.setRequestHeader('X_REST_PASSWORD', 'm4Pl1x231');
		xhr.send(params);
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			var json = JSON.parse(this.responseText);
			if(json.status == 1){
				alert('User Update Successfully');
			}
			activityIndicator.hide();			
		};
		
		xhr.onerror = function(e){
			alert('Update Failed');
			Ti.API.info('Something Wrong ::> '+e.error);
			activityIndicator.hide();
		};
	}
	
	buttonSave.addEventListener('click', function(){
		activityIndicator.show();
		updateProfile();
	});
	
	buttonCancel.addEventListener('click', function(){
		window.setCenterWindow(homeWindow());
	});
	
	function iPhoneinit(){
		scrollView.add(labelEmail);
		scrollView.add(inputEmail);
		scrollView.add(labelName);
		scrollView.add(inputName);
		scrollView.add(labelPhone);
		scrollView.add(inputPhone);
		scrollView.add(labelGender);
		scrollView.add(genderWrapper);
		genderWrapper.add(genderBb);
		scrollView.add(selectedGender);
		scrollView.add(labelBirthday);
		scrollView.add(datePicker);
		
		scrollView.add(labelInterest);
		createInterest(interest);
		
		scrollView.add(buttonSave);
		scrollView.add(buttonCancel);
		
		win.add(scrollView);
		
		win.add(activityIndicator);
		activityIndicator.hide();
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
			text:'Profile',
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