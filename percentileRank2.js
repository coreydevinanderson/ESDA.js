// Function: percentileRank2()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//------------------------------------------------------------------------------ 

// Description:

// Function for calculating percentile ranks based on the "min" criterion for
// breaking tied ranks. This version of the function (as compared to 
// percentileRank()) accounts for null values and does not depend on math.js

//------------------------------------------------------------------------------ 

// Parameters: 
// arr : a 1D array of numbers for which percentile ranks are to be calculated.

// Returns: a 1D array of percentile ranks.

//------------------------------------------------------------------------------ 
//------------------------------------------------------------------------------ 

// percentileRank2()

// START
function percentileRank2(arr) {
  
    // Count up the "null" values in the array. We will use this to adjust our 
    // ranking method for null values.
    
    let nullCount = 0
    for (i = 0; i < arr.length; i++) {
      if (arr[i] == null) {
        nullCount +=1
      }
    }
    
    // Now rank the raw values.
    // 'null' values will be sorted to the beginning of the array, if present.
    // .slice() prevents sorting of the source array (arr) in the method chain.
    let sorted = arr.slice().sort(function(a, b){return a - b});  // 
                                                                    
    // To get ranks...each value in the source array is matched to the index 
    // of its position in the sorted array. Because JS is zero-indexed, a value of 1 
    // is added to make it a rank.
    
    // Tied values are given the rank of the first (or 'minimum') value in the tied 
    // series.
    
    let adj = 1;  // The value used to transform the zero-indexed position to a rank
                  // (starting with a rank of 1). 'null' values are sorted to the 
                  // beginning of the array and offset the count; to account for this, 
                  // 'null_count' is subtracted from 'adj'.
    
    let rank = arr.map(function(i){if (i != null) {return sorted.indexOf(i) + (adj - nullCount)} else {return i}});
    
    // Use map to calculate percentile rank from rank using the equation (x_i - 1) / (n - 1)
    
    // Use .map to subtract one from rank: (x_i - 1)
    let numerator = rank.map(function(x){if (x != null) {return x - 1} else if (x == null) {return x}});
    
    // Use .map to the divide the numerator by the denominator
    // Note that the length of the array has to be adjusted to account for the nulls.
    let pR = numerator.map(function(x){if (x != null) {return x / ((arr.length - nullCount) - 1)} else if (x == null) {return x}});
    
    // round to four decimals (returns an array of strings)
    let pR_out = pR.map(function(x){if (x != null) {return parseFloat(x.toFixed(4))} else if (x == null) {return x}});
  
  return pR_out;
  }
  // END
  
//------------------------------------------------------------------------------ 
//------------------------------------------------------------------------------ 
