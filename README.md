# Lab4

In lab 4, we learned about building on the fly anlysis of inputed GIS data for a website. The API we used to do the analysis was the Turf library. The Turf library interfaces with Node and browser webdata so that you can have real time spatial analyis. In our lab, we do not have a dataset on collisions in Toronto which could be used to locate and address dangerous road intersections. In this case, the dataset is simple because it is not changing. Potentially, we could do this same analysis using a GIS software on this dataset. However, if we wanted the dataset to constantly be updating and published to the web, then displaying the data as a wbeseite using Turf is advantageous. In this lab we always create undefined variables so that the code can adapt to changing dataset content and the final analysis will not break.



The source of the data comes from "https://github.com/smith-lg/ggr472-lab4/blob/main/data/pedcyc_collision_06-21.geojson" which is a repository containing "point locations of road collisions involving pedestrian and cyclists between 2006 and 2021 in Toronto"


