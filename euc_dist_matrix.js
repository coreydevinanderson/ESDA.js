// Function: euc_dist_matrix()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//------------------------------------------------------------------------------//

// Description:

// JavaScript function for calculating pairwise Euclidean distance of row 
// vectors in input "Array" or  "DenseMatrix" using math.distance

//------------------------------------------------------------------------------//

// Parameters:
// your_matrix  : an r x c "Array" or "DenseMatrix" object.

// Returns: an nrow x nrow (square) distance matrix.

//------------------------------------------------------------------------------//
//------------------------------------------------------------------------------//

// Run from START to END:

// START
function euc_dist_matrix(your_matrix, output_style = "Array") {
  
  // Check object type; if "DenseMatrix" convert to "Array"
  let your_type = math.typeOf(your_matrix)
  if (your_type == "DenseMatrix") {
    your_matrix = your_matrix["_data"]
  }
  
  let your_dims = math.size(your_matrix);
  let nrow = your_dims[0];  // nrows
  let eucdist_mat = math.zeros(nrow, nrow);  // matrix of zeros to populate
  
  // loop over all i -> j and j <- i comparisons
  // use matrix.set([i, j], ...) to replaces ones with 
  for (i = 0; i < nrow; i++) {
    for (j = 0; j < nrow; j++) {
      eucdist_mat.set([i, j], math.distance(your_matrix[i], your_matrix[j]));
    }
  }  
  
  if (output_style == "Array") {
    eucdist_mat = eucdist_mat["_data"]
  }
 
  return eucdist_mat 
}
// END

//------------------------------------------------------------------------------//
