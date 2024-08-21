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

// permuteGetisOrdGiStar(dataArray, weightMatrix)
// testGetisOrdGiStar(dataArray, weightMatrix, nsim = 999)
// rowStandardize(weightMatrix)

//------------------------------------------------------------------------------//

// Getis-Ord Gi
// Returns Array of containing the Gi values for each location.

// Requires GetisOrdG_helpers.js

// START
function GetisOrdGi(dataArray, weightMatrix) {
  let n = weightMatrix.length;  // row count = number of locations (n)
  let giOut = new Array(n);  // make blank array to populate
  for (let i = 0; i < n; i++) { // calculate Gi statistic for each location
    let totalSumMinusi = sumArray(removeElement(dataArray, i));
    let sumjConnectedToi = sumArray(multiplyArrays(removeElement(dataArray, i), removeElement(weightMatrix[i], i)))
    giOut[i] =  sumjConnectedToi / totalSumMinusi; 
  }
return giOut;  // return array of Gi* values
}
// END

// Example calls:
// console.log(GetisOrdGi(peakValleyFlat, bMat));
// console.log(GetisOrdGi(peakValleyFlat, rowStandardize(bMat)));
