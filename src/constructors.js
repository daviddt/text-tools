/**
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







