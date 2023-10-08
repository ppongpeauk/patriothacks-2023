import uuid
import random
import csv
import string
import numpy as np
import copy

genders = {0: "male", 1: "female", 2: "other"}

# (probabilities are dynamically generated per user)
categories = ["Music", "Clothing", "Books", "Art", "Beauty"]
probabilities = (
    {}
)  # user_id -> [probabilities by float 0 to 1, probabilities by category]

users_file = open("./users.csv", "w+")
users_file.write("USER_ID,GENDER\n")

items_file = open("./items.csv", "w+")
items_file.write("ITEM_ID,PRICE,INTEREST,DESCRIPTION\n")

interactions_file = open("./interactions.csv", "w+")
interactions_file.write("USER_ID,ITEM_ID,EVENT_TYPE,TIMESTAMP\n")

# fetch items from items-gpt.csv
# count for each category

category_ids = {
    "Music": [],
    "Clothing": [],
    "Books": [],
    "Art": [],
    "Beauty": [],
}

category_counts = {}
with open("./items-gpt.csv", "r") as items_gpt_file:
    reader = csv.reader(items_gpt_file)

    # skip header
    next(reader)

    for row in reader:
        category = row[2]  # column 2 is category

        category_ids[category].append(row[0])  # column 0 is item_id

        if category not in category_counts:
            category_counts[category] = 0
        category_counts[category] += 1

total_item_rows = sum(category_counts.values())
print("Total item rows:", total_item_rows)

print(category_ids)

# items
for i in range(128):
    item_uuid = "".join(
        random.choice(string.ascii_letters + string.digits) for _ in range(24)
    )

    # get random price
    item_price = random.randint(0, 100)

    # get random interest
    item_interest = random.randint(1, 5)

    # get random description
    item_description = "".join(
        random.choice(string.ascii_letters + string.digits) for _ in range(24)
    )

    # generate user, item, event data and write to file
    # item schema: item_id, price (int), interest (int), description (string)

    # write item data to file
    items_file.write(f"{item_uuid},{item_price},{item_interest},{item_description}\n")

# users
for i in range(128):
    user_uuid = "".join(
        random.choice(string.ascii_letters + string.digits) for _ in range(24)
    )

    # get random gender
    user_gender = genders[random.randint(0, 2)]

    # generate random probabilities for each category
    random_probabilities = np.random.dirichlet(np.ones(len(categories)))
    probabilities[user_uuid] = [
        np.random.dirichlet(np.ones(5), size=1)[0],
        np.random.choice(
            categories,
            random.randint(
                int(total_item_rows / 4), total_item_rows
            ),  # 25% to 100% of max interactions per user
            p=random_probabilities,
        ),
    ]

    print(f"User {user_uuid} - {len(probabilities[user_uuid][1])} interactions\n")

    # clone array of items-gpt.csv
    stack = copy.deepcopy(category_ids)

    # shuffle copied category_ids
    for category in stack:
        random.shuffle(category_ids[category])

    # interactions
    for category in probabilities[user_uuid][1]:
        try:
            popped_item_id = stack[category].pop(0)
            interactions_file.write(
                f"{user_uuid},{popped_item_id},click,{random.randint(0, 1000000000)}\n"
            )
        except Exception as e:
            print(f"ran out of items for {category}, ({user_uuid}), skipping...")
            print(stack[category])
            break

    # generate user, item, event data and write to file
    # user schema: user_id, gender (string)

    # write user data to file
    users_file.write(f"{user_uuid},{user_gender}\n")

users_file.close()
items_file.close()
