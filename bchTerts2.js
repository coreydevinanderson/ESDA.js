// Bivariate choropleth tertiles with potential null values in array

//------------------------------------------------------------------------------

// Authors: Corey Devin Anderson and Kirankumar Batchu

// The function bchTerts2() takes two input arrays and bins values for each 
// array into one of three classes ('L', 'M', 'H') based on tercile/tertile 
// boundaries or as null (if null). If both corresponding elements are not null, 
// it concatenates them into a single array of two-character strings, with nine 
// possible states ('LL','LM', 'LH', 'ML', 'MM', 'MH', 'HL', 'HM', or 'HH') to 
// support a 3 x 3 color scheme in a bivariate choropleth map. If either or both 
// components are null, then null is returned for that position. 

// bchTerts2() uses two helper functions: getTerts2() and lmh(). 

// Dependencies:

// simple-statistics (for quantile function: ss.quantile()) was used to determine
// array values associated with the tertiles; see script tag in HTML pane for 
// src information for simple-statistics.

//------------------------------------------------------------------------------

// Helper functions for bchTerts2():

// getTerts2(yourArray): 
//   Takes a single array and returns an array of length 4 containing the break 
//   points that define the tertiles (including 0 and 1). Null values are 
//   filtered out prior to determining tertiles.

// lmh(value, yourTerts)
//    Given the breaks from getTerts(), classify each member of the array as
//    "L", "M", "H", or null.
//
// As written lmh() maps each value in the input array to its respective 
// category ('L', 'M', 'H', or null) in an output array using an anonymous 
// function with a nested call to getTerts2().

//------------------------------------------------------------------------------

// Example data:

// Load data (from JSON on GitHub) for prototyping:

// Uncomment url to begin...

let url = "https://raw.githubusercontent.com/coreydevinanderson/cossimjs/main/data/diabetes_indicators.JSON";

let xhReq = new XMLHttpRequest();
xhReq.open("GET", url, false);
xhReq.send(null);
let jsonObject = JSON.parse(xhReq.responseText);

// console.log(Object.keys(jsonObject))
// ["County_FIPS","County","State","EPL_AGE65","EPL_POV","EPL_MINRTY","EPL_NOHSDP","EPL_UNEMP","Diabetes_pct"]

// Save indicators as separate variables for protoyping:

let EPL_AGE65 = jsonObject.EPL_AGE65;
let EPL_POV = jsonObject.EPL_POV;
let EPL_MINRTY = jsonObject.EPL_MINRTY;
let EPL_NOHSDP = jsonObject.EPL_NOHSDP;
let EPL_UNEMP = jsonObject.EPL_UNEMP;
let Diabetes_pct = jsonObject.Diabetes_pct;

//------------------------------------------------------------------------------

// Function: getTerts2()

// START
function getTerts2(yourArray) {
  
  const tertInts = [0, 1, 2, 3];
  const terts = tertInts.map(x => x / 3);
  let yourArrayX = yourArray.filter(x =>{if (x != null) {return true} else {return false}});
  let out = terts.map((x) => ss.quantile(yourArrayX, x));
  
return(out)  
}
// END


// Test?
// console.log(getTerts2(EPL_AGE65))

//------------------------------------------------------------------------------

// lmh2()

// This function returns the tertiles T1, T2, and T3 as 'L', 'M', and 'H'.
// null values are returned as null.

// Both getTerts2() and lmh2() are used as helper functions in bchTerts2(), where 
// the call to getTerts2() can be passed directly in the call to lmh2().


function lmh2(value, yourTerts) {
  if (value == null) {
    return null;
  } else if (value <= yourTerts[1]) {
    return "L";
  } else if (value > yourTerts[1] && value <= yourTerts[2]) {
    return "M";
  } else if (value > yourTerts[2] && value <= yourTerts[3]) {
    return "H";
  } 
}

// Example call with .map()

// let test = EPL_AGE65.map(function(x) { return lmh2(x, getTerts2(EPL_AGE65)) })
// 
// anonymous function:
// let test = EPL_AGE65.map((x) => lmh2(x, getTerts2(EPL_AGE65)));
// console.log(test)

//------------------------------------------------------------------------------

// bchTerts2()

function bchTerts2(array1, array2) {
  let a = array1.map((x) => lmh2(x, getTerts2(array1)));
  let b = array2.map((x) => lmh2(x, getTerts2(array2)));
  let c = a.map((x, i) => {if (x == null || b[i] == null) {return null} else {return x + String(b[i])}});
return c;
};

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// Test? With SVI data
// console.log(bchTerts2(EPL_AGE65, EPL_POV));

// with nulls:


// How to handle null values? 

// Make some smaller arrays for testing purposes:

// one null
let EPL_AGE65_test = EPL_AGE65.slice(0, 10)
// Randomly generate random index between 0 and 10 and replace with null

function make_null(vector) {
  vector[Math.floor(Math.random() * 11)] = null
return vector
}

let EPL_AGE65_test0 = make_null(EPL_AGE65_test)
console.log(EPL_AGE65_test0)

// one or more nulls?

// no nulls
let EPL_MINRTY_test = EPL_MINRTY.slice(0, 10);
console.log(EPL_MINRTY_test)


console.log(bchTerts2(EPL_AGE65_test0, EPL_MINRTY_test));