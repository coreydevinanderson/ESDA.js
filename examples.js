let FIPS_01001 = [0.1850, 0.5401, 0.6336, 0.4397, 0.2745, 0.7074] 
let FIPS_01003 = [0.6428, 0.2239, 0.5158, 0.3209, 0.3121, 0.4925]
let FIPS_01005 = [0.4893, 0.9631, 0.8965, 0.9701, 0.9217, 0.9799]

let FIPS_mat = math.matrix([FIPS_01001, FIPS_01003, FIPS_01005]) // create a matrix


// Example calls
FIPS_standardized = standardize(FIPS_mat)
console.log(cosim(FIPS_standardized["_data"][0], FIPS_standardized["data"][1]))


// Nested loop to compare focal unit to all other units
let cossim_mat = math.zeros(1, 3)
let cosine_mat_dims = math.size(cossim_mat)
let ncol = cosine_mat_dims.get([1])

for (i = 0; i < 1; i++) {
  for (j = 0; j < ncol; j++) {
    if (i != j) {
      cossim_mat.set([i, j], cossim(FIPS_standardized["_data"][i], FIPS_standardized["_data"][j]))
    }
  }
}

console.log(cossim_mat)

