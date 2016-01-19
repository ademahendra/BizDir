(function() {
	if (Titanium.Platform.osname == 'ipad'){
		BizDir.ui = {
			device:'ipad',
			screenwidth:Ti.Platform.displayCaps.getPlatformWidth,
			screenheight:Ti.Platform.displayCaps.getPlatformHeight
		};
	} else if(BizDir.isAndroid()){
		BizDir.ui = {
			device:'android',
			screenwidth:Ti.Platform.displayCaps.getPlatformWidth,
			screenheight:Ti.Platform.displayCaps.getPlatformHeight
		};
	} else {
		BizDir.ui = {
			device:'iphone',
			screenwidth:Ti.Platform.displayCaps.getPlatformWidth,
			screenheight:Ti.Platform.displayCaps.getPlatformHeight
		};
	}
	
	// if (BizDir.isAndroid()) {
		// BizDir.ui.backgroundSelectedProperty = 'backgroundSelected';
	// } else {
		// BizDir.ui.backgroundSelectedProperty = 'selectedBackground';
	// }
// 	
	// BizDir.extend(BizDir.ui, {
		// backgroundSelectedColor: '#999',
		// tabBarHeight: 36
	// });
	
	BizDir.ui.createHeaderRow = function(title) {
		var headerRow = Ti.UI.createTableViewRow({
	    	classname: 'header_row',
	    	height:26,
	    	backgroundImage: 'pages/timebreak_gray@2x.png',
	    	selectedBackgroundImage:'pages/timebreak_gray@2x.png',
	    	touchEnabled: false
	    });
	    var headerLabel = Ti.UI.createLabel({
	    	text: title,
	    	color: '#fff',
	    	font: {
	    		fontSize:16,
	    		fontWeight:'bold'	
	    	},
	    	left: 10,
	    	touchEnabled: false
	    });
	    headerRow.add(headerLabel);
	    
	    return headerRow;
	};
	
	BizDir.ui.createTabbedScrollableView = function(params) {
		// Set configuration variables and defaults is necessary
		var data = params.data || [];
		var tabBarHeight = params.tabBarHeight || 36;
		var width = params.width || Ti.Platform.displayCaps.platformWidth;
		var images = {
			selected: 'images/buttonbar/button2_selected.png',
			unselected: 'images/buttonbar/button2_unselected_shadow.png',
			unselectedLS: 'images/buttonbar/button2_unselected_shadowL.png',
			unselectedRS: 'images/buttonbar/button2_unselected_shadowR.png',
		};
		var font = params.font || {fontSize: 14, fontWeight: 'bold'};
		var item, backgroundImage, tabView, tabLabel, scrollable, i;
		
		// Start creating the TabbedScrollableView
		var container = Ti.UI.createView();
		var tabbedBarView = Ti.UI.createView({
			top: 0,
            backgroundColor: params.backgroundColor || '#555',
            height: tabBarHeight
        });
        var tabbedBar = Ti.UI.createView({
            top: 0,
            backgroundColor: '#000',
            height: tabBarHeight,
            width: width
        });
        
        for (i = 0; i < data.length; i++) {
        	item = data[i];

        	// set the default state of the tab bar images
        	if (i == 0) {
        		backgroundImage = images.selected;
        	} else if (i == 1) {
        		backgroundImage = images.unselectedLS;
        	} else {
        		backgroundImage = images.unselected;
        	}
        	
        	// create each tab bar button
            tabView = Ti.UI.createView({
                backgroundImage: backgroundImage,
                height: tabBarHeight,
                left: i * (width / data.length),
                right: width - ((parseInt(i) + 1) * (width / data.length)),
                index: i
            });
            tabLabel = Ti.UI.createLabel({
                text: item.title,
                textAlign: 'center',
                color: '#fff',
                height: 'auto',
                touchEnabled: false,
                font: font
            });

			// adjust images and scroll ScrollableView on tab bar clicks
            tabView.addEventListener('click', function (e) {
            	var index = e.source.index;
            	for (var j = 0; j < data.length; j++) {
            		if (index == j) {
            			data[j].tabView.backgroundImage = images.selected;
            		} else if (index-1 == j && data[index-1]) {
            			data[j].tabView.backgroundImage = images.unselectedRS;
            		} else if (index+1 == j && data[index+1]) {
            			data[j].tabView.backgroundImage = images.unselectedLS;
            		} else {
            			data[j].tabView.backgroundImage = images.unselected;
            		}	
            	}

				scrollable.scrollToView(data[index].view);
            });

			// layout the tabbed scrollableview
            tabView.add(tabLabel);
            tabbedBar.add(tabView);
            item.tabView = tabView;
        }
        
        scrollable = Ti.UI.createScrollableView({
            showPagingControl: false,
            backgroundColor: '#000000',
            top: tabBarHeight,
            views: (function() {
            	var views = [];
            	for (var j = 0; j < data.length; j++) {
            		views.push(data[j].view);	
            	}
            	return views;
            })()
        });
        scrollable.addEventListener('scroll', function (e) {
            if (e.view) {
                data[e.currentPage].tabView.fireEvent('click');
            }
        });
        
        container.add(scrollable);
        tabbedBarView.add(tabbedBar);
        container.add(tabbedBarView);

        return container;
	};
	
	BizDir.ui.CustomTabBar = function(settings) {
		var tabBarItems = [];
		var icontabBarItems = [];
		var labeltabBarItems = [];
		var	tabCurrent = 0;
		
		var resetTabs = function() {
			for(var i = 0; i < icontabBarItems.length; i++) {
				icontabBarItems[i].image = icontabBarItems[i].backgroundImage;
				tabBarItems[i].backgroundColor = settings.backgroundColor;
			}
		};
		// settings.tabBar.setTabHeight = 0;
		var assignClick = function(tabItem) {
			tabItem.addEventListener('click', function(e) {
				// Just fetching the 'i' variable from the loop
				
				var pos = e.source.pos;
				Ti.API.info(pos);
				
				
				if (tabCurrent == pos) {
				// TODO
				// Change back to root window, like the native tab action.
				     return false;
				}	
			
				// Switch to the tab associated with the image pressed
				settings.tabBar.tabs[pos].active = true;
				tabCurrent = pos;
				// Reset all the tab images
				resetTabs();				
				// Set the current tab as selected
				icontabBarItems[pos].image = settings.imagePath + settings.items[pos].selected;
				tabBarItems[pos].backgroundColor = settings.activeBackgroundColor;	
			});
		};
		
		// Create the container for our tab items
		var customTabBar = Ti.UI.createWindow({
			height: settings.height,
			bottom: 0,	
			width:settings.tabWidth	
		});
		
		for(var i = 0; i < settings.items.length; i++) {
			// Go through each item and create an imageView
			tabBarItems[i] = Titanium.UI.createView({
			// background is the default image
				backgroundColor: settings.backgroundColor,				
				width: settings.items[i].width,
				height: settings.height,
				
				left: settings.items[i].width * i
			});
			
			icontabBarItems[i] = Titanium.UI.createImageView({
				backgroundImage: settings.imagePath + settings.items[i].image,				
				width: 30,
				height: 30,	
				top:3							
			});
			
			labeltabBarItems[i] = Titanium.UI.createLabel({
				color:'#fff',
				text:settings.items[i].title,
				bottom:3,
				font:{fontSize:11,fontWeight:'normal',fontFamily:'HelveticaNeueBold'},
				color:'#fff',
			});
			
			tabBarItems[i].add(icontabBarItems[i]);
			tabBarItems[i].add(labeltabBarItems[i]);
			
			// Pass the item number (used later for changing tabs)
			tabBarItems[i].pos = i;
			icontabBarItems[i].pos = i;
			labeltabBarItems[i].pos = i;
			assignClick(tabBarItems[i]);
			assignClick(icontabBarItems[i]);
			assignClick(labeltabBarItems[i]);
			
			// Add to the container window
			customTabBar.add(tabBarItems[i]);
		}
		
		// Display the container and it's items
		customTabBar.open();
		
		// Set the first item as current :)
		resetTabs();
		
		icontabBarItems[0].image = settings.imagePath + settings.items[0].selected;
		tabBarItems[0].backgroundColor = settings.activeBackgroundColor;
		
		return {
			hide: function() { customTabBar.hide(); },
			show: function() { customTabBar.show(); }
		};
	};
})();