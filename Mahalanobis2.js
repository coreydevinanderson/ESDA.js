// Function: Mahalanobis2.js

// Authors: Corey Devin Anderson

//----------------------------------------------------------------------------

// Description:

// There are two main functions:

// Malhalanobis1() calculates the Malhalanobis distance between a row vector 
// and its column means. D = sqrt((x - mu)T * S ^ -1 * (x - mu)), where x is a 
// vector, mu is a vector of column means, and S ^ -1 is the inverted 
// covariance matrix.

// Malhalanobis2() calculates the Malhalanobis distance between two row
// vectors. D = sqrt((x - y)T * S ^ -1 * (x - y)), where y is the vector to
// which the distance from x is to be calculated.

//----------------------------------------------------------------------------

// Parameters:

// Mahalanobis1()

// yourVector : the focal 1D Array to which the distance from the multivariate
//              mean will be calculated.
// yourMatrix : a 2D Array representing all the data.
// axis       : a character (either "columns" or "rows") indicating whether the
//              sub-arrays represent row or column vectors. Default is 
//              is "columns".


// Mahalanobis2()

// yourVector1 : the first focal (1D) Array (x) 
// yourVector2 : the second focal (1D) Array (y)
// yourMatrix  : a 2D Array representing all the data.
// axis        : a character (either "columns" or "rows") indicating whether
//               the sub-arrays represent row or column vectors. Default is 
//               "columns".

// Returns:
// a number representing the Mahalanobis distance (from x to mu for
// Mahalanobis1 and from x to y for Mahalanobis2).

//----------------------------------------------------------------------------

// Requires: Mahalanobis_helpers.js

// Helper functions:

// getColumn()
// arrayClean()
// arrayMean()
// columnMeans()
// subtractArrays()
// multiplyArrays()
// addArrays()
// sumArray()
// vCov()

//------------------------------------------------------------------------------

// START
function Malhalanobis2(yourVector1, yourVector2, yourMatrix, axis = "columns") {                     
    if (axis == "columns") {
      var invCov = math.inv(vCov(yourMatrix, axis = "columns")["_data"])
    } else if (axis == "rows") {
      var invCov = math.inv(vCov(yourMatrix, axis = "rows")["_data"])
    }
    let step1 = subtractArrays(yourVector1, yourVector2);
    let step2 = math.multiply(step1, invCov);
    let step3 = math.multiply(step2, math.transpose(step1))
    let MD = step3 ** 0.5;
  return MD;
  }
  // END
  
  let testVect1 = [64.0, 580.0, 29.0];
  let testVect2 = [66.0, 570.0, 33.0];
  let testVect5 = [73.0, 600.0, 55.0];
  // console.log(Malhalanobis2(testVect1, testVect2, HSA))
  // console.log(Malhalanobis2(testVect1, testVect5, HSA))
  