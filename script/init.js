$(function() {
		stopDefaultContextMenu();

		// load login.js and lockscreen.js
		login.init(function() {
			lockscreen.init(function() {
				setTimeout(bootManager.destroy, 2000);
			});
		});
});

//bootManager.init();


function stopDefaultContextMenu() {
	$( "body" ).on("contextmenu", function(evt) {
		options.init(evt);
		return false;
	});
}