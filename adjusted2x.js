// Function: adjusted2x()

// Authors: Corey Devin Anderson and Kirankumar Batchu

// -----------------------------------------------------------------------------

// Description:

// Takes 1D Array and returns a 1D Array containing the mean-centered values 
// or standard (z) scores.

// For arrays containing null values, nulls are removed prior to calculating 
// means (and/or standard deviations), but are retained in the output array.

// The original version of this function (adjusted() and adjusted2()) work on 
// 2D Arrays and Dense Matrices and may be less efficient if your task is 
// limited to 1D Arrays.

// -----------------------------------------------------------------------------

// Parameters:
// yourArray : an unnested JavaScript Array

// method : rescaling to be applied to each array. Current options are "zscore" 
//          or "centered". Default is "centered".

// Returns:
// An Array of equal dimensions containing either mean-centerd or standard 
// (z) scores.

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// Function: adjusted2()

// START
function adjusted2x(yourArray, method = "centered") {

    // .filter the data to return only those that are not null
    let arrayClean = yourArray.filter(function(x) {if (x != null) {return true} else {return false}});
    
    // Get the mean and standard deviation of the null filtered Array
    let rowMean = math.mean(arrayClean); // take the mean of the Array using math.js
    let rowStd = math.std(arrayClean); // take the standard deviation of the Array using math.js 
        
    // .map a new Array of mean-centered values; returns null if null for that component.
    // Round each to four decimal places.
    // The +(unary plus operator) forces a number to be returned (otherwise you get a string).      
    let centered = yourArray.map(function(x){if (x == null) {return null} else if (x != null) {return +(x - rowMean)}});       
      
    // If the user chooses "zscore"
    // divide each mean-centered value by the standard deviation to get an Array of z-scores
    if (method == "zscore") {
      outArray = centered.map(function(x){if (x == null) {return null} else if (x != null) {return +(x / rowStd)}});         
    } else if (method == "centered") {
      outArray = centered
    } 
  
  return outArray;
  }
  // END
  
  //------------------------------------------------------------------------------
  //------------------------------------------------------------------------------
