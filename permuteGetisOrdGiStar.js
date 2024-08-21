// Functions: 
// GetisOrdGi()     - includes values from locations j connected to location i
//                    but excludes the value at i in the calculation. 
// GetisOrdGiStar() - includes the value at location (i).
// GetisOrdGiStarZ()- produces a standard (z) score reather than the Gi or GiStar
//                    statistic.
// GetisOrdGiStarZ_nulls() - same as GetisOrdGiStarZ but handles null values in
//                           the data array (the connections matrix should include
//                           all locations, regardless of whether or not data
//                           are missing for a variable at that locaion).
// GetisOrdGiZ()   - standard (z) score transformation of Gi statistic.

// Functions for spatial randomization test of Gi*:
// permuteGetisOrdGiStar(), testGetisOrdGiStar()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//------------------------------------------------------------------------------//

// Description: 

// Calculates Getis-Ord statistics (Gi* and Gi) for determining local hot (and 
// cold) spots. Getis-Ord Gi* includes the focal location (i) in the calculation
// whereas Gi does not. The functions GetisOrdGiStarZ() and GetisOrdGiZ() return
// standard variates (z-scores) based on observed and expected Getis-Ord
// statistics. Currently, one function (GetisOrdGiStarZ_nulls) can handle null 
// values, and others will be added in the near future. Such functions essentially
// return the same result as if you dropped the location prior to building weights
// and calculating the test statistics.

//------------------------------------------------------------------------------//

// Parameters:
// dataArray    : a 1D Array containing the values at each location.
// weightMatrix : a square matrix (n x n) represented as a 2D Array containing 
//                the pairwise weights. Each 1D Array within the 2D Array 
//                represents the connections for a particular location and should
//                be in the same order as the data values in yourArray.
// nsim         : number of permutations (for testGetisOrdGiStar).

// Notes: increasing the number of permutations (nsim) may cause an infinite
// loop error in codepen.io, or loading delays.

// Parameters for main functions:

// GetisOrdGiStar(dataArray, weightMatrix)
// GetisOrdGi(dataArray, weightMatrix)
// GetisOrdGiStarZ(dataArray, weightMatrix)
// GetisOrdGiZ(dataArray, weightMatrix)

//------------------------------------------------------------------------------//

// Calculate Gi* based on conditional permutations

// Warning: The time required for testGetisOrdGiStar() to execute with a 'large'  
// data set will likely result in a system timeout error. Adjust the PenTimer
// (in microseconds) accordingly:

// Ten minutes (10000 microseconds):
// window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 10000;

// For most web applications, you are encouraged to use the normal (z-score) 
// approximation instead of the permutation test. However, beware that the normal 
// approximation is questionable in cases when spatial units have a limited number
// of connections.

// Requires GetisOrdG_helpers.js

// START
function permuteGetisOrdGiStar(dataArray, weightMatrix) { 
  let n = weightMatrix.length;
  let total = sumArray(dataArray);
  let giOut = new Array(n);
  for (let i = 0; i < n; i++) {
    let fix = dataArray[i]; // copy the original value at location i
    let dataArrayCopy = dataArray.slice(0); // make shallow copy of entire array, otherwise it will modifiy the input array
    dataArrayCopy.splice(i, 1); // remove the focal location i from the copy
    let shuffled = shuffle(dataArrayCopy); // shuffle the remaining values
    shuffled.splice(i, 0, fix); // return i to its original location
    let numerator = sumArray(multiplyArrays(shuffled, weightMatrix[i])) // Calculate Gi* for permuted data array
    giOut[i] =  numerator / total;  // add to giOut by index i
  }
return giOut;  
}
// END

// let test2 = permuteGetisOrdGiStar(peakValleyFlat, rowStandardize(bMat))
// console.log(test2)

