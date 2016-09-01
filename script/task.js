var task = {};

task.CUSTOMSIZE = 1;
task.FULLSCREEN = 2;
task.MEDIUMSIZE = 3;
task.VERTICAL = 4;

task.name = "";
task.icon = "";
task.style = task.MEDIUMSIZE;
task.obj = "";

task.holder = {};
task.container = ".desktop";

task.classes = ["custom", "fullscreen", "medium", "vertical"];

task.active = {};

task.create = function(name, icon, style, appid, obj) {
	task.name = name;
	task.icon = icon;
	task.style = style;
	task.obj = obj;

	if(!task.isWindowExists(appid)) {
		var article = task.drawBlankWindow(appid);

		if(task.obj) {
			task.obj.init(task.holder.body);
		}

		$(task.container).append(article);
		article.draggable({
			containment: '.desktop'
		});

		article.resizable();

		// add to tasks opened
		temp = {}
		temp.data = article;
		temp.name = name;
		temp.icon = icon;
		temp.style = style;
		temp.opened = true;

		task.active[appid] = temp;

		// add to taskbar
		pinned.add(appid, task.name, task.icon, false);
		
		task.focus(appid);
	} else {
		task.show(appid);
		task.focus(appid);
	}
}

task.setStyle = function(appid, style) {
	task.active[appid].data.removeClass(task.getStyle(appid));
	
	task.active[appid].data.addClass(task.classes[style-1]);

	task.active[appid].style = style;
}

task.getStyle = function(appid) {
	for(i = 0 ; i < task.classes.length; i++)
		if(task.active[appid].data.hasClass(task.classes[i])) return task.classes[i];
	return null;
}

task.focus = function(appid) {
	$(".window").removeClass("front");
	task.hideOthers();
	task.active[appid].data.addClass("front");

	// show focus in taskbar
	pinned.focus(appid);
}

task.unfocus = function(appid) {
	task.active[appid].data.removeClass("front");

	pinned.unfocus(appid);
}

task.close = function(appid) {
	task.active[appid].data.remove();
	delete task.active[appid];

	// remove from taskbar
	pinned.setInactive(appid);
}

task.hide = function(appid) {
	task.active[appid].data.hide();
	task.active[appid].opened = false;
	task.unfocus(appid);
}

task.hideAll = function() {
	$.each( task.active, function(i, n){
	    task.hide(i);
	});
}

task.show = function(appid) {
	task.active[appid].data.show();
	task.active[appid].opened = true;
	
	task.focus(appid);
}

task.isWindowExists = function(appid) {
	return appid in task.active;
}

task.drawBlankWindow = function(appid) {
	var article = $("<div />", {
		class: 'window ' + task.classes[task.style-1],
		id: appid
	});

	var top = $("<div />", {
		class: 'top'
	});

	var iconHolder = $("<span />", {
		class: 'icon'
	});

	var img = $("<img />", {
		src: task.icon
	}).appendTo(iconHolder);

	var nameHolder = $("<span />", {
		class: 'name',
		text: task.name
	});

	var min = $("<span />", {
		class: 'min'
	});
	var max = $("<span />", {
		class: 'max'
	});
	var close = $("<span />", {
		class: 'close'
	});

	min.click(function() {
		task.hide(appid);
	});

	max.click(function() {
		if(task.getStyle(appid) == task.classes[task.FULLSCREEN-1]) {
			task.setStyle(appid, task.MEDIUMSIZE);
			article.css("left", "calc(50% - 300px)");
			article.css("top", "calc(50% - 200px)");

			article.css("width", "600px");
			article.css("height", "400px");
		}
		else {
			task.setStyle(appid, task.FULLSCREEN);
			article.css("left", "0px");
			article.css("top", "0px");

			article.css("width", "100%");
			article.css("height", "100%");
		}
	})

	close.click(function() {
		task.close(appid);
	});

	top.append(iconHolder);
	top.append(nameHolder);
	top.append(close);
	top.append(max);
	top.append(min);


	var content = $("<div />", {
		class: 'body'
	});

	article.append(top);
	article.append(content);

	article.click(function() {
		task.focus(appid);
	});

	//task.focus(appid);


	// set globals
	task.holder.name = nameHolder;
	task.holder.icon = iconHolder;
	task.holder.min = min;
	task.holder.max = max;
	task.holder.close = close;
	task.holder.body = content;
	task.holder.container = article;

	return article;
}

task.hideOthers = function() {
	options.clearMenus();
	search.hide();
	start.hide();
}

