// Function to apply zscore transformation across rows of a matrix in mathjs


function standardize(your_matrix) {

    let standardized = math.matrix() // make empty matrix to populate
    let your_matrix_dims = math.size(your_matrix) // get dimensions of input matrix
    let nrow = your_matrix_dims.get([0]) // get number of rows for iteration
     
    for (i = 0; i < nrow; i++){         
      let row_mean = math.mean(your_matrix["_data"][i])
      let row_std = math.std(your_matrix["_data"][i])
      let centered = math.add(your_matrix["_data"][i], -row_mean)
      let z = math.divide(centered, row_std)
      standardized["_data"][i] = z
    }
    
    standardized["_size"] = your_matrix_dims["_data"] // need to do this internally
  
return standardized
}
