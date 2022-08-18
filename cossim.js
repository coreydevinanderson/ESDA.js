// Vectorized cosine similarity function with mathjs
// a and b are arrays to be compared

function cossim(a, b) {
    return math.dot(a, b) / (math.norm(a) * math.norm(b))
}
  
// test
// console.log(cossim(FIPS_standardized["_data"][0], FIPS_standardized["_data"][1]))
