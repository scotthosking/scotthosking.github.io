---
layout: post
title: The ASL Climate Index
permalink: asl_index
description: An index for the Amundsen Sea Low, West Antarctica
image: assets/images/asl_index-crop3.png
nav-menu: false
---

<p>
<a href="/images/asl_index/asl_index-v2_region.png"><img src="/images/asl_index/asl_index-v2_region.png" 
	alt="Amundsen Sea Low (ASL)" width="200" align="right"></a>Over
the last few decades, West Antarctica has experienced rapid environmental change.
Observed spatial trend patterns in surface temperature and sea ice extent indicate that these 
are likely to be linked to changes in the Amundsen Seas Low (ASL): <i>a highly 
dynamic and mobile climatological low pressure system located in the 
Pacific sector of the Southern Ocean</i>. In this sector, variability in 
sea-level pressure is greater than anywhere in the Southern Hemisphere, 
making it challenging to isolate local fluctuations in the ASL from 
larger-scale shifts in atmospheric pressure. 
In <i><a href="http://journals.ametsoc.org/doi/abs/10.1175/JCLI-D-12-00813.1">Hosking et 
al., 2013</a></i><sup>*</sup> we demonstrated that the position and strength of 
the ASL are crucial for understanding regional change over West Antarctica. 
Furthermore, the <i>state-of-the-art</i> climate models which best simulate 
the ASL produce a better representation of the regional surface climate.

<br><br>
<i><sub>* In Hosking et al. (2013) we used the term Amundsen-Bellingshausen Seas Low (ABSL).  
However, following a dedicated 
<a href="http://www.climate-cryosphere.org/wcrp/pcpi/meetings/764-amundsen-sea-low-workshop-for-pcpi-initiative">ASL 
workshop</a>, the term Amundsen Sea Low (ASL) is now used for our more recent publications.</sub></i>

<h2><a id="ASL Indices"></a>ASL Indices</h2>

<p>
<a href="https://raw.githubusercontent.com/scott-hosking/amundsen-sea-low-index/master/asli_era5_v3_lon_monthly_timeseries.png">
<img src="https://raw.githubusercontent.com/scott-hosking/amundsen-sea-low-index/master/asli_era5_v3_lon_monthly_timeseries.png" 
alt="Amundsen Sea Low (ASL) longitude monthly time-series" width="300" align="right"></a>
The ASL indices are defined as follows:</p>  

<p>The <b>ASL latitude and longitude</b> are identified 
using a minima finding algorithm within the ASL sector (170°—298° E, 80°—60° S). 
This dataset is derived using monthly ERA5 mean sea level pressure data
(see 
<a href="https://scotthosking.com/notebooks/asl_detection/">notebook</a>).</p>

<p>The <b>ASL Actual Central Pressure Index</b> is simply defined as the
pressure at the ASL location.  Note that the ASL actual central 
pressure is strongly modulated by the Southern-Hemisphere Annual Mode 
(SAM) across all seasons, with time series correlations significant at <i>p</i>&lt;0.01 
(<a href="http://journals.ametsoc.org/doi/abs/10.1175/JCLI-D-12-00813.1">Hosking et 
	al., 2013</a>).  
For this reason we derive an alternative measure called the <i>Relative Central Pressure</i>.</p>

<p>The <b>ASL Relative Central Pressure</b> is essentially a regional 
pressure anomaly.  It is calculated by subtracting the ASL actual 
central pressure from the area-averaged pressure over the ASL domain 
(domain specified above).</p> 

<!-- <p>Note that the seasonal and annual indices are computed from their 
respective temporally averaged two-dimensional surface pressure fields. 
 They are not the average of the three (or twelve) points from the 
monthly indices.</p>  -->

<h3><a id="Data"></a>Data</h3>

<p>ASL indices derived from <u>monthly ERA5</u> reanalysis data
<ul>
<li>Data<sup>*</sup> (<a href="https://github.com/scotthosking/amundsen-sea-low-index/raw/master/asli_era5_v3-latest.csv">csv</a>, 1959-01 to 2024-05<sup>**</sup>)</li>
<li>Code (<a href="https://github.com/scotthosking/amundsen-sea-low-index/">GitHub repo</a>)</li>
<li>Pressure maps with ASL locations (<a href="https://github.com/scotthosking/amundsen-sea-low-index/blob/master/asli_era5_v3-latest.pdf">view pdf via GitHub</a>)</li>
<li>Timeseries (<a href="https://github.com/scotthosking/amundsen-sea-low-index/raw/master/asli_era5_v3_monthly_timeseries.png">png</a>)</li>
</ul>
</p>

<p>These indices are defined using an ASL detection methodology very similar to that described in
	<a href="http://dx.doi.org/10.1002/2015GL067143">Hosking et al. (2016)</a>
	although (rather than IDL) it is now written in Python. 
	Therefore, this methodology and any associcated indices/derived data will be henceforth referred 
	to as 'version 3' (or 'v3') 
	as the method is <i>non-identical</i> to the previous one (version 2).  
	Versions 1 and 2 of the ASL indices 
	(<i>which were in any case derived on ERA-Interim reanalysis data, and not ERA5</i>) 
	can be found on our
	<a href="https://legacy.bas.ac.uk/data/absl/index2.html">legacy webpage</a>.</p>

<p>To compare v3 against v2, I have written a python 
	<a href="https://github.com/scotthosking/amundsen-sea-low-index/blob/master/v3/compare_asl_indices.ipynb">notebook</a>
	where the ASL indices are derived from ERA-Interim data 
	to match the methodology in Hosking et al. (2016).</p>

<h3><a id="Citation"></a>Citation</h3>
<p style="margin-left: 20px">Hosking, J.&nbsp;S., Orr, A., Bracegirdle, T.&nbsp;J., Turner, J. (2016).
<b>Future circulation changes off West Antarctica: Sensitivity of the Amundsen Sea Low to projected anthropogenic forcing.</b>.
<em>Geophysical Research Letters</em>, 43,
<a target="_blank" href="http://dx.doi.org/10.1002/2015GL067143">doi:10.1002/2015GL067143</a>
</p>

<sub>*It is recommended that users visually inspect the selected ASL locations with regards to the pressure fields before trusting and publishing any findings. See green plus symbols'+' for each month
	<a href="https://github.com/scotthosking/amundsen-sea-low-index/blob/master/asli_era5_v3-latest.pdf">here</a>.</sub>
<br>
<sub>**Feel free to get in contact if you require the ASL index (v3) to be updated</sub>