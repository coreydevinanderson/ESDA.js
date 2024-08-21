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

// START
function GetisOrdGiStarZ(dataArray, weightMatrix) {
    let n = weightMatrix.length;  // row count = number of locations (n)
    let totalSum = sumArray(dataArray);  // sum values in data array
    let Xbar = totalSum / n;
    let s = ((sumArray(dataArray.map(xj => xj ** 2)) / n) - Xbar ** 2) ** 0.5;
    let zOut = new Array(n);  // make blank array to populate
    for (let i = 0; i < n; i++) { // calculate Gi* statistics for each location
      let valuesConnected = multiplyArrays(dataArray, weightMatrix[i]);
      let sumxj = sumArray(valuesConnected);
      let WiStar = sumArray(weightMatrix[i]);
      let S1iStar = sumArray(weightMatrix[i].map(wij => wij ** 2));
      zOut[i] = (sumxj - (Xbar * WiStar)) / (s * (((n * S1iStar) - WiStar ** 2) / (n - 1)) ** 0.5)
    }
  return zOut;  
  }
  // END
  
  // let testZ_B = GetisOrdGiStarZ(peakValleyFlat, bMat)
  // let testZ_W = GetisOrdGiStarZ(peakValleyFlat, rowStandardize(bMat))
  // console.log(testZ_B)
  // console.log(testZ_W)
  
  // let startGiStarZ = performance.now()
  // let GiStarZ = GetisOrdGiStarZ(jsonObject1, rowStandardize(jsonObject2))
  // let endGiStarZ = performance.now()
  // console.log("Time to calculate GiStarZ for all US counties with row-standardization: " + ((endGiStarZ - startGiStarZ) / 1000).toPrecision(3) + " seconds")
  
  // console.log(GiStarZ)
  