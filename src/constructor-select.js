/**
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
}