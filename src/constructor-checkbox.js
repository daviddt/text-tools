/**
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
}