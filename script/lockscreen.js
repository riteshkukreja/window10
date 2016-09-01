var lockscreen = {};
	
	lockscreen.container = "#lockscreen";
	lockscreen.wallpaper = "assest/bg-2.jpg";

	lockscreen.weekday = new Array(7);
		lockscreen.weekday[0]=  "Sunday";
		lockscreen.weekday[1] = "Monday";
		lockscreen.weekday[2] = "Tuesday";
		lockscreen.weekday[3] = "Wednesday";
		lockscreen.weekday[4] = "Thursday";
		lockscreen.weekday[5] = "Friday";
		lockscreen.weekday[6] = "Saturday";

	lockscreen.months = new Array(12);
		lockscreen.months[0]=  "January";
		lockscreen.months[1] = "February";
		lockscreen.months[2] = "March";
		lockscreen.months[3] = "April";
		lockscreen.months[4] = "May";
		lockscreen.months[5] = "June";
		lockscreen.months[6] = "July";
		lockscreen.months[7] = "August";
		lockscreen.months[8] = "September";
		lockscreen.months[9] = "October";
		lockscreen.months[10] = "November";
		lockscreen.months[11] = "December";

	lockscreen.drawContainer = function() {
		var holder = $("<div />", {
			id: "lockscreen"
		});

		$("body").append(holder);
	}

	lockscreen.drawBackground = function() {
		$(lockscreen.container).css("background-image", "url('" + lockscreen.wallpaper + "')");
		$(lockscreen.container).css("background-size", "cover");
	}

	lockscreen.drawTime = function() {
		now = new Date();

		var time = this.parseTimeString(now.getHours()) + ":" + 
	                this.parseTimeString(now.getMinutes());

		var holder = $("<span />", {
			class: 'time',
			text: time
		});

		$(lockscreen.container).append(holder);

		setTimeout(lockscreen.updateTime, 1000);
	}

	lockscreen.updateTime = function() {
		now = new Date();

		var time = lockscreen.parseTimeString(now.getHours()) + ":" + 
	                lockscreen.parseTimeString(now.getMinutes());
	    $(".time").html(time);

		setTimeout(lockscreen.updateTime, 1000);
	}

	lockscreen.parseTimeString = function(time) {
		return (time < 10 ? "0" + time : time);
	}

	lockscreen.drawDate = function() {
		now = new Date();

	     var d = lockscreen.weekday[now.getDay()] + ", " +
	     		 lockscreen.months[now.getMonth()] + " " + 
	     		 now.getDate();

		var holder = $("<span />", {
			class: 'date',
			text: d
		});

		$(lockscreen.container).append(holder);
	}

	lockscreen.destroy = function() {
		$(lockscreen.container).slideUp("fast", function() {
			$(lockscreen.container).remove();
			login.focus();
		});
	}

	lockscreen.init = function(callback) {
		lockscreen.drawContainer();
		lockscreen.drawBackground();
		lockscreen.drawTime();
		lockscreen.drawDate();

		$(lockscreen.container).click(function() {
			lockscreen.destroy();
		});

		$(document).on("keydown", function() {
			lockscreen.destroy();
		});

		// return callback on finish
		callback();
	}