/**
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
}