import boto3
#.s3.connection import S3Connection
a = "AKIARVAS5GDK4ULCBAVV"
b = "Z/E2I8cMGTuES2X5zUaynvNcBozmAB0rqiTp+HvO"
s3 = boto3.resource('s3',aws_access_key_id=a,aws_secret_access_key=b)
#conn = S3Connection(aws_access_key_id=a,aws_secret_access_key=b)
my_bucket = s3.Bucket('for-test-development')
for my_bucket_object in my_bucket.objects.all():
    print(my_bucket_object)
