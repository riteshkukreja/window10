var appManager = {};

// APP styles

appManager.LIST = {
	hash: 1,
	width: '100%',
	height: '35px',
	class: 'list'
};
appManager.METRO_WIDE = {
	hash: 2,
	width: '200px',
	height: '100px',
	class: 'metro_wide'
};
appManager.METRO_MEDIUM = {
	hash: 3,
	width: '100px',
	height: '100px',
	class: 'metro_medium'
};
appManager.METRO_SMALL = {
	hash: 4,
	width: '50px',
	height: '50px',
	class: 'metro_small'
};
appManager.DESKTOP = {
	hash: 5,
	width: '80px',
	height: '80px',
	class: 'desktop_icon'
};
appManager.PINNED = {
	hash: 6,
	width: '50px',
	height: '40px',
	class: 'bar_icon'
}

// APPS list

appManager.ALLAPPS = [
	{
		name: "Google Chrome",
		icon: 'assest/chrome.png',
		appid: 5,
		style: appManager.LIST,
		class: 'all_apps',
		obj: new chrome(),
		windowStyle: task.MEDIUMSIZE
	},
	{
		name: "Edge",
		icon: 'assest/edge.png',
		appid: 3,
		style: appManager.LIST,
		class: 'all_apps',
		windowStyle: task.MEDIUMSIZE
	},
	{
		name: "File Explorer",
		icon: 'assest/explorer.ico',
		appid: 4,
		style: appManager.LIST,
		class: 'all_apps',
		obj: new explorer(),
		windowStyle: task.MEDIUMSIZE
	},
	{
		name: "uTorrent",
		icon: 'assest/uTorrent.png',
		appid: 6,
		style: appManager.LIST,
		class: 'all_apps',
		windowStyle: task.MEDIUMSIZE
	},
	{
		icon: 'assest/pc.png',
		name: 'This PC',
		appid: 1,
		style: appManager.LIST,
		class: 'all_apps',
		obj: new explorer(),
		windowStyle: task.MEDIUMSIZE
	},
	{
		icon: 'assest/recycle_bin_empty.png',
		name: 'Recycle Bin',
		img_selected: 'assest/recycle_bin_full.png',
		appid: 2,
		style: appManager.LIST,
		class: 'all_apps',
		windowStyle: task.MEDIUMSIZE
	}
];

function SortByName(a, b){
  var aName = a.name.toLowerCase();
  var bName = b.name.toLowerCase(); 
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

appManager.ALLAPPS.sort(SortByName);

appManager.MOSTUSEDAPPS = [
	{
		name: "Google Chrome",
		icon: 'assest/chrome.png',
		appid: 5,
		style: appManager.LIST,
		class: 'start_most_used',
		obj: new chrome(),
		windowStyle: task.MEDIUMSIZE
	},
	{
		name: "Edge",
		icon: 'assest/edge.png',
		appid: 3,
		style: appManager.LIST,
		class: 'start_most_used',
		windowStyle: task.MEDIUMSIZE
	},
	{
		name: "File Explorer",
		icon: 'assest/explorer.ico',
		appid: 4,
		style: appManager.LIST,
		class: 'start_most_used',
		windowStyle: task.MEDIUMSIZE
	},
	{
		name: "uTorrent",
		icon: 'assest/uTorrent.png',
		appid: 6,
		style: appManager.LIST,
		class: 'start_most_used',
		windowStyle: task.MEDIUMSIZE
	}
];

appManager.OPTIONSAPPS = [
	{
		name: "Settings",
		icon: 'assest/settings.png',
		style: appManager.LIST,
		class: 'start_option',
		appid: 7,
		windowStyle: task.MEDIUMSIZE
	},
	{
		name: "Power",
		icon: 'assest/shutdown.svg',
		style: appManager.LIST,
		class: 'start_option',
		task: function() {
			shutdown.init();
			home.destroy();
		}
	},
	{
		name: "All Apps",
		icon: 'assest/start.png',
		style: appManager.LIST,
		class: 'start_option',
		task: function() {
			start.toggleApps();
		}
	}
];

appManager.PINNEDAPPS = [
	{
		icon: 'assest/edge.png',
		name: 'Edge',
		appid: 3,
		active: false,
		style: appManager.PINNED,
		windowStyle: task.MEDIUMSIZE
	},
	{
		icon: 'assest/explorer.ico',
		name: 'File Explorer',
		appid: 4,
		active: false,
		style: appManager.PINNED,
		windowStyle: task.MEDIUMSIZE
	},
	{
		icon: 'assest/chrome.png',
		name: 'Google Chrome',
		appid: 5,
		active: false,
		obj: new chrome(),
		style: appManager.PINNED,
		windowStyle: task.MEDIUMSIZE
	}
];

appManager.DESKTOPAPPS = [
	{
		icon: 'assest/pc.png',
		name: 'This PC',
		appid: 1,
		style: appManager.DESKTOP,
		windowStyle: task.MEDIUMSIZE
	},
	{
		icon: 'assest/recycle_bin_empty.png',
		name: 'Recycle Bin',
		img_selected: 'assest/recycle_bin_full.png',
		appid: 2,
		style: appManager.DESKTOP,
		windowStyle: task.MEDIUMSIZE
	}
];

appManager.METROAPPS = [
	[
		{
			name: "Settings",
			icon: 'assest/settings.png',
			style: appManager.METRO_SMALL,
			appid: 1,
			windowStyle: task.MEDIUMSIZE,
			class: 'start_metro'
		},
		{
			name: "Power",
			icon: 'assest/shutdown.svg',
			style: appManager.METRO_SMALL,
			appid: 1,
			windowStyle: task.MEDIUMSIZE,
			class: 'start_metro'
		},
		{
			name: "All Apps",
			icon: 'assest/start.png',
			style: appManager.METRO_SMALL,
			appid: 1,
			windowStyle: task.MEDIUMSIZE,
			class: 'start_metro'
		},
		{
			name: "Settings",
			icon: 'assest/settings.png',
			style: appManager.METRO_SMALL,
			appid: 1,
			windowStyle: task.MEDIUMSIZE,
			class: 'start_metro'
		},
		{
			name: "Power",
			icon: 'assest/shutdown.svg',
			style: appManager.METRO_SMALL,
			appid: 1,
			windowStyle: task.MEDIUMSIZE,
			class: 'start_metro'
		}
	], 
	[
		{
			name: "Settings",
			icon: 'assest/settings.png',
			style: appManager.METRO_MEDIUM,
			appid: 1,
			windowStyle: task.MEDIUMSIZE,
			class: 'start_metro'
		},
		{
			name: "Power",
			icon: 'assest/shutdown.svg',
			style: appManager.METRO_MEDIUM,
			appid: 1,
			windowStyle: task.MEDIUMSIZE,
			class: 'start_metro'
		},
		{
			name: "Settings",
			icon: 'assest/settings.png',
			style: appManager.METRO_MEDIUM,
			appid: 1,
			windowStyle: task.MEDIUMSIZE,
			class: 'start_metro'
		},
		{
			name: "Settings",
			icon: 'assest/settings.png',
			style: appManager.METRO_MEDIUM,
			appid: 1,
			windowStyle: task.MEDIUMSIZE,
			class: 'start_metro'
		},
		{
			name: "All Apps",
			icon: 'assest/start.png',
			style: appManager.METRO_WIDE,
			appid: 1,
			windowStyle: task.MEDIUMSIZE,
			class: 'start_metro'
		}
	]
];

appManager.SIDEBARAPPS = [
	{
		icon: 'assest/battery.png',
		name: 'Battery',
		task: function() {
			
		}
	},
	{
		icon: 'assest/wifi.ico',
		name: 'Wifi',
		task: function() {
			
		}
	},
	{
		icon: 'assest/volume.png',
		name: 'Sound',
		task: function() {
			
		}
	},
	{
		icon: 'assest/notification.png',
		name: 'Notification',
		task: function() {
			
		}
	}
];

appManager.ADDITIONS = {
	BACK: {
		name: "Back",
		icon: 'assest/start.png',
		style: appManager.LIST,
		class: 'start_back',
		task: function() {
			start.toggleApps();
		}
	}
};

// APP methods

appManager.init = function(obj) {
	return appManager.draw(obj);
}

appManager.getStyle = function(obj) {
	return obj.style.class;
}

appManager.find = function(name) {
	if(name != '') {
		name = name.toUpperCase();
		result = [];
		for(i = 0 ; i < appManager.ALLAPPS.length; i++) {
			if(appManager.ALLAPPS[i].name.toUpperCase().indexOf(name) >= 0) {
				result.push(appManager.ALLAPPS[i]);
			}
		}
		return result;
	} else return false;
}

appManager.draw = function(obj) {
	var holder = $("<div />", {
		class: 'app ' + appManager.getStyle(obj) + ' ' + obj.class,
		width: obj.style.width,
		height: obj.style.height
	});

	var span = $("<span />", {
		class: 'app_img_holder'
	});

	var img = $("<img />", {
		src: obj.icon
	}).appendTo(span);

	span.appendTo(holder);

	var name_holder = $("<span />", {
		class: 'app_name'		
	});

	var name = $("<span />", {
		text: obj.name
	}).appendTo(name_holder);

	holder.append(name_holder);

	if(obj.appid)
		holder.click(function() {
			task.create(obj.name, obj.icon, obj.windowStyle, obj.appid, obj.obj);
			start.hide();
		});
	else {
		holder.click(function() {
			obj.task();
		});
	}

	return holder;
}