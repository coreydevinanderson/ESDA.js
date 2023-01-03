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

// getTerts2()

// START
function getTerts2(yourArray) {
  
  const tertInts = [0, 1, 2, 3];
  const terts = tertInts.map(x => x / 3);
  let yourArrayX = yourArray.filter(x =>{if (x != null) {return true} else {return false}});
  let out = terts.map((x) => ss.quantile(yourArrayX, x));
  
return(out)  
}
// END

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

//------------------------------------------------------------------------------

// bchTerts2()

function bchTerts2(array1, array2) {
  let a = array1.map((x) => lmh2(x, getTerts2(array1)));
  let b = array2.map((x) => lmh2(x, getTerts2(array2)));
  let c = a.map((x, i) => {if (x == null || b[i] == null) {return null} else {return x + String(b[i])}});
return c;
};

//------------------------------------------------------------------------------
