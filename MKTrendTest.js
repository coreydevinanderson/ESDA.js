// Mann Kendall Trend Test in JavaScript

// This is a work in progress...
// Pending additions/changes:

//------------------------------------------------------------------------------

// Authors: Corey Devin Anderson

// Conduct a Mann-Kendall Trend Test (for time series
// data). Separate helper functions calculate the test score "S", the variance
// in S, and z-score tranformation (if appropriate). If n <= 10, significance
// levels are inferred from the probability table in Gilbert (1987). 

// Helpers:
// calculateS(yourArray)
// varianceS(yourArray)
// zMK(yourArray)  // if n > 10
// pSmall(yourArray) // if 4 <= n <= 10

// MKTrendTest(yourArray, tails = 2, direction = null))
// Uses calculateS() and varianceS(). If n > 10, uses zMK to conduct a z-score
// transformation and standard normal distribution to infer P.

// Dependencies:
// simple-statistics: ss.cumulativeStdNormalProbability(zScore);

//------------------------------------------------------------------------------

// Generate test data:

// Simulate random integer:
// let randomInt = Math.floor((Math.random() * 100) + 1)
// console.log(randomInt)

// Simulate an array of integers:
// let randomArray = new Array(10)
// console.log(randomArray)
// for(let i = 0; i < 10; i++) {
//   randomArray[i] = randomInt = Math.floor((Math.random() * 100) + 1)
// }

// console.log(randomArray)

// Example test Array simulated using the code above:

let randomArray = [39, 45, 79, 93, 28, 86, 38, 37, 27, 65];
let randomArray_tied = [39, 45, 79, 93, 28, 86, 38, 37, 27, 65, 39];
let randomArray_tied_null = [39, 45, null, 93, 28, 86, 38, 37, 27, 65, 39]
let randomArrayX = [39, 45, 79, 93, 28]; // First five values.
let randomArrayX_null = [39, 45, null, 93, 28]
let randomArrayX_tied = [39, 45, 79, 92, 28, 39]; // First five values plust the first value duplicated at the end of the Array.

let sortedArray = randomArrayX_tied.toSorted();
// console.log(sortedArray)

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// START
function calculateS(yourArray) {
  // remove nulls
  yourArray = yourArray.filter(element => element != null)
  let n = yourArray.length;
  // Get sign of all unique pairwise differences between j and i
  let S = 0; // initialize S at zero.
  let sign = 0; // make zero the default sign (difference = 0).

  // Loop over i and j to get all unique off diagonal pairs:
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (i != j) {
        let diff = yourArray[j] - yourArray[i];
        if (diff > 0) {
          sign = 1;
        } else if (diff == 0) {
          sign = 0;
        } else if (diff < 0) {
          sign = -1;
        }
      }
      S = S + sign;
    }
  }
  return S;
}
// End

// console.log(calculateS(randomArrayX));
// console.log(calculateS(randomArray_tied));
// console.log(calculateS(randomArray_tied))
// console.log(calculateS(randomArray_tied_null))

//------------------------------------------------------------------------------

//START
function varianceS(yourArray) {
  yourArray = yourArray.filter(element => element != null)
  let n = yourArray.length;
  let countNumbers = {};
  for (const element of yourArray) {
    if (countNumbers[element]) {
      countNumbers[element] += 1;
    } else {
      countNumbers[element] = 1;
    }
  }

  let countNumbersValues = Object.values(countNumbers);

  // Filter such that only count >= 2 retained.
  let countsX = countNumbersValues.filter((v) => v >= 2);
  let g = countsX.length; // The number of tied values in the series.

  // Calculate variance
  // Break into two pieces: tpSum and nSum.
  let tpSum = 0;

  for (let i = 0; i < g; i++) {
    tpSum = tpSum + countsX[i] * (countsX[i] - 1) * (2 * countsX[i] + 5);
  }

  let nSum = n * (n - 1) * (2 * n + 5);

  // Now put them all together...
  let varS = (1 / 18) * (nSum - tpSum);
  return varS;
}
// END

let varS = varianceS(randomArray_tied);
// console.log(varS);
// Compute MK test statistic zMK

//------------------------------------------------------------------------------

// START
function zMK(yourArray) {
  yourArray = yourArray.filter(element => element != null);
  n = yourArray.length;
  if (n <= 10) {
    console.log(
      "The sample size is too small for a z-score approximation; please use pSmall()."
    );
    return;
  }
  let S = calculateS(yourArray);
  let varS = varianceS(yourArray);
  if (S > 0) {
    z = (S - 1) / varS ** 0.5;
  } else if (S == 0) {
    z = 0;
  } else if (S < 0) {
    z = (S + 1) / varS ** 0.5;
  }
  return z;
}
// END

// console.log(zMK(randomArrayX))
// console.log(zMK(randomArrayX_tied))

//------------------------------------------------------------------------------

// Need to look at paper to see how 1- vs. 2-tailed P-values are handled and if abs(S) is used for negative S (assuming so).

// START
function pSmall(yourArray, tails = 1) {
  yourArray = yourArray.filter(element => element != null)
  let n = yourArray.length;
  let p = 0;
  if (n < 4) {
    console.log(
      "Your sample size is too small to conduct the Mann-Kendall Trend Test."
    );
    return;
  }
  testJSON = {
    4: { 0: 0.625, 2: 0.375, 4: 0.167, 6: 0.042 },
    5: { 0: 0.592, 2: 0.408, 4: 0.242, 6: 0.117, 8: 0.042, 10: 0.0083 },
    6: {
      1: 0.5,
      3: 0.36,
      5: 0.235,
      7: 0.136,
      9: 0.068,
      11: 0.028,
      13: 0.0083,
      15: 0.0014
    },
    7: {
      1: 0.5,
      3: 0.386,
      5: 0.281,
      7: 0.191,
      9: 0.119,
      11: 0.068,
      13: 0.035,
      15: 0.015,
      17: 0.0054,
      19: 0.0014,
      21: 0.0002
    },
    8: {
      0: 0.548,
      2: 0.452,
      4: 0.360,
      6: 0.274,
      8: 0.199,
      10: 0.138,
      12: 0.089,
      14: 0.054,
      16: 0.031,
      18: 0.016,
      20: 0.0071,
      22: 0.0028,
      24: 0.00087,
      26: 0.00019,
      28: 0.000025
    },
    9: {
      0: 0.54,
      2: 0.46,
      4: 0.381,
      6: 0.306,
      8: 0.238,
      10: 0.179,
      12: 0.13,
      14: 0.09,
      16: 0.06,
      18: 0.038,
      20: 0.022,
      22: 0.012,
      24: 0.0063,
      26: 0.0029,
      28: 0.0012,
      30: 0.00043,
      32: 0.00012,
      34: 0.000025,
      36: 0.0000028
    },
    10: {
      1: 0.5,
      3: 0.431,
      5: 0.364,
      7: 0.3,
      9: 0.242,
      11: 0.19,
      13: 0.146,
      15: 0.108,
      17: 0.078,
      19: 0.054,
      21: 0.036,
      23: 0.023,
      25: 0.014,
      27: 0.0083,
      29: 0.0046,
      31: 0.0023,
      33: 0.0011,
      35: 0.00047,
      37: 0.00018,
      39: 0.000058,
      41: 0.000015,
      43: 0.0000028,
      45: 0.00000028
    }
  };

  let S = calculateS(yourArray);
  let SAbs = Math.abs(S);
  let subJSON = testJSON[n.toString()];
  let subJSON_keys = Object.keys(subJSON);
  
  if (subJSON_keys.includes(SAbs.toString())) {
    p = subJSON[SAbs.toString()];
  } else if (!(subJSON_keys.includes(SAbs.toString()))) {
    SPlus = SAbs + 1;
    p = subJSON[SPlus.toString()];
  }
  if (tails == 2) {
    p = p * 2
    if (p > 1) {
      p = 1
    }
  }
  return p;
}
// END

// console.log(pSmall(randomArrayX))
// console.log(pSmall(randomArrayX, tails = 2))

//------------------------------------------------------------------------------

// Calculate P-value for Mann-Kendall Trend test
// If n > 10, use z-score transformation.

// Efficiency could be improved by only calling certain functions one time (e.g., calculateS). Will work on this.

// START
function MKTrendTest(yourArray, tails = 1, direction = "right") {
  yourArray = yourArray.filter(element => element != null)
  let S = calculateS(yourArray);
  let n = yourArray.length;
  if (n > 10) {
    let zScore = zMK(yourArray);
    if ((zScore < 0) & (direction == "right")) {
      console.log("Your z-score is negative and the test direction ='right'. Consider direction = 'left'.")
    }
    if ((tails == 1) & (direction == "right")) {
      pOut = 1 - ss.cumulativeStdNormalProbability(zScore);
    } else if ((tails == 1) & (direction == "left")) {
      pOut = ss.cumulativeStdNormalProbability(zScore);
    }
    if (tails == 2) {
      if (zScore > 0) {
        pOut = 2 * (1 - ss.cumulativeStdNormalProbability(zScore));
      } else if (zScore < 0) {
        pOut = 2 * ss.cumulativeStdNormalProbability(zScore);
      } else if (zScore == 0) {
        pOut = 1;
      }
    }
    outJSON = {"n":n, "S":S, "zMK":zScore, "p":pOut}
  } else if (n <= 10) {
    console.log("For sample sizes less than or equal to 10, p-values are based on Gilbert (1987)(table 17-5).")
    pOut = pSmall(yourArray, tails = tails);
    outJSON = {"n":n, "S":S, "p":pOut}
  } 
return outJSON;
}
// END

// console.log(MKTrendTest(randomArrayX));
// console.log(MKTrendTest(randomArrayX_null));

// console.log(MKTrendTest(randomArray, tails = 2));
// console.log(MKTrendTest(randomArray, tails = 1, direction = "left"));
// console.log(MKTrendTest(randomArray, tails = 2));
// console.log(MKTrendTest(randomArray_tied, tails = 1, direction = "left"))
// console.log(MKTrendTest(randomArray_tied, tails = 2))
// console.log(MKTrendTest(randomArray_tied_null));

// console.log(MKTrendTest(randomArray_tied, tails = 1, direction = "left"));

//------------------------------------------------------------------------------
