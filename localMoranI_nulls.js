// Function: localMoranI_nulls

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
// a 1D Array containing the value of Local Moran's I at each location; locations
// with null values will be returned as null.

//------------------------------------------------------------------------------//

// START
function localMoranI_nulls(dataArray, weightMatrix) {
    let nAll = weightMatrix.length;
    let nullCount = countNulls(dataArray)
    let nX = nAll - nullCount;
    let Ybar = sumArray(dataArray) / nX
    let yjMinusYbar = dataArray.map(yj => {if (yj == null) {return null} else {return (yj -       Ybar)}});
    let yjMinusYbarSquared = yjMinusYbar.map(y => {if (y == null) {return null} else {return y **2}})
    let m2 = sumArray(yjMinusYbarSquared) / nX
    iOut = new Array(nAll)
    for (let i = 0; i < nAll; i++) {
      if (peakValleyFlat_nulls[i] == null) {
        iOut[i] = null;
      } else {
        let valuesConnected = multiplyArrays(yjMinusYbar, bMat[i]); // This will zero out any values    that are not connected to i.
      let sumyjMinusYbar = sumArray(valuesConnected);
      iOut[i] = +(((peakValleyFlat_nulls[i] - Ybar) * sumyjMinusYbar) / m2).toFixed(2);
      }
    }
  return(iOut)  
  }
  // END