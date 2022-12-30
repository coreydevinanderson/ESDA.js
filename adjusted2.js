// Function: adjusted2()

// Authors: Corey Devin Anderson and Kirankumar Batchu

// -----------------------------------------------------------------------------

// Description:

// Takes an input Array or math.js DenseMatrix and returns an Array of the same 
// number of dimensions containing the mean-centered values or standard (z) 
// scores.

// For arrays containing null values, nulls are removed prior to calculating 
// means (and/or standard deviations), but are retained in the output array.

// The original version of this function (adjusted()) does not handle null 
// values.

// -----------------------------------------------------------------------------

// Parameters:
// yourMatrix : a math.js "DenseMatrix" or JavaScript "Array" to be rescaled.

// method : rescaling to be applied to each array. Current options are "zscore" 
//          or "centered". Default is "centered".

// Returns:
// An Array of equal dimensions containing either mean-centerd or standard 
// (z) scores.

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// Function: adjusted2()

// START
function adjusted2(yourMatrix, method = "centered") {

  matrixType = math.typeOf(yourMatrix);
  console.log("Input type: " + matrixType)
  
  if (matrixType == "Array") {
    yourMatrix = math.matrix(yourMatrix)
  }
  
  let yourMatrixDims = math.size(yourMatrix); // get dimensions of input matrix
  let nrow = yourMatrixDims.get([0]); // get number of rows for iteration  
  let standardized = math.zeros(yourMatrixDims["_data"]); // make matrix of zeros to replace based on input array dimensions
  
  for (i = 0; i < nrow; i++){  // for each vector (1D Array) in the matrix.
    let row = yourMatrix["_data"][i]; // pull the Array out of dense matrix "_data" slot
    
    // .filter the data to return only those that are not null
    let rowClean = row.filter(function(x) {if (x != null) {return true} else {return false}});
    // Get the mean and standard deviation of the null filtered Array
    let rowMean = math.mean(rowClean); // take the mean of the Array using math.js
    let rowStd = math.std(rowClean); // take the standard deviation of the Array using math.js 
    
    // .map a new Array of mean-centered values; returns null if null for that component.
    // Round each to four decimal places.
    // The +(unary plus operator) forces a number to be returned (otherwise you get a string).
    
    let centered = row.map(function(x){if (x == null) {return null} else if (x != null) {return +(x - rowMean).toFixed(4)}});       
    
    // If the user chooses "zscore"
    // divide each mean-centered value by the standard deviation to get an Array of z-scores
    if (method == "zscore") {
      standardized[i] = centered.map(function(x){
                                       if (x == null) {
                                         return null
                                       } else if (x != null) {
                                         return +(x / rowStd).toFixed(4)}});         
    } else if (method == "centered") {
      standardized[i] = centered
    }
   } 
   
return standardized;
}
// END

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

