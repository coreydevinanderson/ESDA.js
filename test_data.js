
// Example data:
// Data are percentile ranks for five indicators from SVI 2018 and diabetes:

const FIPS_01001 = [0.1850, 0.5401, 0.6336, 0.4397, 0.2745, 0.7074]; 
const FIPS_01003 = [0.6428, 0.2239, 0.5158, 0.3209, 0.3121, 0.4925];
const FIPS_01005 = [0.4893, 0.9631, 0.8965, 0.9701, 0.9217, 0.9799];

let FIPS_mat = math.matrix([FIPS_01001, FIPS_01003, FIPS_01005]); // create a DenseMatrix in math.js

//------------------------------------------------------------------------------

//--------------------//
//  Cosine similarity //
//--------------------//

// cosim(a, b)

// index to get row 1 (FIPS_01001) and row 2 (FIPS_01003) from FIPS_mat
// console.log(cossim(FIPS_mat["_data"][0], FIPS_mat["_data"][1]))

// To compare vector of values for a county (i) to all other counties (j) in a state.

let cossim_mat = math.ones(1, 3);
let cosine_mat_dims = math.size(cossim_mat);
let ncol = cosine_mat_dims.get([1]);

for (i = 0; i < 1; i++) {
  for (j = 0; j < ncol; j++) {
    if (i != j) {
      cossim_mat.set([i, j], cossim(FIPS_mat["_data"][i], FIPS_mat["_data"][j]));
    }
  }
}

console.log(cossim_mat)

//------------------------------------------------------------------------------

//----------------------------//
// Adjusted Cosine Similarity //
//----------------------------//

// Default: method = "zscore"
// FIPS_zscores_rows = adjusted(FIPS_mat["_data"]); // input Array
// FIPS_zscores_rows = adjusted(FIPS_mat); // input DenseMatrix
// console.log(FIPS_zscores_rows) // output is an Array

FIPS_zscores_rows = adjusted(FIPS_mat, method = "centered"); // DenseMatrix
// console.log(FIPS_zscores_rows) 

//------------------------------------------------------------------------------

//-----------------------------//
// Pairwise Euclidean distance //
//-----------------------------//

// Should match results for euclidean_dist() call.
// console.log(math.norm(math.add(FIPS_01001, math.multiply(FIPS_01003, -1))))

// console.log(FIPS_01001)
// console.log(FIPS_01003)
// console.log(math.diff([FIPS_01003, FIPS_01001])[0])
// console.log(math.norm(math.diff([FIPS_01001, FIPS_01003])[0]))

// Using euclidean_dist()
// console.log(FIPS_mat)
// console.log(FIPS_mat["_data"])

console.log(euc_dist_matrix(FIPS_mat, output_style = "DenseMatrix"))
// console.log(euc_dist_matrix(FIPS_mat))  // default is "Array
// console.log(euc_dist_matrix(FIPS_mat, output_style = "Array"))


