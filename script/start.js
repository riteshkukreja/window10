var start = {};

start.user = {
	name: "Ritesh Kukreja",
	icon: 'assest/user-1.jpg',
	class: 'start_user',
	style: appManager.LIST
};

start.holder;
start.container = "#window";

start.drawHolder = function() {
	start.holder = $("<div />", {
		class: 'start_holder'
	});

	var bg = $("<div />", {
		class: 'start_holder_background'
	});

	var holder = $("<div />", {
		id: 'start_holder'
	});

	holder.append(bg);
	holder.append(start.holder);

	$(start.container).append(holder);
}

start.drawUser = function() {
	var holder = $("<div />", {
		class: 'start_user_holder'
	});
	holder.append(appManager.init(start.user));
	start.holder.append(holder);
}

start.drawMostRecent = function() {
	var holder = $("<div />", {
		class: 'start_most_recent_holder'
	});
	for(i = 0 ; i < appManager.MOSTUSEDAPPS.length; i++) {
		holder.append(appManager.init(appManager.MOSTUSEDAPPS[i]));
	}

	start.holder.append(holder);
}

start.drawAllApps = function() {
	var holder = $("<div />", {
		class: 'start_all_apps_holder'
	});

	var app_holder = $("<div />", {
		class: 'apps_holder'
	});

	for(i = 0 ; i < appManager.ALLAPPS.length; i++) {
		app_holder.append(appManager.init(appManager.ALLAPPS[i]));
	}

	holder.append(app_holder);

	// add back button to return back
	holder.append(appManager.init(appManager.ADDITIONS.BACK));

	start.holder.append(holder);
}

start.drawSettings = function() {
	var holder = $("<div />", {
		class: 'start_options_holder'
	});
	for(i = 0 ; i < appManager.OPTIONSAPPS.length; i++) {
		holder.append(appManager.init(appManager.OPTIONSAPPS[i]));
	}

	start.holder.append(holder);
}

start.drawMetro = function() {
	var holder = $("<div />", {
		class: 'start_metro_holder'
	});
	for(j = 0 ; j < appManager.METROAPPS.length; j++) {
		var c = $("<div />", {
			class: 'start_metro_block'
		});
		for(i = 0 ; i < appManager.METROAPPS[j].length; i++) {
			c.append(appManager.init(appManager.METROAPPS[j][i]));
		}

		holder.append(c);
	}

	start.holder.append(holder);
}

start.init = function() {
	start.drawHolder();
	start.drawUser();
	start.drawMostRecent();
	start.drawSettings();
	start.drawMetro();
	start.drawAllApps();

	//start.holder.slideToggle();

}

start.toggle = function() {
	//start.holder.slideToggle(100);
	if(!start.holder.hasClass('active')) {
		start.holder.addClass('active');
		start.holder.removeClass('hide');

		start.hideOthers();
		search.focus();
	} else {
		start.holder.addClass('hide');
		start.holder.removeClass('active');

		start.hideApps();
	}
}

start.hide = function() {
	if(start.holder.hasClass('active')) {
		start.holder.addClass('hide');
		start.holder.removeClass('active');

		start.hideApps();
	}
}

start.hideOthers = function() {
	options.clearMenus();
	search.hide();
}

start.toggleApps = function() {
	var holder = $('.start_all_apps_holder');
	if(!holder.hasClass('active')) {
		holder.addClass('active');
		holder.removeClass('hide');

		$('.start_options_holder').hide('slide',{direction:'right'},200);
		$('.start_most_recent_holder').hide('slide',{direction:'right'},200);
		$('.start_user_holder').hide('slide',{direction:'right'},200);

		holder.show('slide',{direction:'left'},200);

	} else {
		holder.addClass('hide');
		holder.removeClass('active');

		$('.start_options_holder').show('slide',{direction:'right'},200);
		$('.start_most_recent_holder').show('slide',{direction:'right'},200);
		$('.start_user_holder').show('slide',{direction:'right'},200);

		holder.hide('slide',{direction:'left'},200);
	}
}

start.hideApps = function() {
	var holder = $('.start_all_apps_holder');
		
		holder.addClass('hide');
		holder.removeClass('active');

		$('.start_options_holder').show('slide',{direction:'right'},200);
		$('.start_most_recent_holder').show('slide',{direction:'right'},200);
		$('.start_user_holder').show('slide',{direction:'right'},200);

		holder.hide('slide',{direction:'left'},200);
}