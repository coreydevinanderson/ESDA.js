// Function: Mahalanobis1.js

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

//----------------------------------------------------------------------------


// START
function Malhalanobis1(yourVector, yourMatrix, axis = "columns") {                     
                       
    if (axis == "columns") {
      var invCov = math.inv(vCov(yourMatrix, axis = "columns")["_data"]);
      var colMeans = columnMeans(yourMatrix);
      var step1 = subtractArrays(yourVector, colMeans);
      var step2 = math.multiply(step1, invCov);
      var step3 = math.multiply(step2, math.transpose(step1))
      var MD = step3 ** 0.5
    return MD;
    } else if (axis == "rows") {
      var invCov = math.inv(vCov(yourMatrix, axis = "rows")["_data"]);
      var means = columnMeans(yourMatrix, axis = "rows");
      var step1 = subtractArrays(yourVector, means);
      var step2 = math.multiply(step1, invCov);
      var step3 = math.multiply(step2, math.transpose(step1));
      var MD = step3 ** 0.5;
    return MD;
    }    
  }
  // END
  
  // console.log(Malhalanobis1(testVect, HSA))
  // console.log(Malhalanobis1(testVect, HSA2, axis = "rows"))
  // console.log(Malhalanobis1(getColumn(testMatrix_10, 9), testMatrix_10))
  