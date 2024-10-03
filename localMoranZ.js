// Calculate expected value of Local Moran's I, variance in Local Moran's I and
// standard (Z) score.

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
function localMoranZ(dataArray, weightMatrix, conditional = true) {
  let n = weightMatrix.length;
  let expectedValueArray = Array(n) // Make blank Arrays that will be populated in a for-loop.
  let varianceArray = Array(n)
  // Calculate mean and variance
  let Ybar = sumArray(dataArray) / n;
  let m2 = sumArray(dataArray.map(yj => (yj - Ybar) ** 2)) / (n);     
  let m4 = sumArray(dataArray.map(yj => (yj - Ybar) ** 4)) / (n);
  let b2 = m4 / (m2 ** 2)
  for (let i = 0; i < n; i++) {
    let valuesConnected =  multiplyArrays(dataArray, weightMatrix[i]);
    let weightsConnected =  weightMatrix[i];
    let weightsConnectedMinusi = removeElement(weightsConnected, i);
    let weightsConnectedMinusi2 = weightsConnectedMinusi.map(i => i ** 2);
    let Wi = sumArray(weightsConnectedMinusi);
    let Wi2 = sumArray(weightsConnectedMinusi2);
    let yi = valuesConnected[i];
    if (conditional == true) {
      expectedValueArray[i] = -1 * ((((yi - Ybar) ** 2) * Wi) / ((n - 1) * m2));
      let vC1 = ((yi - Ybar) / m2) ** 2;
      let vC2 = n / (n - 2);
      let vC3 = Wi2 - (Wi ** 2 / (n - 1));
      let vC4 = m2 - (((yi - Ybar) ** 2) / (n - 1));
      varianceArray[i] = vC1 * vC2 * vC3 * vC4;
    } else if (conditional == false) {
      expectedValueArray[i] = (-1 * Wi) / (n - 1);
      let vT1 = (Wi2 * (n - b2)) / (n - 1);
      let vT2 = (((Wi ** 2) - Wi2) * ((2 * b2) - n)) / ((n - 1) * (n - 2));
      let vT3 = ((-1 * Wi) / (n - 1)) ** 2;
      varianceArray[i] = vT1 + vT2 - vT3;
    }
  }
  let localI = localMoran(dataArray, weightMatrix)
  let localIMinusExpectedLocalI = subtractArrays(localI, expectedValueArray)
  let standardDeviationArray = varianceArray.map(x => x ** 0.5);
  let zScore = localIMinusExpectedLocalI.map((x, i) => x / standardDeviationArray[i])
  
return([localI, expectedValueArray, varianceArray, zScore]);
}
// END

console.log(localMoranZ(peakValleyFlat, bMat))
// console.log(localMoranZ(peakValleyFlat, bMat, conditional = false))
// console.log(localMoranZ(peakValleyFlat, bMat)[1])
