// Function minMaxScaler()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//------------------------------------------------------------------------------

// Description:

// Re-scales an array to fall between zero and one based on the minimum and 
// maxium values in the array (so-called "min-max rescaling"). The minimum value
// will equal zero; the maximum value will equal one. Null values are ignored.

//------------------------------------------------------------------------------

// Parameters:
// yourArray : Array of numbers; may include null values.

// Returns
// A re-scaled Array.

//------------------------------------------------------------------------------

// START
function minMaxScaler(yourArray){
  let yourArrayX = yourArray.filter(x => {if (x != null) {return x}})
  let min = Math.min.apply(Math, yourArrayX);
  let max = Math.max.apply(Math, yourArrayX);
  let numerator = yourArray.map(x => {if (x != null) {return x - min} else {return null}});
  let z = numerator.map(x => {if (x != null) {return x / (max - min)} else {return null}});
return z;
}
// END

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

