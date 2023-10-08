old_file = open("./items-gpt.csv", "r")
new_file = open("./items-gpt-new.csv", "w")

for line in old_file:
    s = line.split(",")
    s[4] = '"' + s[4]
    s[-1] = s[-1][: len(s[-1]) - 2] + '"\n'
    new_file.write(",".join(s))

old_file.close()
new_file.close()
