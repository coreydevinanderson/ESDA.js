// Function: adjusted()

// Authors: Corey Devin Anderson and Kirankumar Batchu

// -----------------------------------------------------------------------------

// Description:

// This function was written as a helper function for calculating adjusted 
// cosine similarity (cossim.js).

// Cosine similarity compares row attributes, so values are centered by row 
// means and/or row standard deviations. 

// Note that both available methods ("zscore" and "centered") yield the same
// cossine similarity.

// -----------------------------------------------------------------------------

// Parameters:
// your_matrix : a math.js "DenseMatrix" or JavaScript "Array" to be rescaled.

// method : rescaling to be applied to each array. Current options are "zscore" 
//          or "centered". Default is "zscore"

// Returns:
// An Array of equal dimensions containing either mean-centerd or standard-
// normal scores.

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// Run from START to END

// START
function adjusted(your_matrix, method = "zscore") {

  matrix_type = math.typeOf(your_matrix);
  console.log(matrix_type)
  
  if (matrix_type == "Array") {
    your_matrix = math.matrix(your_matrix)
  }
  
  let your_matrix_dims = math.size(your_matrix); // get dimensions of input matrix
  let nrow = your_matrix_dims.get([0]); // get number of rows for iteration  
  let standardized = math.zeros(your_matrix_dims["_data"]); // make matrix of zeros to replace
  
  for (i = 0; i < nrow; i++){  // for each row in the matrix.
    let row_mean = math.mean(your_matrix["_data"][i]);
    let row_std = math.std(your_matrix["_data"][i]);
    let centered = math.add(your_matrix["_data"][i], -row_mean);  // subtract row mean from each member
    if (method == "zscore") {
      standardized[i] = math.divide(centered, row_std);  // divide each member by the standard deviation
    } else if (method == "centered") {
      standardized[i] = centered
    }
   } 
   
return standardized;
}
// END