import csv
import json

csvfile = open("./items-gpt.csv", "r")
jsonfile = open("./items.json", "w")

for row in csv.DictReader(csvfile):
    newRow = {
        "id": row["ITEM_ID"],
        "type": "item",
        "name": row["TITLE"],
        "description": row["DESCRIPTION"],
        "price": row["PRICE"],
        "category": row["CATEGORY_L1"],
        "author": "9RZSFf6WhHTo7ptrAq76WstcDYA3",
        "icon": "/placeholder.jpeg",
        "media": ["/placeholder.jpeg"],
        "active": True,
        "createdAt": "2023-10-08T18:47:52.000Z",
    }

    json.dump(newRow, jsonfile)
    jsonfile.write(",\n")
