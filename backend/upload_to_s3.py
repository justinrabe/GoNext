import json
import boto3
import os
s3 = boto3.client('s3')

# assign directory
directory = 'production-data'
 
# iterate over files in
# that directory
for root, dirs, files in os.walk(directory):
    for filename in files:
        with open(os.path.join(root, filename), "r") as json_file:
            data = json.load(json_file)
        s3.put_object(
            Body=json.dumps(data),
            Bucket='go-next-data',
            Key= filename
        )

