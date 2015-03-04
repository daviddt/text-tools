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
};/**
 * Child wordt gecalled als basis
 * Select item wordt ge-extend met:
 *	-min
 *	-max
 *	-step
 */

function RangeItem (options) {
	Child.call(this, options);
	this.min = options.options.min;
	this.max = options.options.max;
	this.step = options.options.step;

	this.element = document.createElement('input');

	this.element.addEventListener('onchange', function(event){
		this.value = event.srcElement.value;
	}, false);
}

/**
 * De build functie voor de HTML op te bouwen
 */

RangeItem.prototype.built = function () {
	var innerDiv = document.createElement('div');

	this.element.type = "range";
	this.element.min  = this.min;
	this.element.max  = this.max;
	this.element.step = this.step;

	innerDiv.appendChild(this.labelNode);
	innerDiv.appendChild(this.element);

	return innerDiv;
};/**
 * Child wordt gecalled als basis
 * Select item wordt ge-extend met de items in de lijst
 */

function SelectItem (options) {
	Child.call(this, options);
	this.items = options.options;
	this.element = document.createElement('select');

	this.element.addEventListener('input', function(event){
		this.value = event.srcElement.value;
	}, false);
}

/**
 * De build functie voor de HTML op te bouwen
 */

SelectItem.prototype.built = function () {
	var innerDiv = document.createElement('div');

	for (var i = 0; i < this.items.length; i++) {
		this.element.innerHTML += '<option>'+ this.items[i] +'</option>';
	}

	innerDiv.appendChild(this.labelNode);
	innerDiv.appendChild(this.element);

	return innerDiv;
};/**
 * De basis van alle constructors
 */


function Fieldset (field) {
	this.name = field.fieldsetName;
}

Fieldset.prototype.built = function () {
	var fieldset = document.createElement('fieldset');
	fieldset.innerHTML = '<legend>' + this.name + '</legend>';
	return fieldset;
}

/**
 * Child wordt hergebruikt voor de andere componenten
 * alle basis instellingen staan hier in
 * specifieke input dingen staan in de andere constructors
 */

function Child (options) {
	this.label = options.label;
	this.type = options.type;
	this.target = options.target;
	this.unit = options.unit;
	this.value = options.value;
	this.css = options.css;

	var label = document.createElement('label');
	var text = document.createTextNode(this.label);
	label.appendChild(text);

	this.labelNode = label;
}







;/**
 * Hier halen we de data op
 */

getData('data/mockup.json', function(data){
	buildFields(data);
});

/**
 * Hier komen alle fields in te staan
 * Dit gaan we later hergebruiken om de initiele styling aan te maken
 */

var fields = [];

/**
 * De functie om alle velden in een object te zetten
 * Hier worden de constructors aangeroepen 
 * om vervolgens HTML ervan te maken in function renderItems
 */

function buildFields (data) {
	for (var i = 0; i < data.length; i++) {
		fields.push(new Fieldset(data[i]));
		if (data[i].children) {
			fields[i].children = [];
			for (var j = 0;j < data[i].children.length; j++) {
				var current = data[i].children[j];
				if (current.type === "select") {
					fields[i].children.push(new SelectItem(current));
				} else if (current.type === "range") {
					fields[i].children.push(new RangeItem(current));
				} else if (current.type === "checkbox") {

				}
			}
		}
	}
	renderItems(fields);
}

/**
 * De functie om alle velden te renderen op het scherm
 * alles wordt op het einde ge-append naar het document
 */

function renderItems (fields) {
	var div = document.createElement('div');
	for (var i = 0; i < fields.length; i++) {
		var currentField = fields[i].built();
		console.log(currentField);
		if (fields[i].children.length) {
			for (var j = 0; j < fields[i].children.length; j++) {
				currentField.appendChild(fields[i].children[j].built());
			}
		}
		div.appendChild(currentField);
	}
	document.body.appendChild(div);
}