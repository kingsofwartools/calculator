var numAttacks = "";

var attackValue = "";

//This function determines the attack value of the attacking unit based on the button that the user presses, and then prints it in the relevant area. It also clears any previous damage calculation.
var attackButton = function(attackChoice){
	attackValue = attackChoice;
  document.getElementById("attack").innerHTML = "Attack value: " + attackValue + "+";
	document.getElementById("damage").innerHTML = "";
}

var csValue = "";

//This function determines the modifier attributed to the attacking unit based on the button that the user presses, and then prints it in the relevant area. It also clears any previous damage calculation.
var csButton = function(csChoice){
	csValue = csChoice;
  document.getElementById("cs").innerHTML = "Crushing Strength/Thunderous Charge/Piercing: " + csValue;
  document.getElementById("damage").innerHTML = "";
}

var defendValue = "";

//This function determines the attack value of the attacking unit based on the button that the user presses, and then prints it in the relevant area. It also clears any previous damage calculation.
var defendButton = function(defendChoice){
	defendValue = defendChoice;
	document.getElementById("defend").innerHTML = "Defence value: " + defendValue + "+";
  document.getElementById("damage").innerHTML = "";
}

var avgHits = "";
var avgDamage = "";

//This function calculates the average damage done to the defending unit, first calculating the chance to hit based on the attack value of the unit and multiplying this by the number of attacks inputted by the user. Then it calculates the chance to damage based on the defence value of the unit and taking into account any modifiers (accounting for rolls of 1 always failing to damage). Then it multiplies the number of hits by the chance to damage to calculate the average amount of damage inflicted. It then calculates the standard deviation and prints a range of damage output likelihoods.
var calculateDamage = function(){
	numAttacks = document.getElementById("numAttacksInput").value;
	var chanceHit;
  if(document.getElementById("elitecheckbox").checked && document.getElementById("viciouscheckbox").checked) {
    chanceHit = (7 - attackValue)/6 * 49/36;
  } else if(document.getElementById("elitecheckbox").checked || document.getElementById("viciouscheckbox").checked) {
    chanceHit = (7 - attackValue)/6 * 7/6;
  } else {
    chanceHit = (7 - attackValue)/6;
  }
  avgHits = numAttacks * chanceHit;
  var chanceDamage;
  if(defendValue - csValue > 1){
  	chanceDamage = (7 - defendValue + csValue)/6;
  } else {
  	chanceDamage = 5/6;
  };
  avgDamage = avgHits * chanceDamage;
  var stdDev;
  stdDev = Math.sqrt((avgDamage/numAttacks)*(numAttacks-avgDamage));
  var firstDecile; 
  firstDecile = Math.max(0, avgDamage - 1.2816 * stdDev);
  var firstQuartile; 
  firstQuartile = Math.max(0, avgDamage - 0.6745 * stdDev);
  var thirdQuartile; 0.6745
  thirdQuartile = avgDamage + 0.6745 * stdDev;
  var ninthDecile; 1.2816
  ninthDecile = avgDamage + 1.2816 * stdDev;
  document.getElementById("damage").innerHTML = "10% of the time you will get at least " + Math.round(ninthDecile * 10)/10 + " damage" + "<br>" + "25% of the time you will get at least " + Math.round(thirdQuartile * 10)/10 + " damage" + "<br>" + "<b>" + "50% of the time you will get at least " + Math.round(avgDamage * 10)/10 + " damage" + "</b>" + "<br>" + "75% of the time you will get at least " + Math.round(firstQuartile * 10)/10 + " damage" + "<br>" + "90% of the time you will get at least " + Math.round(firstDecile * 10)/10 + " damage";
  window.scrollTo(0,document.body.scrollHeight);
}
