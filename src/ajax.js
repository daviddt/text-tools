/**
 * Een simpele Ajax functie om data op te halen
 * ik gebruik hem nu voor mockup data
 */

function getData (url, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
	  if (this.status >= 200 && this.status < 400) {
	    var data = JSON.parse(this.response);
	    callback(data);
	  } else {
	    callback("{'response': 'error'}");
	  }
	};

	request.onerror = function() {
	  callback("{'response': 'connection error'}");
	};

	request.send();
}