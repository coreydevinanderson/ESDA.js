## ESDA.js

JavaScript module containing a collection of different functions that are useful for exploratory spatial data analysis (ESDA) in a dashboard setting.

This module was inspired by the fact that many spatial analyses yield large square matrices that are costly to keep in memory or otherwise would require the use of middleware to execute (e.g., in R or Python). The idea is to write a set of useful functions in JavaScript that can be executed quickly on-the-fly.

---

At the present time, this module contains the following functionality:

(an asterisk * indicates versions of functions that have been rewritten to account for null values)


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






