var Sample = {};
Sample.chrome = [];
var chrome = function() {
	// create a frame and show page from search.js
	this.tabs = [];
	this.tagged = [];
	this.currentTab = 0;

	this.controls_left_icons = [
		{
			icon: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_chevron_left_black_24px.svg',
			name: 'Back',
			task: function() {

			}
		},
		{
			icon: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_chevron_right_black_24px.svg',
			name: 'Forward',
			task: function() {

			}
		},
		{
			icon: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_rotate_right_black_24px.svg',
			name: 'Reload',
			task: function() {

			}
		},
	];

	this.controls_right_icons = [
		{
			icon: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_menu_black_24px.svg',
			name: 'Settings',
			task: function() {

			}
		}
	];

	this.container = "";
	this.holder = '';
	this.view = '';
}

var Website = function(name, url) {
	this.name = name;
	this.url = this.parse(url);
}

Website.prototype.parse = function(url) {
	// Check for search result
	if(url.split(" ").length > 1 || !url.match(/[a-zA-Z_]\.[a-zA-Z]{2,}/)) {
		// searching google
		url = encodeURI(url);
		url = "https://duckduckgo.com/?q=" + url;
	} else {
		if(url.substr(0, 7) != 'http://' && url.substr(0, 8) != 'https://') 
			url = "http://" + url;
	}
	return url;
}

chrome.prototype.openTab = function(tabID) {
	if(typeof this.tabs[tabID] != 'undefined') {
		// tab exists
		this.currentTab = tabID;
	}
}

chrome.prototype.newTab = function() {
	var tab = {};
	tab.view = this.buildView();
	tab.url = "home";

	this.tabs.push(tab);

	// add to view
}

chrome.prototype.openWebsite = function(tabID, site) {

	this.tabs[tabID].view.attr("src", site.url);
	this.tabs[tabID].url = site;
}

chrome.prototype.closeTab = function(tabID) {
	this.tabs.pop(tabID);

	// Remove from view
}

chrome.prototype.setContainer = function(con) {
	this.container = con;
}

chrome.prototype.buildHolder = function() {
	this.holder = $("<div />", {
		class: 'chrome_container'
	});

	$(this.container).append(this.holder);
}

chrome.prototype.buildTopbar = function() {
	var holder = $("<div />", {
		class: 'chrome_topbar'
	});

	/************** Page Navigation Controls ******************/
	var controls = $("<div />", {
		class: 'chrome_topbar_leftcontrols'
	});

	for(i = 0 ; i < this.controls_left_icons.length; i++) {
		this.drawControl(this.controls_left_icons[i], controls);
	}

	holder.append(controls);

	/****************** Page Address Bar ********************/
	var address = $("<div />", {
		class: 'chrome_topbar_address_bar'
	});

	var input = $("<input />", {
		type: 'text',
		placeholder: 'Enter a URL'
	}).appendTo(address);

	var self = this;
	input.on("keyup", function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) { //Enter keycode
		    self.openWebsite(self.currentTab, new Website("", input.val()));
		    input.val(Website.parse(input.val()));
		}
	});

	holder.append(address);

	/****************** Right Controls ********************/
	var setting = $("<div />", {
		class: 'chrome_topbar_rightcontrols'
	});

	for(i = 0 ; i < this.controls_right_icons.length; i++) {
		this.drawControl(this.controls_right_icons[i], setting);
	}

	holder.append(setting);

	/******************** Append to top bar **************/

	this.holder.append(holder);
}

chrome.prototype.drawControl = function(control, holder) {
	var span = $("<span />", {
		class: 'chrome_topbar_controls_icon'
	});

	var img = $("<img />", {
		src: control.icon,
		alt: control.name
	}).appendTo(span);

	span.click(control.task);

	holder.append(span);
}

chrome.prototype.buildView = function() {
	this.view = $("<iframe />", {
		class: 'chrome_website_view',
		name: 'chrome_view',
		src: 'http://www.chess.com'
	});

	$(this.holder).append(this.view);

	return this.view;
}

chrome.prototype.init = function(con) {
	this.setContainer(con);
	this.buildHolder();
	this.buildTopbar();
	this.newTab();

	Sample.chrome.push(this);
}
