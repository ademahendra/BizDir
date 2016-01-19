
//Creation of root window. 
var rootWin = Titanium.UI.createWindow();
 
//first window to be displayed in the first load of navigation group 
var firstWindow= Titanium.UI.createWindow({
         backgroundColor : 'green',    //background color of the window
         barColor    : 'grey',  //color of the navigation bar is grey color
         title : 'First Window'         
  });
 
//second window creation
var secondWindow = Titanium.UI.createWindow({     backgroundColor: 'red',             // background color of the window
    barColor            : 'purple',         //color of the navigation bar will be purple     
    title: 'Second Window'
});
 
//Creating a navigation Group
var nav = Titanium.UI.iPhone.createNavigationGroup({    
	window: firstWindow           //first window is added to the nav group
});
//navigation group is added to the root window 
rootWin.add(nav);
//Opening the root window 
rootWin.open();
 
//create a button on the navigation bar for the first window
var navigationBtn = Titanium.UI.createButton({   
	title: 'Next',              //title of the button   
	width: 30,                //button width   
	right: 10,                 //margin from right   
	height: 30,               // height of the button   
	top: 10                    //margin from top 
});
 
//button is added to the navigation bar nav.add(navigationBtn );
 
//click event for navigatoin button
navigationBtn.addEventListener('click', function(){ nav.open(secondWindow , {animated : true}); });
 
//navigationBtn will be visible in the first window 
firstWindow.addEventListener('focus', function(){ navigationBtn .visible = true; });
 
//changing the button visibility in the second window 
secondWindow.addEventListener('focus', function(){
//navigationBtn will not be visible for second window 
	navigationBtn.visible = false; 
});
