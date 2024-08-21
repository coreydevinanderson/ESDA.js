
// Functions: 
// GetisOrdGi()     - includes values from locations j connected to location i
//                    but excludes the value at i in the calculation. 
// GetisOrdGiStar() - includes the value at location (i).
// GetisOrdGiStarZ()- produces a standard (z) score reather than the Gi or GiStar
//                    statistic.
// GetisOrdGiStarZ_nulls() - same as GetisOrdGiStarZ but handles null values in
//                           the data array (the connections matrix should include
//                           all locations, regardless of whether or not data
//                           are missing for a variable at that locaion).
// GetisOrdGiZ()   - standard (z) score transformation of Gi statistic.

// Functions for spatial randomization test of Gi*:
// permuteGetisOrdGiStar(), testGetisOrdGiStar()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//------------------------------------------------------------------------------//

// Description: 

// Calculates Getis-Ord statistics (Gi* and Gi) for determining local hot (and 
// cold) spots. Getis-Ord Gi* includes the focal location (i) in the calculation
// whereas Gi does not. The functions GetisOrdGiStarZ() and GetisOrdGiZ() return
// standard variates (z-scores) based on observed and expected Getis-Ord
// statistics. Currently, one function (GetisOrdGiStarZ_nulls) can handle null 
// values, and others will be added in the near future. Such functions essentially
// return the same result as if you dropped the location prior to building weights
// and calculating the test statistics.

//------------------------------------------------------------------------------//

// Parameters:
// dataArray    : a 1D Array containing the values at each location.
// weightMatrix : a square matrix (n x n) represented as a 2D Array containing 
//                the pairwise weights. Each 1D Array within the 2D Array 
//                represents the connections for a particular location and should
//                be in the same order as the data values in yourArray.
// nsim         : number of permutations (for testGetisOrdGiStar).

// Notes: increasing the number of permutations (nsim) may cause an infinite
// loop error in codepen.io, or loading delays.

// Parameters for main functions:

// GetisOrdGiStar(dataArray, weightMatrix)
// GetisOrdGi(dataArray, weightMatrix)
// GetisOrdGiStarZ(dataArray, weightMatrix)
// GetisOrdGiZ(dataArray, weightMatrix)

// permuteGetisOrdGiStar(dataArray, weightMatrix)
// testGetisOrdGiStar(dataArray, weightMatrix, nsim = 999)
// rowStandardize(weightMatrix)

//------------------------------------------------------------------------------//

// Helper functions:

// divideByScalar()
// rowStandardize()
// removeElement
// multiplyArrays()
// sumArray()

//------------------------------------------------------------------------------

console.log("begin")

// Example data from 5 x 5 grid with peak pattern.

let peakValley = [[1, 1, 1, 1, 1], 
                  [1, 3, 3, 3, 1],
                  [1, 3, 5, 3, 1], 
                  [1, 3, 3, 3, 1],
                  [1, 1, 1, 1, 1]]

let peakValleyFlat = peakValley.flat();
// console.log(peakValleyFlat)

let  peakValley_nulls = [[1, 1, null, 1, 1,
                          1, 3, 3, 3, 1, 
                          1, 3, 5, 3, 1, 
                          1, 3, 3, 3, 1, 
                          1, 1, 1, 1, 1]]

let peakValleyFlat_nulls = peakValley_nulls.flat()
// console.log(peakValleyFlat_nulls)


// This is the corresponding binary connection matrix for the 5 x 5 grid (for 
// peakValley, above) based on a rook connectionon scheme, where location i 
// is connected to itself (note the diagonal 1s).

let bMat = [[1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],               
            [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1]];


//------------------------------------------------------------------------------

// Real test data
// Diabetes proportions in 3140 US Counties
// Uncomment to load using: ctrl + /

// let url1 = "https://raw.githubusercontent.com/coreydevinanderson/ESDA.js/main/data/diabetes.json"
// let url2 = "https://raw.githubusercontent.com/coreydevinanderson/ESDA.js/main/data/bMAT.json"

// let readDiabetesStart = performance.now();
// let xhReq1 = new XMLHttpRequest();
// xhReq1.open("GET", url1, false);
// xhReq1.send(null);
// let jsonObject1 = JSON.parse(xhReq1.responseText);
// let readDiabetesEnd = performance.now()
// console.log("Time to read diabetes data: " + ((readDiabetesEnd - readDiabetesStart) / 1000).toPrecision(3) + " seconds")


// let readWeightsStart = performance.now();
// let xhReq2 = new XMLHttpRequest();
// xhReq2.open("GET", url2, false);
// xhReq2.send(null);
// let jsonObject2 = JSON.parse(xhReq2.responseText);
// let readWeightsEnd = performance.now();
// console.log("Time to read weights matrix: " + ((readWeightsEnd - readWeightsStart) / 1000).toPrecision(3) + " seconds")

// console.log(jsonObject1)
// console.log(jsonObject2)

// Vermont example

// let url3 = "https://raw.githubusercontent.com/coreydevinanderson/ESDA.js/main/data/ALAND_JSON.json"
// let url4 = "https://raw.githubusercontent.com/coreydevinanderson/ESDA.js/main/data/bMat_VT.json"

// let xhReq1 = new XMLHttpRequest();
// xhReq1.open("GET", url3, false);
// xhReq1.send(null);
// let ALAND = JSON.parse(xhReq1.responseText);
// ALAND = ALAND.map(x => Number(x));
// ALAND[6] = null;

// let xhReq2 = new XMLHttpRequest();
// xhReq2.open("GET", url4, false);
// xhReq2.send(null);
// let bMat_VT = JSON.parse(xhReq2.responseText);
// console.log(bMat_VT)

// console.log(bMat_VT)