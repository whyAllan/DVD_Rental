
def OrganizeByAccuracy(data, query):
    for item in data:
        item["accuracy"] = 0
        for word in query:
            if word in item["first_name"].lower() or word in item["last_name"].lower():
                item["accuracy"] += 1

    return sorted(data, key=lambda x: x["accuracy"], reverse=True)