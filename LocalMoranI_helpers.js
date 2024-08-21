// Helper functions (originally developed for Mahalanobis1,2):

// START
function multiplyArrays(a, b) {
  let c = a.map((x, i) => {if (x == null || b[i] == null) {return null} else {return (x * b[i])}});
return c;
}
// END


// START
function subtractArrays(a, b) {
  let c = a.map((x, i) => {if (x == null || b == null) {return null} else {return (x - b[i])}});
return c;
}
// END


// START
function sumArray(a) {
  let sum = 0;
  a.forEach(element => sum = element + sum);
return sum;
}
// END


// New helper:

// START
function  divideByScalar(yourArray, yourScalar) {
  let outArray = yourArray.map((x) => x / yourScalar);
return(outArray);
}
// END 

// let testArray = bMat[0];
// let testScalar = sumArray(bMat[0]);
// console.log(divideByScalar(testArray, testScalar));

// START
function  divideByScalar2(yourArray, yourScalar) {
  let outArray = yourArray.map((x) => {if (x == null) {return null} else {return (x / yourScalar)}});
return(outArray);
}
// END 

// Need to add null element.
// let testArrayLength = testArray.length
// let testScalar = sumArray(bMat[0]);
// console.log(divideByScalar2(testArray, testScalar));


// Row standardize weights matrix

// START
function rowStandardize(weightMatrix) {
  let weightMatrixCopy = weightMatrix.slice(0);
  let weightMatrixOut = weightMatrixCopy;
  let nRows = weightMatrixCopy.length;
  for (let i = 0; i < nRows; i++) {
    let rowSum = sumArray(weightMatrixCopy[i]);
    weightMatrixOut[i] = divideByScalar(weightMatrixCopy[i], rowSum)
  }
return(weightMatrixOut);  
}
// END


// New Helper:

// START
function removeElement(yourArray, index) {
  let clone = yourArray.slice(0) // make copy with .slice()
  delete clone[index]  // delete element by index
  let cloneMinusIndex = clone.filter(i => true)
return(cloneMinusIndex)
}
// END
