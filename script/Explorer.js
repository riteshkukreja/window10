var explorer = function() {

	this.controls_left_icons = [
	{
		icon: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_chevron_left_black_24px.svg',
		name: 'Back',
		task: function() {

		}
	},
	{
		icon: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_chevron_right_black_24px.svg',
		name: 'Forward',
		task: function() {

		}
	},
	{
		icon: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_rotate_right_black_24px.svg',
		name: 'Reload',
		task: function() {

		}
	},
	];

	this.controls_right_icons = [
	{
		icon: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_menu_black_24px.svg',
		name: 'Settings',
		task: function() {

		}
	}
	];

	this.container = "";
	this.holder = '';
	this.view = '';
	this.fs = '';
	this.fsd = '';
	this.user = '';
}

explorer.prototype.setContainer = function(con) {
	this.container = con;
}

explorer.prototype.buildHolder = function() {
	this.holder = $("<div />", {
		class: 'explorer_container'
	});

	$(this.container).append(this.holder);
}

explorer.prototype.buildTopbar = function() {
	var holder = $("<div />", {
		class: 'explorer_topbar'
	});

	/************** Page Navigation Controls ******************/
	var controls = $("<div />", {
		class: 'explorer_topbar_leftcontrols'
	});

	for(i = 0 ; i < this.controls_left_icons.length; i++) {
		this.drawControl(this.controls_left_icons[i], controls);
	}

	holder.append(controls);

	/****************** Page Address Bar ********************/
	var address = $("<div />", {
		class: 'explorer_topbar_address_bar'
	});

	var input = $("<input />", {
		type: 'text',
		id: 'explorer_address_bar',
		placeholder: 'Enter a URL'
	}).appendTo(address);

	var self = this;
	input.on("keyup", function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) { //Enter keycode
		    self.fs.navigate(input.val());
		}
	});

	holder.append(address);

	/****************** Right Controls ********************/
	var setting = $("<div />", {
		class: 'explorer_topbar_rightcontrols'
	});

	for(i = 0 ; i < this.controls_right_icons.length; i++) {
		this.drawControl(this.controls_right_icons[i], setting);
	}

	holder.append(setting);

	/******************** Append to top bar **************/

	this.holder.append(holder);
}

explorer.prototype.drawControl = function(control, holder) {
	var span = $("<span />", {
		class: 'explorer_topbar_controls_icon'
	});

	var img = $("<img />", {
		src: control.icon,
		alt: control.name
	}).appendTo(span);

	span.click(control.task);

	holder.append(span);
}

explorer.prototype.buildView = function() {
	this.view = $("<div/>", {
		class: "explorer_view"
	});

	$(this.holder).append(this.view);
	return this.view;
}

var Permission = function(perms) {

	var permissions = {
		user: perms.substr(0, 3),
		group: perms.substr(3, 3),
		others: perms.substr(6, 3)
	};


	this.READ 		= 'r';
	this.WRITE 		= 'w';
	this.EXECUTE 	= 'x';

	var self = this;
	this.validate = function(op, user) {
		if(typeof user == "undefined" || typeof user.permClass == "undefined" || typeof permissions[user.permClass] == "undefined") return false;
		if(user.isAdmin() || permissions[user.permClass].indexOf(op) != -1) return true;
		return false;
	}
}

var User = function(name, permClass) {
	this.name = name;
	this.permClass = permClass;

	var ADMIN = false;
	var PASS = "";

	this.elevate = function(pass) {
		if(pass === PASS) ADMIN = true;
		else return false;
	}

	this.logoff = function() {
		ADMIN = false;
	}

	this.isAdmin = function() {
		return ADMIN == true;
	}
}

var File = function(name, size, type, perms, url) {
	this.name 		= name;
	this.size 		= size;
	this.type 		= type;
	this.path 		= false;
	this.parent 	= false;

	var URL 		= "data/" + url;
	var permissions = perms;

	var self = this;

	this.rename = function(name, type, user) {
		if(!permissions.validate(permissions.WRITE, user)) return false;
		this.name = name;
		this.type = type;
	}

	this.setParent = function(folder, user) {
		//if(!permissions.validate(permissions.WRITE, user)) return false;
		this.parent = folder;
		this.path = this.parent.path + this.name;
		return true;
	}

	this.getSize = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		return this.size;
	}

	this.getName = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		return this.name;
	}

	this.chmod = function(perms, user) {
		if(!permissions.validate(permissions.WRITE, user)) return false;
		permissions = perms;
	}

	this.get = function() {
		return URL;
	}
}

var Directory = function(name, childs, perms) {
	this.name 		= name;
	this.path 		= false;
	this.children 	= childs;
	this.parent 	= false;
	var permissions = perms;

	var self = this;

	this.push = function(file, user) {
		if(!permissions.validate(permissions.WRITE, user)) return false;
		if(!file.setParent(self, user)) return false;
		this.children.push(file);
		return true;
	}

	this.setParent = function(folder, user) {
		//if(!permissions.validate(permissions.WRITE, user)) return false;
		this.parent = folder;
		this.path = this.parent.path + this.name + "/";
		return true;
	}

	this.pop = function(file, RecycleBin, user) {
		if(!permissions.validate(permissions.WRITE, user)) return false;

		file = self.search(file, user);
		if(!file) return false;

		if(self != RecycleBin)
			RecycleBin.push(file, user);
		
		this.children.splice(this.children.indexOf(file), 1);
	}

	this.get = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		return this.children;
	}

	this.search = function(filename, user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		for(var i of this.children) {
			if(i.name == filename)
				return i;
		}
		return false;
	}

	this.getCount = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		return this.children.length;
	}

	this.getSize = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		var size = 0;

		for(var i of this.children)
			size += i.getSize(user);

		return size;
	}

	this.getParent = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		return this.parent;
	}

	this.rename = function(filename, user) {
		if(!permissions.validate(permissions.WRITE, user)) return false;
		return this.name = filename;
	}

	this.getName = function(user) {
		if(!permissions.validate(permissions.READ, user)) return false;
		return name;
	}

	this.chmod = function(perms, user) {
		if(!permissions.validate(permissions.WRITE, user)) return false;
		permissions = perms;
	}
}

var Stack = function() {
	var data = [];

	this.push = function(file) {
		data.push(file);
	}

	this.pop = function() {
		if(this.length() == 0) return false;

		return data.pop();
	}

	this.peek = function() {
		if(this.length() == 0) return false;

		return data[this.length()-1];
	}

	this.length = function() {
		return data.length;
	}

	this.empty = function() {
		return this.length() == 0;
	}
}

var FS = function(user) {
	var root = new Directory("Root", [], new Permission("rw-rw-rw-"));
	root.path = "/";

	var pwd = root;
	var RecycleBin = false;

	var USER = user;

	var throwEvent = function() {
		var event = new CustomEvent("reload", {
			detail: {
				time: new Date(),
			},
			bubbles: true,
			cancelable: true
		});
		document.dispatchEvent(event);
	}

	/**
	 *	Parsing the URL with respect to present working directory URL
	 *	@Param path 	- Destination URL
	 *	@Param cpath	- Source URL
	 */
	 this.parseURL = function(path, cpath) {
	 	var stack = new Stack();

	 	var array = cpath.split("/");
	 	for(var i of array) {
	 		if(i != "")
	 			stack.push(i);
	 	}

	 	array = path.split("/");
	 	for(var i of array) {
	 		switch(i) {
	 			case "..": 	var flag = stack.pop();
	 			if(!flag) return false;
	 			break;
	 			case ".": 	
	 			case "" :
	 			case " ": 	break;

	 			default: 	stack.push(i);
	 		}
	 	}

	 	return stack;
	 }

	 this.navigate = function(path) {
	 	if(path == "/") {
	 		pwd = root;
	 		return pwd;
	 	}

	 	var stack = this.parseURL(path, pwd.path);

	 	if(stack == false) return false;

		// convert stack data to array
		path = [];
		while(!stack.empty()) path.push(stack.pop());
		
		// Traverse the tree
		pwd = root;

		for(var i = path.length-1; i >= 0; i--) {
			var child = pwd.search(path[i], USER);
			if(child) pwd = child;
			else return false;
		}
		throwEvent();

		return pwd;
	}

	this.get = function() {
		return pwd.get(USER);
	}

	this.push = function(file) {
		b = pwd.push(file, USER);
		throwEvent();
		return b;
	}

	this.pop = function(file) {
		b = pwd.pop(file, RecycleBin, USER);
		throwEvent();
		return b;
	}

	this.getCount = function() {
		return pwd.getCount(USER);
	}

	this.getSize = function() {
		return pwd.getSize(USER);
	}

	this.parent = function() {
		return pwd.getParent(USER);
	}

	this.search = function(filename) {
		return pwd.search(filename, USER);
	}

	this.getName = function() {
		return pwd.getName(USER);
	}

	this.rename = function(filename) {
		return pwd.rename(filename, USER);
	}

	this.elevate = function(pass) {
		return USER.elevate(pass);
	}

	this.logoff = function() {
		return USER.logoff();
	}

	this.chmod = function(perms) {
		return pwd.chmod(perms, USER);
	}

	this.pwd = function() {
		return pwd.path;
	}

	var self = this;
	var init = function() {
		var DriveC 		= new Directory("C", [], new Permission("rw-rw-rw-"));
		
		RecycleBin 		= new Directory("Recycle Bin", [], new Permission("rw-rw-rw-"));

		self.push(DriveC);
		self.push(RecycleBin);
	}

	init();
}

var Tree = function(directory, user) {
	this.name = directory.getName(user);
	this.child = [];
	this.size = directory.getSize(user) || undefined;
	this.directory = directory;

	if(typeof this.directory.size == "undefined") {
		for(var i of this.directory.get(user))
			this.child.push(new Tree(i, user));
	} else this.child = undefined;
}

var CLASS = {
	"USER": 	new Permission("rw-rw-rw-"),
	"GROUP": 	new Permission("rw-rw-rw-"),
	"OTHERS": 	new Permission("r--r--r--")
};

var FSUI = function(con, filesystem, u) {

	var self = this;
	var container = con;
	var fs = filesystem;
	var user = u;

	var isEditing = false;

	var buildFolder = function(name, folderObj) {
		var div = document.createElement("div");
		div.className = "directory";
		div.setAttribute("data-type", 2);
		div.setAttribute("data-content", name);

		var img = document.createElement("img");
		img.src = "assest/folder.png";

		var span = document.createElement("span");
		span.innerHTML = name;

		div.appendChild(img);
		div.appendChild(span);

		$(container).append(div);

		div.addEventListener('contextmenu', function(evt) {
			options.clearMenus(false);
			span.setAttribute('contentEditable', true);
			span.focus();
			isEditing = true;
			span.addEventListener('keyup', function(e) {
				var code = e.keyCode || e.charCode;
				if(code == 13) {
					e.srcElement.setAttribute('contentEditable', false);
					isEditing = false;
					return false;
				}
				
				folderObj.rename(span.innerText, user);
				div.setAttribute("data-content", span.innerText);
			});
			evt.preventDefault();
			return false;
		});

		div.onclick = function(e) {
			if(!isEditing) {
				fs.navigate(div.getAttribute("data-content"));
				self.build(new Tree(fs, user));
			}
		}
	}

	var buildFile = function(name, fileObj) {
		var div = document.createElement("div");
		div.className = "file";
		div.setAttribute("data-type", 1);

		var img = document.createElement("img");
		img.src = "assest/text-file.png";

		var span = document.createElement("span");
		span.innerHTML = name;

		div.appendChild(img);
		div.appendChild(span);

		$(container).append(div);

		div.addEventListener('contextmenu', function(evt) {
			options.clearMenus(false);
			span.setAttribute('contentEditable', true);
			span.focus();
			isEditing = true;
			span.addEventListener('keyup', function(e) {
				var code = e.keyCode || e.charCode;
				if(code == 13) {
					e.srcElement.setAttribute('contentEditable', false);
					isEditing = false;
					return false;
				}
				
				fileObj.rename(span.innerText, fileObj.type, user);
				div.setAttribute("data-content", span.innerText);
			});
			evt.preventDefault();
			return false;
		});
	}

	var buildLink = function(name, target) {
		var div = document.createElement("div");
		div.className = "link";
		div.setAttribute("data-type", 2);
		div.setAttribute("data-content", target);

		var img = document.createElement("img");
		img.src = "assest/folder.png";

		var span = document.createElement("span");
		span.innerHTML = name;

		div.appendChild(img);
		div.appendChild(span);

		$(container).append(div);

		div.onclick = function(e) {
			fs.navigate(div.getAttribute("data-content"));
			self.build(new Tree(fs));
		}
	}

	var buildPath = function() {
		var p = document.createElement("p");
		p.innerHTML = "path: " + fs.pwd();

		$(container).append(p);
	}

	this.getPath = function() {
		return fs.pwd();
	}

	var buildControls = function() {
		var holder = document.createElement("div");
		$(container).append(holder);

		// new file control
		var c = document.createElement("i");
		c.innerHTML = "file";
		c.className = "new";
		holder.appendChild(c);
		c.onclick = function() {
			var name = prompt("Enter File Name : ");
			fs.push(new File(name, 1024, "TXT", new Permission("rw-rw-rw-"), name));
		}

		// new folder control
		var c = document.createElement("i");
		c.innerHTML = "directory";
		c.className = "new";
		holder.appendChild(c);
		c.onclick = function() {
			var name = prompt("Enter Directory Name : ");
			fs.push(new Directory(name, [], new Permission("rw-rw-rw-")));
		}

		// delete control
		var c = document.createElement("i");
		c.innerHTML = "delete";
		c.className = "del";
		holder.appendChild(c);
		c.onclick = function() {
			var name = prompt("Enter Name : ");
			fs.pop(name);
		}
	}

	this.build = function(tree) {
		$(container).html('');

		//buildPath();
		buildControls();	

		if(fs.pwd() != "/")
			buildLink("back", "..");

		for(var stub of tree.child) {

			if(typeof stub.child == "undefined") {
				// file
				buildFile(stub.name, stub.directory);
			} else {
				// folder
				buildFolder(stub.name, stub.directory);
			}
		}
	}
}

explorer.prototype.build = function() {
	this.user = new User("Ritesh", "user");
	this.fs = new FS(this.user);
	this.fsd = new FSUI(this.view, this.fs, this.user);

	this.fsd.build(new Tree(this.fs, this.user));
	var self = this;
	document.addEventListener("reload", function() {
		self.fsd.build(new Tree(self.fs, self.user));
		$("#explorer_address_bar").val(self.fs.pwd());
	}, false);
}

explorer.prototype.init = function(con) {
	this.setContainer(con);
	this.buildHolder();
	this.buildTopbar();
	this.buildView();
	this.build();
}