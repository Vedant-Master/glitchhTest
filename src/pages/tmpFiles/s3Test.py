import boto3

# Creating an S3 access object
'''
a = "AKIAUY3ONBJSPOXLHZ6Q"
b = "RiBxwAJhmrpiMojjoTIAfygcIb84hLUT0Q1IwFgU"
s3 = boto3.resource('s3',aws_access_key_id=a,aws_secret_access_key=b)
textract = boto3.client('textract',region_name='us-east-1',
                        aws_access_key_id=a,
                        aws_secret_access_key=b)
'''
accessKeyId = "AKIARVAS5GDK4ULCBAVV"
secretAccessKey = "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"
obj = boto3.client("s3",aws_access_key_id=accessKeyId,
                        aws_secret_access_key=secretAccessKey)
# Uploading a png file to S3 in
# 'mygfgbucket' from local folder
res = obj.upload_file(
	Filename="./images/1.jpg",
	Bucket="for-test-development",
	Key="firstImg.jpg"
)

print (":-----",res)
