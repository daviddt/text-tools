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
 * true / false option
 */

function CheckboxItem (options) {
	Child.call(this, options);
	this.options = options.options;

	this.element = document.createElement('input');

	this.element.addEventListener('click', function(event){
		this.value = event.target.checked ? this.options[1] : this.options[0];
		this.changeStyle(this.target, this.css, (this.value+this.unit));
	}.bind(this), false);
}

CheckboxItem.prototype = Object.create(Child.prototype);
CheckboxItem.prototype.constructor = Child;

/**
 * De build functie voor de HTML op te bouwen
 */

CheckboxItem.prototype.built = function () {
	var innerDiv = document.createElement('div');

	this.element.type = "checkbox";
	this.element.value = this.value;

	innerDiv.appendChild(this.labelNode);
	innerDiv.appendChild(this.element);

	return innerDiv;
};/**
 * Child wordt gecalled als basis
 * Select item wordt ge-extend met:
 * alle radio options
 */

function RadioItem (options) {
	Child.call(this, options);
	this.options = options.options;

	this.element = document.createElement('div');

	this.element.addEventListener('click', function(event){
		if (event.target.type === "radio") {
			this.value = this.options[event.target.dataset.count];
			this.changeStyle(this.target, this.css, (this.value+this.unit));
		}
	}.bind(this), false);
}

RadioItem.prototype = Object.create(Child.prototype);
RadioItem.prototype.constructor = Child;

/**
 * De build functie voor de HTML op te bouwen
 */

RadioItem.prototype.built = function () {

	this.element.appendChild(this.labelNode);
	
	for (var i = 0; i < this.options.length; i++) {
		var innerDiv = document.createElement('div');
		var radio = document.createElement('input')
			radio.type = "radio";
			radio.name = this.label;
			radio.dataset.count = i;

		var innerLabel = document.createElement('label');
			innerLabel.innerHTML = this.options[i];

		innerDiv.appendChild(innerLabel);
		innerDiv.appendChild(radio);
		this.element.appendChild(innerDiv);
	}

	return this.element;
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

	this.element.addEventListener('input', function(event){
		this.value = event.srcElement.value;
		this.changeStyle(this.target, this.css, (this.value+this.unit));
	}.bind(this), false);
}

RangeItem.prototype = Object.create(Child.prototype);
RangeItem.prototype.constructor = Child;

/**
 * De build functie voor de HTML op te bouwen
 */

RangeItem.prototype.built = function () {
	var innerDiv = document.createElement('div');

	this.element.type = "range";
	this.element.min  = this.min;
	this.element.max  = this.max;
	this.element.step = this.step;
	if (this.value && this.value >= this.min && this.value <= this.max) this.element.value = this.value;

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
		this.changeStyle(this.target, this.css, (this.value+this.unit));
	}.bind(this), false);
}

SelectItem.prototype = Object.create(Child.prototype);
SelectItem.prototype.constructor = Child;

/**
 * De build functie voor de HTML op te bouwen
 */

SelectItem.prototype.built = function () {
	var innerDiv = document.createElement('div');

	for (var i = 0; i < this.items.length; i++) {
		var startTag = (this.value === this.items[i] ? "<option selected>" : "<option>");
		this.element.innerHTML += startTag + this.items[i] +'</option>';
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

Child.prototype.getStyle = function () {
	return {
		"target": this.target,
		"property": this.css,
		"value": (this.value+this.unit)
	}
}

Child.prototype.changeStyle = function (target, property, value) {
	addCSSRule(sheet, target, property + ":" + value);
}







;/**
 * Hier maken we een stylesheet aan in de var "sheet"
 */

var sheet = (function() {
  // Create the <style> tag
  var style = document.createElement("style");

  // WebKit hack :(
  style.appendChild(document.createTextNode(""));

  // Add the <style> element to the page
  document.head.appendChild(style);

  return style.sheet;
})();

/**
 * Functie om makkelijk een regel toe te voegen
 * addCSSRule(sheet, "header", "float: left");
 */

var prefix = "main" // prefix voor styles

function addCSSRule(sheet, selector, rules, index) {
  selector = prefix + ' ' + selector;
  if("insertRule" in sheet) {
    sheet.insertRule(selector + "{" + rules + "}", sheet.cssRules.length);
  }
  else if("addRule" in sheet) {
    sheet.addRule(selector, rules, sheet.cssRules.length);
  }
};/**
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
					fields[i].children.push(new CheckboxItem(current));
				} else if (current.type === "radio") {
					fields[i].children.push(new RadioItem(current));
				}
			}
		}
	}
	fields = fields;
	renderItems(fields);
	buildInitialCSS(fields);
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
	document.querySelector('aside').appendChild(div);
}

function buildInitialCSS (fields) {
	for (var i = 0; i < fields.length; i++) {
		if (fields[i].children.length) {
			for (var j = 0; j < fields[i].children.length; j++) {
				var style = fields[i].children[j].getStyle();
				addCSSRule(sheet, style.target, style.property +":"+ style.value);
			}
		}
	}
}