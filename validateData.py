import json
import os
import sys

# Define the paths
json_file = "src/worldwide-miku.json"
image_folder = "public/mikus"

# Check if the JSON file exists
if not os.path.exists(json_file):
    print(f"Error: {json_file} not found!")
    sys.exit(1)

# Load the JSON data
with open(json_file, 'r') as f:
    data = json.load(f)

ids = set()
sources = set()
missing_images = []
id_gap = False

# Check for duplicates and missing images
for entry in data:
    id = entry["id"]
    source = entry["source"]

    # Check for duplicate IDs
    if id in ids:
        print(f"Duplicate ID found: {id}")
        sys.exit(1)
    ids.add(id)

    # Check for duplicate sources
    if source in sources:
        print(f"Duplicate source found: {source}")
        sys.exit(1)
    sources.add(source)

    # Check if the corresponding image exists
    image_path = os.path.join(image_folder, f"{id}.jpg")
    if not os.path.exists(image_path):
        missing_images.append(f"{id}.jpg")

# Check for ID gaps
sorted_ids = sorted(ids)
for i in range(1, len(sorted_ids)):
    if sorted_ids[i] != sorted_ids[i-1] + 1:
        print(f"ID gap found between {sorted_ids[i-1]} and {sorted_ids[i]}")
        id_gap = True

# Report missing images
if missing_images:
    print("Missing images:")
    for img in missing_images:
        print(f"- {img}")

# Report if everything is fine
if not missing_images and not id_gap:
    print("Validation successful! No issues found.")
else:
    sys.exit(1)
