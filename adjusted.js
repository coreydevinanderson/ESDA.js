// Function: adjusted()

// Authors: Corey Devin Anderson and Kirankumar Batchu

// -----------------------------------------------------------------------------

// Description:

// Takes an input Array or math.js DenseMatrix and returns an Array of the same 
// number of dimensions containing the mean-centered values or standard (z) 
// scores.

// For arrays containing null values use adjusted2(), which is an edit of 
// adjusted that can handle values.

// -----------------------------------------------------------------------------

// Parameters:
// yourMatrix : a math.js "DenseMatrix" or JavaScript "Array" to be rescaled.

// method : rescaling to be applied to each array. Current options are "zscore" 
//          or "centered". Default is "centered".

// Returns:
// An Array of equal dimensions containing either mean-centerd or standard 
// (z) scores.

// -----------------------------------------------------------------------------

// Parameters:
// yourMatrix : a math.js "DenseMatrix" or JavaScript "Array" to be rescaled.

// method : rescaling to be applied to each array. Current options are "zscore" 
//          or "centered". Default is "centered".

// Returns:
// An Array of equal dimensions containing either mean-centerd or standard (z)
// normal scores.

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// Run from START to END

// START
function adjusted(yourMatrix, method = "centered") {

  matrixType = math.typeOf(yourMatrix);
  console.log(matrixType)
  
  if (matrixType == "Array") {
    yourMatrix = math.matrix(yourMatrix)
  }
  
  let yourMatrixDims = math.size(yourMatrix); // get dimensions of input matrix
  let nrow = yourMatrixDims.get([0]); // get number of rows for iteration  
  let standardized = math.zeros(yourMatrixDims["_data"]); // make matrix of zeros to replace
  
  for (i = 0; i < nrow; i++){  // for each row in the matrix.
    let rowMean = math.mean(yourMatrix["_data"][i]);
    let rowStd = math.std(yourMatrix["_data"][i]);
    let centered = math.add(yourMatrix["_data"][i], -rowMean);  // subtract row mean from each member
    if (method == "zscore") {
      standardized[i] = math.divide(centered, rowStd);  // divide each member by the standard deviation
    } else if (method == "centered") {
      standardized[i] = centered
    }
   } 
   
return standardized;
}
// END

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------