## ESDA.js

JavaScript module containing a collection of different functions (and helper functions) that are useful for exploratory spatial data analysis (ESDA) in a dashboard setting.

This module was inspired by the fact that many simple spatial analyses would otherwise require the use of middleware or would have to be precalculated and stored server side. The idea is to write a set of useful functions in JavaScript that can be executed quickly on-the-fly. One limitation of this approach is that statistical inference based on spatial randomization may be too time consuming for large data sets on devices with limited computational power. 

---

At the present time, this module contains the following functionality:

An asterisk * indicates versions of functions that have been rewritten to account for null values. Two versions are being maintained (for the present time) because the functions that do not handle nulls are more concise, and may execute slighltly faster if you do not require null value handling.


#### Mean-center or standardize a 'DenseMatrix' or 2D 'Array':

- adjusted.js <br>
- adjusted2.js* <br>

Dependencies: math.js
<br>

#### Create bivariate classes (based on tertiles) to support a 3 x 3 color scheme for a bivariate choropleth map:

- bchTerts.js <br>
- bchTerts2.js* <br>

Dependencies: simple-statistics
<br>

#### Calculate cosine similarity between arrays:

- cosSim.js <br>

Dependencies: math.js
<br>

#### Calculate Euclidean distance between arrays:

- distEuclidean.js <br>

Dependencies: none
<br>

#### Create a pairwise Euclidean distance matrix from a 'DenseMatrix' or 2D 'Array':

- EucDistMatrix.js <br>

Dependencies: math.js
<br>


#### Apply a rank transformation to an array:

- percentileRank.js <br>
- percentileRank2.js <br>

Dependencies: none
<br>

---

Other files:

- testData.js contains test code and example calls for each function.<br>
- test.js contains a JSON object with county level SVI 2018 data (as percent ranks) for five indicators plus diabetes percentage.<br>
- data/diabetes_indicators.csv is a comma delimited file containing the same data as test.js<br>

---

Maintainer/Developer: Corey Devin Anderson
Developer: Kirankumar Batchu






