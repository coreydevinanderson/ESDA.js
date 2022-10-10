// Function: euc_dist_matrix()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//------------------------------------------------------------------------------//

// Description:

// JavaScript function for calculating pairwise Euclidean distance of L2 norms 
// for attribute rows in a matix.

// Utilizes matrix algebra function math.distance from math.js.
// A nested for loop is used to index for all pairs [i, j]
// including comparisons to self.

// Returns: an nrow x nrow (square) distance matrix.

//------------------------------------------------------------------------------//

// Parameters:
// your_matrix  : an r x c "Array" or "DenseMatrix" object.

// Example calculation:  5 SVI 2018 indicators for 3 counties. 

//------------------------------------------------------------------------------//

// Run from START to END:

// START
function euc_dist_matrix(your_matrix, output_style = "Array") {
  
  let your_type = math.typeOf(your_matrix)
  if (your_type == "DenseMatrix") {
    your_matrix = your_matrix["_data"]
  }
  
  let your_dims = math.size(your_matrix);
  let nrow = your_dims[0];
  let eucdist_mat = math.ones(nrow, nrow);
  
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
