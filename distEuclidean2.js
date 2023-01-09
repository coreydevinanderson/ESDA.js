// Function: distEuclidean2()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//----------------------------------------------------------------------------

// Description: 

// Calculates the Euclidean distance between 1D Arrays of numbers. If one or 
// more values are null that component is ignored in the calculation.

//----------------------------------------------------------------------------

// Parameters:
// a, b : 1D Arrays of numbers to be compared.

// Returns: Euclidean distance between arrays (a, b).

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

// Function: distEuclidean2()

// START
function distEuclidean2(a, b) {
    let squares = a.map(function(x, i){if (x != null && b[i] != null) {return (x - b[i]) ** 2} else {return null}});
    let sum = 0; 
    squares.forEach(element => sum = sum + element) // Sum the squares
  return(sum ** 0.5)  // return the square root of the sums of squares
  }
  // END
  
  //----------------------------------------------------------------------------
