// Calculate Local Moran's I

// Requires LocalMoranI_helpers.js

// Description:

// JavaScript functions for calculating Local Moran's I (sensu Anselin 1995). The 
// function localMoran() calculates the values of Local Moran's I at each location 
// given a flattened data array and a spatial weights matrix. The function 
// localMoranVariance() also returns the values of Local Moran's I at each 
// location, but includes expected Local Moran's I, variance in Local Moran's I, 
// and the corresponding z-scores. By default, localMoranVariance() returns 
// expected values and variance based on the conditional permutation assumption 
// (following the method of in Sokal et al. 1998, as outlined in Bivand and Wong 
// 2018), but can also return values based on the total permutation assumption.

//------------------------------------------------------------------------------//

// Parameters:
// dataArray    : a 1D Array containing the values at each location.
// weightMatrix : a square matrix (n x n) represented as a 2D Array containing 
//                the pairwise weights. Each 1D Array within the 2D Array 
//                represents the connections for a particular location and should
//                be in the same order as the data values in yourArray.
// conditional  : for localMoranVariance(), boolean true or false indicating 
//                whether expected Local Moran's I and variance in Local Moran's 
//                I is calculated under the conditional (true) or total (false)
//                permutation assumption. Default is conditional = true.

// Returns:
// localMoran()
// a 1D Array containing the value of Local Moran's I at each location.
// localMoranVariance()
// a 2D Array containing Local Moran's I [0], expected Local Moran's I [1], 
// variance in Local Moran's I [2], and corresponding z-scores [3].


// START
function localMoran(dataArray, weightMatrix) {
  let totalSum = sumArray(dataArray);
  let n = weightMatrix.length;
  let Ybar = totalSum / n;
  let yjMinusYbar = dataArray.map(yj => yj - Ybar); // precalculate yj - Ybar
  let yjMinusYbarSquared = yjMinusYbar.map(y => y ** 2);
  let m2 = sumArray(yjMinusYbarSquared) / n;  // Calculate variance based on entire population.
  let iOut = new Array(n);
  for (let i = 0; i < n; i++) {
    let valuesConnected = multiplyArrays(yjMinusYbar, weightMatrix[i]); // This will zero out any values that are not connected to i.
    let valuesConnectedMinusi = removeElement(valuesConnected, i);  // remove focal point i
    let sumyjMinusYbar = sumArray(valuesConnectedMinusi);
    iOut[i] = +(((dataArray[i] - Ybar) * sumyjMinusYbar) / m2).toFixed(2);
  } 
return(iOut);
}
// END

// console.log(localMoran(peakValleyFlat, bMat))
