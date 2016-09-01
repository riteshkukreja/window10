<?php

	header('Access-Control-Allow-Origin: *');

	class GoogleSearch {

		private $doc = null;


		private $URL = 'https://www.google.co.in/search?q=';
		private $query = '';

		private $classname = 'r';
		private $results = [];
		private $limit = 5;

		public function __construct() {
			$this->doc = new DomDocument;

			// We need to validate our document before refering to the id
			$this->doc->validateOnParse = true;
		}

		private function load() {
			@$this->doc->loadHtml(file_get_contents($this->URL . $this->query));

			//print_r($data);
			$a = new DOMXPath($this->doc);
		    $spans = $a->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $this->classname ')]/a");

		    foreach($spans as $a) { 
		    	if(count($this->results) >= $this->limit) return;
		    	
		    	$node = [];

		    	$url = $a->getAttribute("href");
		    	$pos = strpos($url, '&');
		    	if($pos != -1) {
		    		$url = substr($url, 7, $pos - 7);
		    	}


		    	$node['url'] = $url;
		    	$node['name'] = $a->nodeValue;

		    	$this->results[] = $node;
			}

			//print_r($this->results);
		}

		public function response() {
			return json_encode($this->results);
		}

		public function search($query) {
			$this->query = urlencode($query);

			$this->load();
		}
	}

	if(isset($_GET['q'])) {
		$obj = new GoogleSearch;
		$obj->search($_GET['q']);
		echo $obj->response();
	} else {
		$response = array();
		$response['success'] = false;
		echo json_encode($response);
	}

?>