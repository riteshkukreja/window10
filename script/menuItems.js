var menuItems = {};

menuItems.HOME = [
	{
		name: 'View',
		action: menuItems.dummyAction,
		active: true,
		list: true
	},
	{
		name: 'Sort By',
		action: menuItems.dummyAction,
		active: true,
		list: true
	},
	{
		name: 'Refresh',
		action: menuItems.dummyAction,
		active: true,
		list: false
	},
	{
		name: 'Next desktop background',
		action: menuItems.dummyAction,
		active: true,
		list: false
	},
	{
		name: 'New',
		action: menuItems.dummyAction,
		active: true,
		list: true
	},
	{
		name: 'Display settings',
		action: menuItems.dummyAction,
		active: true,
		list: false
	},
	{
		name: 'Personalize',
		action: menuItems.dummyAction,
		active: true,
		list: false
	},
];

menuItems.dummyAction = function(e) {
	// dummy action
	console.log(e);
}