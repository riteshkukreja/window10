var shutdown = {};

shutdown.icon = "assest/white_circle_loader.gif";
shutdown.text = "Shutting Down";

shutdown.holder;
shutdown.container = "body";

shutdown.init = function() {
	shutdown.drawContainer();
	shutdown.addData();

	setTimeout(shutdown.destroy, 5000);
}

shutdown.drawContainer = function() {
	shutdown.holder = $("<div />", {
		class: 'shutdown_holder'
	});

	$(shutdown.container).append(shutdown.holder);
}

shutdown.addData = function() {
	var holder = $("<div />", {
		class: 'shutdown_details'
	});

	var img = $("<img />", {
		class: 'shutdown_loading',
		src: shutdown.icon
	}).appendTo(holder);

	var title = $("<span />", {
		class: 'shutdown_text',
		text: shutdown.text
	}).appendTo(holder);

	shutdown.holder.append(holder);
}

shutdown.destroy = function() {
	$(shutdown.holder).fadeOut("slow", function() {
		$(shutdown.holder).remove();
	});

	$(shutdown.container).css("background", "#000");
}