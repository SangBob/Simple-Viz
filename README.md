## •	Summary
The Data Set "Baseball Data" was chosen for this exercise. \
The visualization created aims at explaining the data distribution of the different player types in terms of handedness.
The variable height was incorporated in the plots in order to study the types of handedness across height ranges.

This project represents a simple exercise where the basics of visualization learnt were implemented.

## •	Design
The process of designing my plots was quite iterative. At the beginning when I first manage to get my code working and draw
a preliminary bar chart, several issues were identified by myself and confirmed by colleagues of mine form work.

Following the feedback received, I tried to design a simple lay-out where an introduction before the chart briefly explains
what the plot is about. I also incorporated some comments discussing the main observations that can be taken out of the plot.
This reading helps to tell the story, which in this case is about physical condition of the players i.e. heights and handedness types.

I also invested some time in adapting the font size of texts in the visualization. In my preliminary plot the axis labels were
too small to read. The documentation of dimple was very useful to easily adapt the font size of axis labels, as well as the legend size.
The different methods available for the object chart are of great help.
Similar adaptations to the location of the legend were done in order to allocate the height groups legend in a position
which is aesthetic and clear to read.

## •	Feedback
The feedback received was from the colleagues of work. I am attending this Nanodegree as part of the program within my employer.
I thus discussed the plots I created with my class mates and work mates since they are both now.
#### Feedback one (colleague 1 attending Udacity course at my work)
> The visual plot created should come together with some text in order to introduce the topic. In my opinion this reading should
be brief but very important to support the reader to quickly understand what he/she sees in the bar charts.

#### Feedback two (colleague 2 attending Udacity course at my work)
> I think I like the simplicity of the plots presented, however i cannot read very well the text in the labels.

#### Feedback three (colleague 3 attending Udacity course at my work)
> Looking at the first plot I can already get a feeling of the data distribution very accurately. I mean how many players
of each handedness type are playing Baseball in this data set. But to understand the amount of player in every height range,
a percentage transformation would be the most convenient.

Following the feedback received I improved accordingly the visualization in an iterative process.
The major improvement was due to the interactive button included (also as part of the requirements of this project).
The transformation of the y axis after clicking the button "Transformation" support the comparison of height ranges among the
different handedness type of players. The bars spanning over a value of percentages is more adequate that the counting of
players.

## •	Resources
The main documentation looked at was;
- https://github.com/d3/d3/blob/master/API.md
- https://github.com/PMSI-AlignAlytics/dimple

Several project were looked at in github;
- https://github.com/paulina-grunwald/Udacity-Data-Analyst-Nanodegree/tree/master/Project%206%20-%20Make%20Effective%20Data%20Visualization
- https://github.com/bhurn/data-visualization-project
- https://github.com/agapic/Data-Analyst-Nanodegree-Udacity/tree/master/Project%206%20-%20Data%20Visualization%20with%20D3

## •	Python code
The code below was used for data pre-processing. I mainly used Python to group the heights of the baseball players into
ranges, the .cut method of pandas was of great help.
Since I am not a Baseball fan (I am Spanish) I do not know any player name, but Identified some duplicated names.
I wondered whether these are duplicated players of different players with the same name. My assumption here was that they were
duplicated entries, and in order to clean the data I used the code below - the duplicated data points are replaced with average
values.

I have the impression that the code below could be simplified into a more Pythonic way to replace duplicates with average values.
For the non-numerical data I directly choose to take the first entry data point.

Any feedback about the code below is as well appreciated in case that there is a much simpler "one line" solution for this problem. Thanks.

script name:
**preprocessing.py**
```
import pandas as pd
import numpy as np
import os

# read data
data = pd.read_csv("baseball_data.csv")

# create additional cols. with groups
data["height_grouping"]= pd.cut(np.array(data["height"]), 4)
data["weight_grouping"]= pd.cut(np.array(data["weight"]), 4)
data["is duplicated"] = data.name.duplicated()

names_dup = data[data["is duplicated"] == True]["name"].values.tolist()
series = data["name"].isin(names_dup)
names_dup_df = data[series]

# calculate the mean values
names_dup_df_mean = names_dup_df.groupby("name").mean()

# drop one of the duplicates and keep track of the index from "data"
names_dup_df.drop_duplicates(subset="name", keep="first", inplace=True)
names_dup_df.reset_index(inplace=True, drop=False)
# i also drop the first duplicate from "data" to update its value later
data.drop_duplicates(subset="name", keep="first", inplace=True)

# replace the reamining with the average value contained in "names_dup_df_mean"
for indice, row in names_dup_df_mean.iterrows():

    data.set_value(index=names_dup_df[names_dup_df["name"]==indice]["index"],
                   col=row.index.tolist(),
                   value=row.values.tolist())

# drop the distored column "is duplicated" since no longer needed
data.drop(labels=["is duplicated"], axis=1, inplace=True)

# add a counting column
data["counting"]=1

# save new file
data.to_csv("baseball_data_post-processed.csv")
```