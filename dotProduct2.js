// Function dotproduct2()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//------------------------------------------------------------------------------

// Description: 

// Function for calculating the dot product of two arrays. Similar to math.dot
// but can account for null components.

//------------------------------------------------------------------------------

// Parameters:
// a, b : 1D arrays of equal length for which the dot product will be calculated

// Returns: a scalar representing the dot product of a and b.

// Dependencies: none.

//------------------------------------------------------------------------------

// Version that does not handle null values.

// function dotProduct(a, b) {
//   let dotSum = 0;
//   let product = a.map((x, i) => (x * b[i]));
//   product.forEach(element => dotSum = dotSum + element)
//   return dotSum;
// }

// console.log(dotProduct(FIPS_01001, FIPS_01003))
// console.log(math.dot(FIPS_01001, FIPS_01003))

// START
function dotProduct2(a, b) {
  let dotSum = 0;
  let product = a.map(function(x, i){if (x != null && b[i] != null) {return x * b[i]} else {return null}});
  product.forEach(element => dotSum = dotSum + element)
  return dotSum;
}
// END

//------------------------------------------------------------------------------

