import pandas as pd
import numpy as np
import os

def replacing(df):

    # i could choose what to return (per row) or (per grouped row)
    #out_sr = df.mean()
    #out_df = df.height.mean()

    return df

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
# names_dup_df_mean = names_dup_df.groupby("name").apply(replacing)
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

    print(row, indice)

# drop the distored column "is duplicated" since no longer needed
data.drop(labels=["is duplicated"], axis=1, inplace=True)

# add a counting column
data["counting"]=1

# save new file
data.to_csv("baseball_data_post-processed.csv")

print("Exporting Process", "Exporting Process completed!")

print("stop")