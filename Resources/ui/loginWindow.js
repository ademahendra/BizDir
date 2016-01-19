BizDir.ui.createLoginWindow = function () {
	var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	var isloading = false;	
	var page = 0;
	
	if(BizDir.isOS7()){
		var win = Ti.UI.createWindow({
			width:screenwidth,
			top:0,
			height:screenheight,
			title:'News',
			backgroundColor: '#fff',
	        barColor: '#1e5c69',
	        tintColor:"#333",
	        navBarHidden:false,
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
		});
	};
	
	function sendLogin(email, password){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/member/login';
		var params = {
			'email' : email,
			'password' : password
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
				Ti.App.Properties.setString('uid', json.result.id);
				Ti.App.Properties.setString('name', json.result.name);
				Ti.App.fireEvent('doneLogin');
				win.close();
				window.open();
			}			
		};
		
		xhr.onerror = function(e){
			Ti.API.info('Something Wrong ::> '+e.error);
			alert('Invalid username or password!');
		};
	}
	
	
	
	function sendRegister(email, password, name){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = 'http://www.bizdir.id/v2/member/register';
		var params = {
			'email' : email,
			'password' : password,
			'name':name
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
				// Ti.App.Properties.setString('uid', json.result.id);
				alert('User create successfully, please check your email to activate the account');
			}			
		};
		
		xhr.onerror = function(e){
			alert('Registration Failed');
			Ti.API.info('Something Wrong ::> '+e.error);
		};
	}
	
	function loginForm(){
		var container = Ti.UI.createView({
			width:screenwidth,
			height:screenheight,
			backgroundColor:'#fff',
			layout:'vertical',
			top:0
		});
		
		var logoBizDir = Ti.UI.createImageView({
			width:95,
			height:100,
			image:'images/logo_bizdir.png',
			hires:true,
			top:20,
		});
		
		var inputEmail = Ti.UI.createTextField({
			left:10,
			right:10,
			top:20,
			height:40,
			backgroundColor:'#fff',
			borderColor:'#333',
			borderRadius:5,
			color:'#333',
			hintText:'Email Address',
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		});
		
		var inputPassword = Ti.UI.createTextField({
			left:10,
			right:10,
			top:20,
			height:40,
			passwordMask:true,
			backgroundColor:'#fff',
			borderColor:'#333',
			borderRadius:5,
			color:'#333',
			hintText:'Password',
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
		});
		
		var buttonLogin = Ti.UI.createButton({
			title:'Login',
			left:10,
			right:10,
			top:20,
			height:40,
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			color:'#333',
			backgroundColor:'yellow'
		});
		
		var regWrapper = Ti.UI.createView({
			width:screenwidth,
			height:40,
			top:20,
			backgroundColor:'transparent'
		});
		
			var labelNot = Ti.UI.createLabel({
				text:'Not a Member?',
				width: screenwidth / 2,
				left:10,
				color:'#333'
			});
			
			var regBtn = Ti.UI.createButton({
				width: screenwidth / 2,
				right:10,
				height:40,
				style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				color:'#fff',
				backgroundColor:'#1e5c69',
				font:{fontSize:14,fontWeight:'normal',fontFamily:'HelveticaNeue'},
				title:'Register'
			});
		
		regWrapper.add(labelNot);
		regWrapper.add(regBtn);
		
		var labelForgot = Ti.UI.createLabel({
			text:"I can't access my account",
			width: screenwidth / 2,
			left:10,
			color:'#1b636f'
		});
		
		container.add(logoBizDir);
		container.add(inputEmail);
		container.add(inputPassword);
		container.add(buttonLogin);
		container.add(regWrapper);
		container.add(labelForgot);
		
		regBtn.addEventListener('click', function(){
			registerForm.show();
			loginForm.hide();
			forgotForm.hide();
		});
		
		labelForgot.addEventListener('click', function(){
			registerForm.hide();
			loginForm.hide();
			forgotForm.show();
		});
		
		buttonLogin.addEventListener('click', function(){
			var email = inputEmail.value;
			var password = inputPassword.value;
			if(email != '' && password != ''){
				sendLogin(email, password);
			} else {
				alert('Please input Username and Password!');
			}
		});
		
		inputEmail.addEventListener('return', function(){
			inputPassword.focus();
		});
		
		inputPassword.addEventListener('return', function(){
			var email = inputEmail.value;
			var password = inputPassword.value;
			if(email != '' && password != ''){
				sendLogin(email, password);
			} else {
				alert('Please input Username and Password!');
			}
		});
		
		return container;
	}
	
	function registerForm(){
		var container = Ti.UI.createView({
			width:screenwidth,
			height:screenheight,
			top:0,
			backgroundColor:'#fff',
			layout:'vertical'
		});
		
		var headerView = Ti.UI.createView({
			width:screenwidth,
			height:60,
			backgroundColor:'#1e5c69',
			hires:true,
			top:0,			
		});
		
			var labelHeader = Ti.UI.createLabel({
				text:'Register',
				color:'fff',
				textAlign:'center',
				font:{fontSize:16,fontWeight:'normal',fontFamily:'HelveticaNeue'},
			});
		
		headerView.add(labelHeader);
		
		var inputName = Ti.UI.createTextField({
			left:10,
			right:10,
			top:20,
			height:40,
			backgroundColor:'#fff',
			borderColor:'#333',
			borderRadius:5,
			color:'#333',
			hintText:'Name',
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		});
		
		var inputEmail = Ti.UI.createTextField({
			left:10,
			right:10,
			top:20,
			height:40,
			backgroundColor:'#fff',
			borderColor:'#333',
			borderRadius:5,
			color:'#333',
			hintText:'Email Address',
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		});
		
		var inputPassword = Ti.UI.createTextField({
			left:10,
			right:10,
			top:20,
			height:40,
			passwordMask:true,
			backgroundColor:'#fff',
			borderColor:'#333',
			borderRadius:5,
			color:'#333',
			hintText:'Password',
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    		returnKeyType:Titanium.UI.RETURNKEY_NEXT
		});
		
		var inputRePassword = Ti.UI.createTextField({
			left:10,
			right:10,
			top:20,
			height:40,
			passwordMask:true,
			backgroundColor:'#fff',
			borderColor:'#333',
			borderRadius:5,
			color:'#333',
			hintText:'Confirm Password',
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
		});
		
		var buttonRegister = Ti.UI.createButton({
			title:'Register',
			left:10,
			right:10,
			top:20,
			height:40,
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			color:'#333',
			backgroundColor:'yellow'
		});
		
		var regWrapper = Ti.UI.createView({
			width:screenwidth,
			height:40,
			top:20,
			backgroundColor:'transparent'
		});
		
			var labelNot = Ti.UI.createLabel({
				text:'Already a Member?',
				width: screenwidth / 2,
				left:10,
				color:'#333'
			});
			
			var logBtn = Ti.UI.createButton({
				width: screenwidth / 2,
				right:10,
				height:40,
				style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				color:'#fff',
				backgroundColor:'#1e5c69',
				font:{fontSize:16,fontWeight:'normal',fontFamily:'HelveticaNeue'},
				title:'Log In'
			});
		
		regWrapper.add(labelNot);
		regWrapper.add(logBtn);
		
		container.add(headerView);
		container.add(inputName);
		container.add(inputEmail);
		container.add(inputPassword);
		container.add(inputRePassword);
		container.add(buttonRegister);
		container.add(regWrapper);
		
		logBtn.addEventListener('click', function(){
			registerForm.hide();
			loginForm.show();
			forgotForm.hide();
		});
		
		buttonRegister.addEventListener('click', function(){
			var email = inputEmail.value;
			var password = inputPassword.value;
			var repassword = inputRePassword.value;
			var name = inputName.value;
			if(email != '' && password != ''&& name != '' && repassword != '' && password == repassword){
				sendRegister(email, password, name);
			} if(password != repassword){
				alert('Wrong password confirmation!');
			} else {
				alert('Please input all field with the correct value!');
			}
		});
		
		inputEmail.addEventListener('return', function(){
			inputPassword.focus();
		});
		
		inputRePassword.addEventListener('return', function(){
			var email = inputEmail.value;
			var password = inputPassword.value;
			var repassword = inputRePassword.value;
			var name = inputName.value;
			if(email != '' && password != ''&& name != '' && repassword != '' && password == repassword){
				sendRegister(email, password, name);
			} if(password != repassword){
				alert('Wrong password confirmation!');
			} else {
				alert('Please input all field with the correct value!');
			}
		});
		
		return container;
	}	
	
	function forgotForm(){
		var container = Ti.UI.createView({
			width:screenwidth,
			height:screenheight,
			top:0,
			backgroundColor:'#fff',
			layout:'vertical'
		});
		
		var headerView = Ti.UI.createView({
			width:screenwidth,
			height:60,
			backgroundColor:'#1e5c69',
			hires:true,
			top:0,			
		});
		
			var labelHeader = Ti.UI.createLabel({
				text:'Forgot Password',
				color:'fff',
				textAlign:'center',
				font:{fontSize:16,fontWeight:'normal',fontFamily:'HelveticaNeue'},
			});
		
		headerView.add(labelHeader);
		
		var inputEmail = Ti.UI.createTextField({
			left:10,
			right:10,
			top:20,
			height:40,
			backgroundColor:'#fff',
			borderColor:'#333',
			borderRadius:5,
			color:'#333',
			hintText:'Email Address',
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		});
		
		var buttonForgot = Ti.UI.createButton({
			title:'Send',
			left:10,
			right:10,
			top:20,
			height:40,
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			color:'#333',
			backgroundColor:'yellow'
		});
		
		var regWrapper = Ti.UI.createView({
			width:screenwidth,
			height:40,
			top:20,
			backgroundColor:'transparent'
		});
		
			var labelNot = Ti.UI.createLabel({
				text:'Already a Member?',
				width: screenwidth / 2,
				left:10,
				color:'#333'
			});
			
			var logBtn = Ti.UI.createButton({
				width: screenwidth / 2,
				right:10,
				height:40,
				style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
				color:'#fff',
				backgroundColor:'#1e5c69',
				font:{fontSize:16,fontWeight:'normal',fontFamily:'HelveticaNeue'},
				title:'Log In'
			});
		
		regWrapper.add(labelNot);
		regWrapper.add(logBtn);
		
		container.add(headerView);
		container.add(inputEmail);
		container.add(buttonForgot);
		container.add(regWrapper);
		
		logBtn.addEventListener('click', function(){
			registerForm.hide();
			loginForm.show();
			forgotForm.hide();
		});
		
		buttonForgot.addEventListener('click', function(){
			var email = inputEmail.value;			
			if(email != ''){
				sendregister(email, password,name);
			} else {
				alert('Please input Email Address!');
			}
		});
		
		inputEmail.addEventListener('return', function(){
			var email = inputEmail.value;			
			if(email != ''){
				sendregister(email, password,name);
			} else {
				alert('Please input Email Address!');
			}
		});
		
		return container;
	}		
	
	var loginForm = loginForm();
	var registerForm = registerForm();
	var forgotForm = forgotForm();
	forgotForm.hide();
	registerForm.hide();
	function iPhoneinit(){
		win.add(loginForm);
		win.add(registerForm);
		win.add(forgotForm);
	}
	
	iPhoneinit();
	
	return win;
};	