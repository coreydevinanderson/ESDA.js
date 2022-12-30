// Function: percentileRank()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//------------------------------------------------------------------------------ 

// Description:

// Function for calculating percentile ranks based on the "min" criterion for
// breaking tied ranks.

// Use percentileRank2() if Arrar contains null components.

//------------------------------------------------------------------------------ 

// Parameters: 
// arr : a 1D array of numbers for which percentile ranks are to be calculated.

// Returns: a 1D array of percentile ranks.

//------------------------------------------------------------------------------ 
//------------------------------------------------------------------------------ 

// Run from START to END

// concise (ES6) version with arrow functions
// START
function percentileRank(arr) {
    let sorted = arr.slice().sort((a, b) => a - b);
    let rank = arr.map(i => sorted.indexOf(i) + 1);
    let pR = math.round(math.divide(math.add(rank, -1), arr.length - 1), 4)
  return pR;
  }
  // END
  
  // // START
  // function percentileRank(arr) {
  //   let sorted = arr.slice().sort(function(a, b){return a - b});
  //   let rank = arr.map(function(i){return sorted.indexOf(i) + 1});
  //   let pR = math.round(math.divide(math.add(rank, -1), arr.length - 1), 4)
  // return pR;
  // }
  // // END
  
//------------------------------------------------------------------------------ 
 //------------------------------------------------------------------------------ 
