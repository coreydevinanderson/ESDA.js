// cossim()

// Calcutes the cosine similarity for two arrays.

// Utilizes math.dot() and math.norm() from math.js
// Default norm is L2, which is what we want here.

function cossim(a, b) {
    return math.dot(a, b) / (math.norm(a) * math.norm(b));
  }
  