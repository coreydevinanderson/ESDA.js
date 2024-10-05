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

//------------------------------------------------------------------------------//

// START
function GetisOrdGiStarZ_nulls(dataArray, weightMatrix) {
    let nullCount = countNulls(dataArray); // Use helper function to count the number of null values in the dataArray
    let nAll = weightMatrix.length; // The full length of the Array, including positions with null values; use this for iterating.
    let nX = nAll - nullCount;  // n = number of positions minus the number of nulls; use this for calculations.
    let totalSum = sumArray(dataArray);  // sum values in the dataArray.
    let Xbar = totalSum / nX;  // get average values in the dataArray.
    let s = ((sumArray(dataArray.map(xj => xj ** 2)) / nX) - Xbar ** 2) ** 0.5;  // standard deviation of values in the dataArray
    let zOut = new Array(nAll);  // make blank array to populate with z-scores
    for (let i = 0; i < nAll; i++) { // calculate Gi* statistics for each position; note we need to iterate through all of the positions, including those with null values.
      if (dataArray[i] == null) { // if the focal value is null, return null
        zOut[i] = null;
      } else {
        let valuesConnected = multiplyArrays(dataArray, weightMatrix[i]); // will return null if either is null
        let sumxj = sumArray(valuesConnected); // sum the values at connected locations
        let weightRow = weightMatrix[i];
        let weightRow_nulls = dataArray.map((x, j) => {if (x == null) {return null} else {return (weightRow[j])}})
        let WiStar = sumArray(weightRow_nulls);
        let S1iStar = sumArray(weightRow_nulls.map(wij => wij ** 2));
        zOut[i] = (sumxj - (Xbar * WiStar)) / (s * (((nX * S1iStar) - WiStar ** 2) / (nX - 1)) ** 0.5)
      }
    }
  return zOut;  
  }
  // END
  