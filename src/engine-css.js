/**
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

function addCSSRule(sheet, selector, rules, index) {
  if("insertRule" in sheet) {
    sheet.insertRule(selector + "{" + rules + "}", sheet.cssRules.length);
  }
  else if("addRule" in sheet) {
    sheet.addRule(selector, rules, sheet.cssRules.length);
  }
}