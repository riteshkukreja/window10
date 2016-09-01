var pinned = {};

pinned.apps;

pinned.opened = {};
pinned.container = "";
pinned.parent = "";

pinned.add = function(appid, name, icon, permanent) {
	if(pinned.isPermanent(appid)) {
		pinned.setActive(appid);
		return;
	}

	if(permanent) {
		// add to apps
		var obj = {
			img: icon,
			name: name,
			appid: appid,
			active: true
		};

		pinned.apps.push(obj);
	} else {
		// add to opened
		var obj = {
			icon: icon,
			name: name,
			appid: appid
		};

		pinned.opened[appid] = obj;

		pinned.opened[appid].body = pinned.drawApp(obj);
		pinned.opened[appid].body.addClass('active');
	}
}

pinned.isPermanent = function(appid) {
	for(i = 0 ; i < pinned.apps.length; i++)
		if(appid == pinned.apps[i].appid)
			return pinned.apps[i];
	return false;
}

pinned.remove = function(appid) {
	// delete closed apps
	if(!pinned.isPermanent(appid))
		pinned.opened[appid].body.remove();

	delete pinned.opened[appid];
}

pinned.setActive = function(appid) {
	// set permanent app active on click
	// get data from permanent
	var obj = {};
	for(i = 0 ; i < pinned.apps.length; i++)
		if(appid == pinned.apps[i].appid){
			obj = pinned.apps[i];
			pinned.apps[i].active = true;
			pinned.apps[i].body.addClass('active');
			break;
		}

	// set as opened
	if(obj) {
		pinned.opened[appid] = obj;
		pinned.opened[appid].body.addClass('active');
	}
}

pinned.setInactive = function(appid) {
	for(i = 0 ; i < pinned.apps.length; i++)
		if(appid == pinned.apps[i].appid){
			pinned.apps[i].active = false;
			pinned.apps[i].body.removeClass('active');
			pinned.apps[i].body.removeClass('front');
			break;
		}
	pinned.opened[appid].body.removeClass('active');
	pinned.remove(appid);
}

pinned.notify = function(appid) {
	pinned.opened[appid].body.addClass("alert");
}

pinned.notified = function(appid) {
	pinned.opened[appid].body.removeClass("alert");
}

pinned.focus = function(appid) {
	// remove focus from all apps
	$(".bar_icon").removeClass("front");

	pinned.opened[appid].body.addClass("front");
}

pinned.unfocus = function(appid) {
	pinned.opened[appid].body.removeClass("front");
}

pinned.setPermanent = function(appid) {
	var obj = pinned.opened[appid];

	pinned.add(obj.appid, obj.name, obj.icon, true);
}

pinned.removePermanent = function(appid) {
	for(i = 0 ; i < pinned.apps.length; i++)
		if(appid == pinned.apps[i].appid){
			delete pinned.apps[i];
			return ;
		}
}

pinned.drawContainer = function() {
	pinned.container = $("<span />", {
		class: 'bar_icon_holder',
	});

	$(pinned.parent).append(pinned.container);
}

pinned.drawPinnedApps = function() {

	// empty the holder
	$(pinned.container).html('');

	for(i = 0 ; i < pinned.apps.length; i++) {
		pinned.apps[i]['body'] = pinned.drawApp(pinned.apps[i]);
	}
}

pinned.drawApp = function(icon) {
	var child = $("<span />", {
		class: 'bar_icon'
	});

	var img = $("<img />", {
		class: 'icon_bar_img',
		src: icon.icon,
		alt: icon.name
	}).appendTo(child);

	// open task
	child.click(function() {
		task.create(icon.name, icon.icon, task.MEDIUMSIZE, icon.appid);
	});

	$(pinned.container).append(child);

	return child;
}

pinned.init = function(holder) {
	pinned.apps = appManager.PINNEDAPPS;

	pinned.parent = holder;
	pinned.drawContainer();
	pinned.drawPinnedApps();
}