var options = {};

options.items = [
	/*{
		name: '',
		action: ''
	}*/
];

options.container = "#window";
options.holder;
options.width = 200;
options.isActive = false;

options.getMousePosition = function(evt) {
	// get user click position
	var e = e || evt || window.event;

	return {
		x: e.pageX,
		y: e.pageY
	};
}

options.setItems = function(itemList) {
	options.items = itemList;
}

options.createHolder = function() {
	if(options.holder) return;
	options.holder = $("<div />", {
		class: 'options'
	});

	$(options.container).append(options.holder);
}

options.createMenu = function(evt, additional) {
	var menu = $("<div />", {
		class: 'menu ' + (additional ? 'second': '')
	});

	// set position
	options.setPosition(evt, menu, additional);

	// add childrens items
	for(i = 0 ; i < options.items.length; i++) {
		options.createMenuItem(options.items[i], menu);
	}

	$(options.holder).append(menu);
}

options.setPosition = function(evt, holder, additional) {
	var pos = options.getMousePosition(evt);

	if(!additional) {
		holder.css("top", pos.y);
		holder.css("left", pos.x);
	} else {
		holder.css("top", pos.y + 10);
		holder.css("left", pos.x + 150);
	}
}

options.createMenuItem = function(item, holder) {
	var span = $("<span />", {
		class: 'options item ' + (item.active ? "active" : ""),
		text: item.name
	});

	// check if its  a list
	if(item.list) {
		span.addClass('list');

		span.mouseover(function(evt) {
			options.clearMenus(true);
			options.addContextMenu(evt, true);

		});

		span.mouseout(function(evt) {
			options.clearMenus(true);

		});

	} else {
		span.click(function(evt) {
			// perform action
			item.action(evt);
		});
	}

	holder.append(span);
}

options.clearMenus = function(additional) {
	if(additional) {
		$('.menu.second').remove();
	} else {
		if(options.holder)
			options.holder.html('');
		options.isActive = false;
	}
}

options.hideOthers = function() {
	start.hide();
	search.hide();
}

options.focus = function() {
	options.hideOthers();
}

options.addContextMenu = function(evt, additional) {
	// create new context menu
	options.setItems(menuItems.HOME);
	options.createMenu(evt, additional);

	evt.preventDefault();
}

options.init = function(evt) {
	// create holder for menus
	options.createHolder();

	// remove previous context menus
	options.clearMenus(false);

	options.addContextMenu(evt, false);	

	options.isActive = true;

	$(options.container).click(function() {
		options.clearMenus(false);
	});
}
