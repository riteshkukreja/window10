var app = function(appid) {

	this.name = "";
	this.icon = "";
	this.class = "";

	this.appid = appid;
	this.style = appManager.LIST;

	// Window methods
	this.windowStyle = task.MEDIUMSIZE;

	// Set Methods

	this.setAppid = function(appid) {
		this.appid = appid;
	}

	this.setName = function(name) {
		this.name = name;
	}

	this.setIcon = function(icon) {
		this.icon = icon;
	}

	this.setClass = function(name) {
		this.class = name;
	}

	this.setStyle = function(style) {
		this.style = style;
	}

	this.setWindowStyle = function(style) {
		this.windowStyle = style;
	}


	// Get Methods

	this.getAppid = function() {
		return this.appid;
	}

	this.getName = function() {
		return this.name;
	}

	this.getIcon = function() {
		return this.icon;
	}

	this.getClass = function() {
		return this.class;
	}

	this.getStyle = function() {
		return this.style;
	}

	this.getWindowStyle = function() {
		return this.windowStyle;
	}

	// copy constructor
	this.copy = function(obj) {
		this.setAppid(obj.getAppid());
		this.setName(obj.getName());
		this.setIcon(obj.getIcon());
		this.setClass(obj.getClass());
		this.setStyle(obj.getStyle());
		this.setWindowStyle(obj.getWindowStyle());
	}

	// make app object
	this.make = function(name, icon, className) {
		this.setName(name);
		this.setIcon(icon);
		this.setClass(className);
	}

	this.fromJSON = function(obj) {
		this.setAppid(obj.appid);
		this.setName(obj.name);
		this.setIcon(obj.icon);
		this.setClass(obj.class);
		this.setStyle(obj.style);
		this.setWindowStyle(obj.windowStyle);
	}
}