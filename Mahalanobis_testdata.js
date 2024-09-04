
// Example data: for Mahalanobis1.js and Mahalanobis2.js

// Load data (from JSON on GitHub) for prototyping:

// Uncomment url to begin...

// let url = "https://raw.githubusercontent.com/coreydevinanderson/ESDA.js/main/test.json";

let xhReq = new XMLHttpRequest();
xhReq.open("GET", url, false);
xhReq.send(null);
let jsonObject = JSON.parse(xhReq.responseText);

// console.log(Object.keys(jsonObject))
// ["County_FIPS","County","State","EPL_AGE65","EPL_POV","EPL_MINRTY","EPL_NOHSDP","EPL_UNEMP","Diabetes_pct"]

// Save indicators as separate variables for protoyping:

let EPL_AGE65 = jsonObject.EPL_AGE65;
let EPL_POV = jsonObject.EPL_POV;
let EPL_MINRTY = jsonObject.EPL_MINRTY;
let EPL_NOHSDP = jsonObject.EPL_NOHSDP;
let EPL_UNEMP = jsonObject.EPL_UNEMP;
let Diabetes_pctr = jsonObject.Diabetes_pct;

let EPL_AGE65_10 = EPL_AGE65.slice(0, 10);
let EPL_POV_10 = EPL_POV.slice(0, 10);
let EPL_MINRTY_10 = EPL_MINRTY.slice(0, 10);
let EPL_NOHSDP_10 = EPL_NOHSDP.slice(0, 10);
let EPL_UNEMP_10 = EPL_UNEMP.slice(0, 10);
let Diabetes_pctr_10 = Diabetes_pctr.slice(0, 10);

let testMatrix_10 = [EPL_AGE65_10, EPL_POV_10, EPL_MINRTY_10, EPL_NOHSDP_10, EPL_UNEMP_10, Diabetes_pctr_10];

//------------------------------------------------------------------------------

// Example data:
// Data are percentile ranks for five indicators from SVI 2018 and diabetes:

const FIPS_01001 = [0.1850, 0.5401, 0.6336, 0.4397, 0.2745, 0.7074]; 
const FIPS_01003 = [0.6428, 0.2239, 0.5158, 0.3209, 0.3121, 0.4925];
const FIPS_01005 = [0.4893, 0.9631, 0.8965, 0.9701, 0.9217, 0.9799];

// with nulls
const FIPS_01001x = [0.1850, null, 0.6336, 0.4397, 0.2745, 0.7074]; 
const FIPS_01003x = [0.6428, 0.2239, 0.5158, null, 0.3121, 0.4925];

// console.log(distEuclidean(FIPS_01001, FIPS_01003))
// console.log(distEuclidean2(FIPS_01001x, FIPS_01003x))

// console.log(subtractVectors(FIPS_01001, FIPS_01003))
// console.log(subtractVectors(FIPS_01001x, FIPS_01003))

let testMatrix = [FIPS_01001, FIPS_01003, FIPS_01005];
let testMatrixX = [FIPS_01001x, FIPS_01003x, FIPS_01005];

// console.log(testMatrix);
// console.log(testMatrixX);
