// Function: L2()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//------------------------------------------------------------------------------

// Description:

// Calculates the L2 norms of a 1D Array. Ignores value in calculation if null.

//------------------------------------------------------------------------------

// Parameters:
// a : 1D Array for which the L2 norm will be calculated

// Returns:
// A scalar representing the L2 norm

// Dependencies:
// none

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// Function: L2()

// START
function L2(a) {
  let squares = a.map(function(x){if (x != null) {return (x) ** 2} else {return null}});
  let sum = 0; 
  squares.forEach(element => sum = sum + element); // Sum the squares
return(sum ** 0.5);  // return the square root of the sums of squares
}
// END

//------------------------------------------------------------------------------