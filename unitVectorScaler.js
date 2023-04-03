// Function: unitVectorScaler()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//------------------------------------------------------------------------------

// Description:

// Function for rescaling components in a JavaScript array based on division of
// each element by its L2 norm.

// unitVectorScaler() uses one helper function L2().

//------------------------------------------------------------------------------

// Parameters:
// yourArray : a JavaScript Array to be rescaled.

// Retruns:
// a rescaled JavaScript Array

//------------------------------------------------------------------------------

// L2()

// START
function L2(yourArray) {
  let squares = yourArray.map(function(x){if (x != null) {return (x) ** 2} else {return null}});
  let sum = 0; 
  squares.forEach(element => sum = sum + element); // Sum the squares
return(sum ** 0.5);  // return the square root of the sums of squares
}
// END

//------------------------------------------------------------------------------

// Function: unitVectorScaler

// START
function unitVectorScaler(yourArray) {
  let L2Norm = L2(yourArray);
  let z = yourArray.map(function(x){if (x != null) {return x / L2Norm} else {return null}});
return z
}
// END

//------------------------------------------------------------------------------

// Example calls:

console.log(L2(FEI))
console.log(unitVectorScaler(FEIx))

