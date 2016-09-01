var home = {};

	home.wallpaper = "assest/bg-2.jpg",

	home.start = {
		icon : 'assest/start.png',
		name: 'Start',
		hover: 'assest/start_hover.png'
	};
	
	home.search = {
		text: 'Search Windows',
		name: 'Search'
	};

	home.icons = appManager.DESKTOPAPPS;
	home.sidebar_icons = appManager.SIDEBARAPPS;
	
	home.container = "#window";


	home.drawContainer = function() {
		var holder = $("<div />", {
			id: "window"
		});

		$("body").append(holder);
	}

	home.drawBackground = function() {
		$(home.container).css("background-image", "url('" + home.wallpaper + "')");
		$(home.container).css("background-size", "cover");
	}

	home.changeBackground = function(wall) {
		home.wallpaper = wall;
		home.drawBackground();
	}

	home.setDesktop = function() {
		var holder = $("<div />", {
			class: 'desktop'
		});

		home.drawWindowIcons(holder);
		holder.click(function() {
			start.hide();
			search.hide();
		});

		$(home.container).append(holder);
	}

	home.drawWindowIcons = function(container) {
		var holder = $("<div />", {
			class: 'desktop_icon_holder'
		});

		for(i = 0 ; i < home.icons.length; i++) {
			var icon = home.icons[i];
			home.drawIcon(icon, holder);
		}

		container.append(holder);
	}

	home.drawIcon = function(icon, parent) {
		var child = $("<span />", {
			class: 'desktop_icon'
		});

		var img = $("<img />", {
			class: 'desktop_icon_img',
			src: icon.icon,
			alt: icon.name
		}).appendTo(child);

		var name = $("<span />", {
			class: 'desktop_icon_name',
			text: icon.name
		}).appendTo(child);

		// open task
		child.dblclick(function() {
			task.create(icon.name, icon.icon, task.MEDIUMSIZE, icon.appid);
			child.removeClass('highlight');
		});

		child.click(function() {
			child.addClass('highlight');
			setTimeout(function() {
				child.removeClass('highlight');
			}, 2000);
		});

		parent.append(child);
	}

	home.drawBottomBar = function() {
		var bar = $("<div />", {
			class: 'bottom_bar'
		});

		home.drawStart(bar);
		home.drawSearch(bar);
		
		// draw pinned apps
		pinned.init(bar);

		home.drawSidebarIcons(bar);
		home.drawDateTime(bar);

		// focus area
		home.drawFocus(bar);

		$(home.container).append(bar);
	}

	home.drawStart = function(holder) {
		var span = $("<span />", {
			class: 'start_btn',
		});

		var img = $("<img />", {
			src: home.start.icon
		}).appendTo(span);

		span.mouseenter(function() {
			$(".start_btn img")[0].setAttribute("src", home.start.hover);
		});
		span.mouseleave(function() {
			$(".start_btn img")[0].setAttribute("src", home.start.icon);
		});

		span.click(function() {
			start.toggle();
		});

		holder.append(span);
	}

	home.drawSearch = function(holder) {
		var span = $("<span />", {
			class: 'search_btn',
		});

		var img = $("<input />", {
			type: 'text',
			placeholder: home.search.text
		}).appendTo(span);

		search.input = img;

		img.click(function() {
			search.show();
		});

		img.keyup(function() {
			search.show();
			search.result(img.val());
		});

		holder.append(span);
	}

	home.drawSidebarIcons = function(holder) {
		var span = $("<span />", {
			class: 'sidebar_icon_holder',
		});

		for(i = 0 ; i < home.sidebar_icons.length; i++) {
			home.drawSidebarIcon(home.sidebar_icons[i], span);
		}

		holder.append(span);
	}

	home.drawSidebarIcon = function(icon, parent) {
		var child = $("<span />", {
			class: 'sidebar_icon'
		});

		var img = $("<img />", {
			class: 'sidebar_icon_img',
			src: icon.icon,
			alt: icon.name
		}).appendTo(child);

		parent.append(child);
	}

	home.drawDateTime = function(holder) {
		var span = $("<span />", {
			class: 'date_holder',
		});

		home.drawTime(span);
		home.drawDate(span);

		holder.append(span);
	}

	home.drawTime = function(parent) {
		now = new Date();

		var hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
		var minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
		var text = 'AM';

		if(hours >= 12) {
			text = 'PM';
		}

		if(hours > 12) hours = hours % 12;

		var time = 	hours + ":" + 
	                minutes  + " " + text;

		var holder = $("<span />", {
			class: 'home_time',
			text: time
		});

		parent.append(holder);

		setTimeout(home.updateTime, 60 * 1000);
	}

	home.updateTime = function() {
		now = new Date();

		var hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
		var minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
		var text = 'AM';

		if(hours >= 12) {
			text = 'PM';
		}

		if(hours > 12) hours = hours % 12;

		var time = 	hours + ":" + 
	                minutes  + " " + text;

	    $(".home_time").html(time);

		setTimeout(home.updateTime, 60 * 1000);
	}

	home.drawDate = function(parent) {
		now = new Date();

		var time = 	(now.getMonth()+1)  + "/" +
					now.getDate() + "/" +
	                now.getFullYear()

		var holder = $("<span />", {
			class: 'home_date',
			text: time
		});

		parent.append(holder);
	}

	home.drawFocus = function(parent) {
		var span = $('<span />', {
			class: 'home_focus'
		});

		span.click(function() {
			home.focus();
		});

		parent.append(span);
	}

	home.destroy = function() {
		$(home.container).fadeOut("slow", function() {
			$(home.container).remove();
		});
	}

	home.clearOthers = function() {
		options.clearMenus();
		search.hide();
		start.hide();
		task.hideAll();
	}

	home.focus = function() {
		home.clearOthers();
	}


	home.init = function(callback) {
		home.drawContainer();
		home.drawBackground();
		home.setDesktop();
		home.drawBottomBar();

		// External libraries
		start.init();
		search.init();

		// return callback on finish
		callback();
	}