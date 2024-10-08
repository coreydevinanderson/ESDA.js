// Function: localMoranI

// Author: Corey Devin Anderson

//------------------------------------------------------------------------------//

// Requires:
// sumArray()
// multiplyArrays()
// (SEE: localMoranI_helpers.js)

// Description:

// JavaScript functions for calculating Local Moran's I (sensu Anselin 1995). The 
// function localMoranI() calculates the values of Local Moran's I at each location 
// given a flattened data array and a spatial weights matrix. The function
// localMoranI_nulls can accomodate missing (null) values.

//------------------------------------------------------------------------------//

// Parameters:
// dataArray    : a 1D Array containing the values at each location.
// weightMatrix : a square matrix (n x n) represented as a 2D Array containing 
//                the pairwise weights. Each 1D Array within the 2D Array 
//                represents the connections for a particular location and should
//                be in the same order as the data values in yourArray.

// Returns:
// localMoranI()
// a 1D Array containing the value of Local Moran's I at each location.

//------------------------------------------------------------------------------//

// START
function localMoranI(dataArray, weightMatrix) {
  let totalSum = sumArray(dataArray);
  let n = weightMatrix.length;
  let Ybar = totalSum / n;
  let yjMinusYbar = dataArray.map(yj => yj - Ybar); // precalculate yj - Ybar
  let yjMinusYbarSquared = yjMinusYbar.map(y => y ** 2);
  let m2 = sumArray(yjMinusYbarSquared) / n;  // Calculate variance based on entire population.
  let iOut = new Array(n);
  for (let i = 0; i < n; i++) {
    let valuesConnected = multiplyArrays(yjMinusYbar, weightMatrix[i]); // This will zero out any values that are not connected to i.
    let sumyjMinusYbar = sumArray(valuesConnected);
    iOut[i] = +(((dataArray[i] - Ybar) * sumyjMinusYbar) / m2).toFixed(2);
  } 
return(iOut);
}
// END

// console.log(localMoranI(peakValleyFlat, bMat))
