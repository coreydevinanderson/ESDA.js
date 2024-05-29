// Function: distEuclidean3()

// Authors: Corey Devin Anderson and Kirankumar Batchu

//----------------------------------------------------------------------------

// Description: 

// Calculates the Euclidean distance between 1D Arrays of numbers. If one or 
// more values are null, a default value is returned.

//----------------------------------------------------------------------------

// Parameters:
// a, b : 1D Arrays of numbers to be compared.
// nullValuesReturn : Value that is returned if either array contains null 
//                    values. Default is -3.

// Returns: Euclidean distance between arrays (a, b).

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

// START
function distEuclidean3(a, b, nullValuesReturn = -3) {
    let testNull = (element) => element == null;
    aTest = a.some(testNull);
    bTest = b.some(testNull);
    let sum = 0;
    if (aTest == false && bTest == false){
      let squares = a.map((x, i) => (x - b[i]) ** 2); 
      squares.forEach(element => sum = sum + element); // Sum the squares
      sum = sum ** 0.5;
    } else {
      sum = nullValuesReturn;
    }
  return(sum);  
  }
  // END
  
  
  
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  
  // Example data:
  // Data are percentile ranks for five indicators from SVI 2018 and diabetes:
  
  const FIPS_01001 = [0.1850, 0.5401, 0.6336, 0.4397, 0.2745, 0.7074]; 
  const FIPS_01003 = [0.6428, 0.2239, 0.5158, 0.3209, 0.3121, 0.4925];
  const FIPS_01005 = [0.4893, 0.9631, 0.8965, 0.9701, 0.9217, 0.9799];
  
  // with nulls
  const FIPS_01001x = [0.1850, null, 0.6336, 0.4397, 0.2745, 0.7074]; 
  const FIPS_01003x = [0.6428, 0.2239, 0.5158, null, 0.3121, 0.4925];
  
  console.log(distEuclidean3(FIPS_01001, FIPS_01003));  // should return 0.6206040041765764
  console.log(distEuclidean3(FIPS_01001x, FIPS_01003x)); // should return -3
  console.log(distEuclidean3(FIPS_01001, FIPS_01003x)); // should return -3
  console.log(distEuclidean3(FIPS_01001x, FIPS_01003)); // should return -3