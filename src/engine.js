/**
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