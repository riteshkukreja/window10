var SEARCH_ENGINE = {};

SEARCH_ENGINE.HOST = [
	{
		NAME: 'GOOGLE',
		URL: 'http://localhost/window10/source/google_search.php'
	}
];

SEARCH_ENGINE.response = [];
SEARCH_ENGINE.task;

SEARCH_ENGINE.ajaxCall = function(url, data, success) {
	$.ajax({
		url: url,
		dataType: 'json',
		data: data,
		type: 'GET',

		success: success,
		failed: function() {
			console.log('failed');
		}
	});
}

SEARCH_ENGINE.compile = function(response) {
	/*for (var i = 0; i < response.length; i++) {
        var item = response[i];
        
        //console.log(item);
    }
	*/
    
    SEARCH_ENGINE.response = response;

    SEARCH_ENGINE.task(response);
}

SEARCH_ENGINE.fetch = function(query, task) {
	SEARCH_ENGINE.task = task;
	for(i = 0 ; i < SEARCH_ENGINE.HOST.length; i++) {
		SEARCH_ENGINE.ajaxCall(SEARCH_ENGINE.HOST[i].URL, {q: query}, SEARCH_ENGINE.compile);
	}
}

SEARCH_ENGINE.results = function() {
	return SEARCH_ENGINE.response;
}

