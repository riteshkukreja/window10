var bootManager = {};

bootManager.icon = "assest/white_circle_loader.gif";
bootManager.img = "assest/logo.png";

bootManager.holder;
bootManager.container = "body";

bootManager.init = function() {
	bootManager.drawContainer();
	bootManager.addData();	
}

bootManager.drawContainer = function() {
	bootManager.holder = $("<div />", {
		class: 'bootManager_holder'
	});

	$(bootManager.container).append(bootManager.holder);
}

bootManager.addData = function() {
	var holder = $("<div />", {
		class: 'bootManager_details'
	});

	var img = $("<img />", {
		class: 'bootManager_logo',
		src: bootManager.img
	}).appendTo(holder);

	var loader = $("<img />", {
		class: 'bootManager_loading',
		src: bootManager.icon
	}).appendTo(holder);

	bootManager.holder.append(holder);
}

bootManager.destroy = function() {
	$(bootManager.holder).fadeOut("slow", function() {
		$(bootManager.holder).remove();
	});
}