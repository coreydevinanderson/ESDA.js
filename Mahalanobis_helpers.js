// Helper functions for Mahalanobis1.js and Mahalanobis2.js

//------------------------------------------------------------------------------

// START
function getColumn(yourMatrix, colNumber){
    let outColumn = [];
    let nrows = yourMatrix.length; 
    for (i = 0; i < nrows; i++) {
      let rowTemp = yourMatrix[i];
      let num = rowTemp[colNumber];
      outColumn.push(num);
    }
  return outColumn;
  }
  // END
  
  // console.log(getColumn(testMatrixX, 0))
  
  //------------------------------------------------------------------------------
  
  // START
  function arrayClean(a) {
    let aClean = a.filter(function(x){if (x != null) {return x}});
  return (aClean);
  }
  // END
  
  // console.log(arrayClean(getColumn(testMatrixX, 1)));
  
  //------------------------------------------------------------------------------
  
  // START
  function arrayMean(a) {
    let sum = 0;
    a.forEach(function(element){sum = sum + element});
    let n = a.length;
  return (sum / n);
  }
  // END
  
  // console.log(arrayMean(arrayClean(getColumn(testMatrix, 0))));
  
  //------------------------------------------------------------------------------
  
  // Now use getColumn() and arrayClean(), with arrayMean() to get the mean of 
  // each column in the Array.
  
  // START
  function columnMeans(yourMatrix, axis = "columns") {
    let blankArray = []
    
    if (axis == "columns") {
      let nCols = yourMatrix.length;
      for (k = 0; k < nCols; k++) {
        blankArray.push(arrayMean(arrayClean(yourMatrix[k])));
      }
      return (blankArray);
    } else if (axis == "rows") {
      let nCols = yourMatrix[0].length;  
      for (k = 0; k < nCols; k++) {
        blankArray.push(arrayMean(arrayClean(getColumn(yourMatrix, k))));
      }
      return (blankArray);
    }
  }  
  // END
  
  // console.log(columnMeans(testMatrix_10))
  
  
  //------------------------------------------------------------------------------
  
  // START
  function subtractArrays(a, b) {
    let c = a.map((x, i) => {if (x == null || b == null) {return null} else {return (x - b[i])}});
  return c;
  }
  // END
  
  //------------------------------------------------------------------------------
  
  // START
  function multiplyArrays(a, b) {
    let c = a.map((x, i) => {if (x == null || b[i] == null) {return null} else {return (x * b[i])}});
  return c;
  }
  // END
  
  //------------------------------------------------------------------------------
  
  // START
  function sumArray(a) {
    let sum = 0;
    a.forEach(element => sum = element + sum);
  return sum;
  }
  // END
  
  // console.log(sumArray(getColumn(testMatrix, 0)));
  
  // console.log(subtractArrays(testMatrix[0], testMatrix[1]))
  // console.log(math.subtract(testMatrix[0], testMatrix[1]))
  
  // console.log(multiplyArrays([2, 4, 6], [1, 3, 5]));
  // console.log(addArrays([2, 4, 6], [1, 3, 5]));
  
  // console.log(math.zeros(3, 3))
  // console.log(math.zeros(3, 3)["_data"])
  