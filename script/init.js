
// Start the boot screen
bootManager.init();

$(function() {
		stopDefaultContextMenu();

		// load login.js and lockscreen.js
		login.init(function() {
			lockscreen.init(function() {
				setTimeout(bootManager.destroy, 200);
			});
		});
});

function stopDefaultContextMenu() {
	$( "body" ).on("contextmenu", function(evt) {
		options.init(evt);
		return false;
	});
}