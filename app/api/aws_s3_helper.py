import boto3
import botocore
import os
import uuid


BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://s3.us-east-2.amazonaws.com/{BUCKET_NAME}/"
ALLOWED_EXTENSIONS_IMAGE = {"pdf", "png", "jpg", "jpeg", "gif"}
ALLOWED_EXTENSIONS_AUDIO = {"mp3", "wav", "aac", "wma", "flac"}

environment = os.getenv("FLASK_ENV")

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)



def get_unique_filename(filename):
    """
    This function will use uuid as the filename
    and keep its original extension type
    """
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    if environment != "production":
        return f"dev_{unique_filename}.{ext}"
    return f"{unique_filename}.{ext}"



def upload_file_to_s3(file, acl="public-read"):
    """
    upload to s3,
    if success, return url,
    if not, return errors
    """
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the your s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}



def remove_file_from_s3(file_url):
    # AWS needs the image file name, not the URL,
    # so you split that out of the URL
    key = file_url.rsplit("/", 1)[1]
    print(key)
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True



def batch_remove_from_s3(file_type, file_urls):
    for url in file_urls:
        delete_res = remove_file_from_s3(url)
        if delete_res is True:
            print(f"Successfully deleted {file_type} with url {url} from aws s3")
        else:
            print(f"Failed to delete {file_type} with url {url} from aws s3. Errors: {delete_res.errors}")
