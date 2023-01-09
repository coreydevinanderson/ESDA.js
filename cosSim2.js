// Function: cosSim2()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//------------------------------------------------------------------------------

// Description: 

// Function for calculating cosine similarity, with no dependencies. Ignores
// value in calculation if one or more components are null.

// cosSim2() uses two helper functions: dotProduct2() and L2()

// dotProduct2(a, b)
//  Calculates the dot product between two arrays. Ignores value in calculation
//  if one or more components are null.

// L2(a)
//  Calculates the L2 norm of a 1D array. Ignores values in calculation if one
//  or more values are null.

//------------------------------------------------------------------------------

// Parameters:
// a, b : Arrays of numbers to be compared

// Returns: 
// cosine similarity estimate for the pair (a, b).

//------------------------------------------------------------------------------

// dotProduct2()

// START
function dotProduct2(a, b) {
  let dotSum = 0;
  let product = a.map(function(x, i){if (x != null && b[i] != null) {return x * b[i]} else {return null}});
  product.forEach(element => dotSum = dotSum + element)
return dotSum;
}
// END

//------------------------------------------------------------------------------

// L2()

// START
function L2(a) {
  let squares = a.map(function(x){if (x != null) {return (x) ** 2} else {return null}});
  let sum = 0; 
  squares.forEach(element => sum = sum + element); // Sum the squares
return(sum ** 0.5);  // return the square root of the sums of squares
}
// END

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


// Function cosSim2()

// START
function cosSim2(a, b) {
  return dotProduct2(a, b) / (L2(a) * L2(b))  
}
// END


//------------------------------------------------------------------------------

// Example call:

console.log(cosSim2(FIPS_01001x, FIPS_01003x));
