/**
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
}