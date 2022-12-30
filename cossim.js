// Function:: cosSim()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//------------------------------------------------------------------------------ 

// Description:

// Vectorized function for calculating cosine similarity. Utilizes matrix
// algebra functions math.dot() and math.norm() from math.js (default norm type 
// is L2, which is what we want here).

//------------------------------------------------------------------------------ 

// Parameters: 
// a, b : Attribute arrays to be compared.

//

// Returns : cosine similarity estimate for the pair (a, b)

// For Adjusted Cosine Similarity, used adjusted() and then pass to cossim().

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------ 


// Run from START to END:

// START
function cosSim(a, b) {
  return math.dot(a, b) / (math.norm(a) * math.norm(b));
}
// END  