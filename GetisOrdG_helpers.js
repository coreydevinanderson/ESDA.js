// Helper functions for Getis-Ord Gi and Gi* (originally developed for Mahalanobis1,2)

// START
function multiplyArrays(a, b) {
  let c = a.map((x, i) => {if (x == null || b[i] == null) {return null} else {return (x * b[i])}});
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


// New helpers:

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

// START
function removeElement(yourArray, index) {
  let clone = yourArray.slice(0) // make copy with .slice()
  delete clone[index]  // delete element by index
  let cloneMinusIndex = clone.filter(i => true)
return(cloneMinusIndex)
}
// END

// START
function countNulls(x) {
  let sum = 0;
  x.forEach(element => {if (element == null) {sum = 1 + sum}});
return sum;
}

//------------------------------------------------------------------------------

// This is used in the permutation test of the Gi/Gi* statistic.

// Fisher-Yates shuffle algorithm

// From:
// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
// https://bost.ocks.org/mike/shuffle/

// This was a quick solution from the internet; there could other options.

// START
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
return array;
}
// END
