// Function: EucDistMatrix()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//------------------------------------------------------------------------------//

// Description:

// JavaScript function for calculating pairwise Euclidean distance of row 
// vectors in input "Array" or  "DenseMatrix" using math.distance

//------------------------------------------------------------------------------//

// Parameters:

// yourMatrix  : an r x c "Array" or "DenseMatrix" object.
// outputStyle : string indicating the type of object to output ("Array or DenseMatrix")

// Returns: an nrow x nrow (square) distance matrix.

//------------------------------------------------------------------------------//

// Dependencies:

// math.js

//------------------------------------------------------------------------------//
//------------------------------------------------------------------------------//

// START
function EucDistMatrix(yourMatrix, outputStyle = "Array") {
  
  // Check object type; if "DenseMatrix" convert to "Array"
  let yourType = math.typeOf(yourMatrix)
  if (yourType == "DenseMatrix") {
    yourMatrix = yourMatrix["_data"]
  }
  
  let yourDims = math.size(yourMatrix);
  let nrow = yourDims[0];  // nrows
  let EucDistMat = math.zeros(nrow, nrow);  // matrix of zeros to populate
  
  // loop over all i -> j and j <- i comparisons
  // use matrix.set([i, j], ...) to replaces ones with 
  for (i = 0; i < nrow; i++) {
    for (j = 0; j < nrow; j++) {
      EucDistMat.set([i, j], math.distance(yourMatrix[i], yourMatrix[j]));
    }
  }  
  
  if (outputStyle == "Array") {
    EucDistMat = EucDistMat["_data"]
  }
 
  return EucDistMat 
}
// END

//------------------------------------------------------------------------------//


