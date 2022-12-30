// Function: distEuclidean()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//----------------------------------------------------------------------------

// Description: 

// Calculates the Euclidean distance between 1D Arrays of numbers

//----------------------------------------------------------------------------

// Parameters:
// a, b : 1D Arrays of numbers to be compared.

// Returns: Euclidean distance between arrays (a, b).

// Dependencies: none.

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

// Function: distEuclidean()

// START
function distEuclidean(a, b) {
  let squares = a.map((x, i) => (x - b[i]) ** 2); // Take the difference between corresponding components
                                                  // and square it.
  let sum = 0; 
  squares.forEach(element => sum = sum + element) // Sum the squares
return(sum ** 0.5)  // return the square root of the sums of squares
}
// END

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
