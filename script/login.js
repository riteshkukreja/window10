var login = {};

	login.container = "#login";

	login.wallpaper = "assest/bg-5.jpg",
	login.profile_pic = "assest/user-1.jpg",
	login.username = "Ritesh Kukreja",
	login.email = "gmail@riteshkukreja.com",
	login.password = "12345",

	login.shutdown_icon = "assest/shutdown.svg",
	login.wifi_icon = "assest/wifi.png",
	login.loading_icon = "assest/white_circle_loader.gif",
	login.pass_icon = "assest/see_pass.png",
	login.help_icon = "assest/help.svg";

	login.input;


	login.drawContainer = function() {
		var holder = $("<div />", {
			id: "login"
		});

		$("body").append(holder);
	}

	login.drawBackground = function() {
		$(login.container).css("background-image", "url('" + login.wallpaper + "')");
		$(login.container).css("background-size", "cover");
	}

	login.drawProfile = function() {
		var holder = $("<div />", {
			class: 'profile_holder'
		});

		var img = $("<img />", {
			class: 'profile_pic',
			src: login.profile_pic
		}).appendTo(holder);

		var user = $("<span />", {
			class: 'profile_user',
			text: login.username
		}).appendTo(holder);

		var user = $("<span />", {
			class: 'profile_email',
			text: login.email
		}).appendTo(holder);

		$(login.container).append(holder);
	}

	login.drawPasswordField = function() {
		var holder = $("<div />", {
			class: 'pass_holder'
		});

		var input = $("<input />", {
			class: 'pass_input',
			placeholder: 'Enter your password',
			type: 'password'
		}).appendTo(holder);

		login.input = input;

		var span = $("<span />", {
			class: 'pass_toggle'
		}).appendTo(holder);

		span.css('background-image', "url('" + login.pass_icon + "')");
		span.css("background-size", "contain");

		var submit = $("<img />", {
			class: 'pass_submit',
			src: 'assest/login.png'
		}).appendTo(holder);

		span.hide();

		span.click(login.togglePassword);

		input.on("keydown", function(e) {
			if(e.keyCode == 13) submit.click();
			span.show();
		});

		submit.click(function() {
			login.checkLogin(holder);
		});

		$(login.container).append(holder);	
	}

	login.togglePassword = function() {
		if($(".pass_input")[0].getAttribute("type") == "password") {
			$(".pass_input")[0].setAttribute("type", "text");
		} else {
			$(".pass_input")[0].setAttribute("type", "password");
		}
	}

	login.drawWelcome = function() {
		var holder = $("<div />", {
			class: 'login_welcome'
		});

		var img = $("<img />", {
			class: 'login_welcome_loading',
			src: login.loading_icon
		}).appendTo(holder);

		var span = $("<span />", {
			class: 'login_welcome_text',
			text: 'Welcome'
		}).appendTo(holder);

		$(login.container).append(holder);
	}

	login.checkLogin = function(field) {
		var pass = $(".pass_input").val();
		if(pass == login.password) {

			// remove login password filed div
			field.remove();

			// show logging in the account - welcome animation
			login.drawWelcome();

			// log in successful
			login.destroy();
		} else {
			//Invalid password
			login.drawNotification("failed", "Try 12345");
		}

		$(".pass_input").val("");
	}

	login.drawNotification = function(error, msg) {
		var holder = $("<span />", {
			class: 'notification ' + error,
			text: msg
		});

		setTimeout(function() {
			holder.remove();
		}, 5000);

		$(login.container).append(holder);	
	}

	login.drawIcons = function() {
		var holder = $("<div />", {
			class: 'icons_bottom'
		});

		login.drawIcon('icon_help', login.help_icon, holder);
		login.drawIcon('icon_wifi', login.wifi_icon, holder);
		login.drawIcon('icon_shutdown', login.shutdown_icon, holder);

		$(login.container).append(holder);
	}

	login.drawIcon = function(classname, src, holder) {
		var span = $("<span />", {
			class: classname
		});

		var help = $("<img />", {
			src: src
		}).appendTo(span);

		holder.append(span);
	}

	login.destroy = function() {
		home.init(function() {
			$(login.container).fadeOut("slow", function() {
				$(login.container).remove();
			});
		});
	}

	login.focus = function() {
		login.input.focus();
	}

	login.init = function(callback) {
		login.drawContainer();
		login.drawBackground();
		login.drawProfile();
		login.drawPasswordField();
		login.drawIcons();

		// return callback on finish
		callback();
	}