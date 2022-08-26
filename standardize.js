// standardize()

// Returns the standardized values (z-scores) for each data vector in a matrix

function standardize(your_matrix) {

  let your_matrix_dims = math.size(your_matrix); // get dimensions of input matrix
  let nrow = your_matrix_dims.get([0]); // get number of rows for iteration
  let standardized = math.zeros(your_matrix_dims["_data"]); // make matrix of zeros to replace
  
  for (i = 0; i < nrow; i++){  // for each row in the matrix.
    let row_mean = math.mean(your_matrix["_data"][i]);
    let row_std = math.std(your_matrix["_data"][i]);
    let centered = math.add(your_matrix["_data"][i], -row_mean); // subtract row mean from each member
    standardized[i] = math.divide(centered, row_std);  // divide each member by the standard deviation
  }
  
return standardized;
}
