import base64
import boto3
import os
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)
s3 = boto3.client('s3')


def lambda_handler(event, context):

    logger.info(event)

    file_path = event['imageKey']

    try:
        s3.put_object(Bucket=os.environ['contentBucketName'], Key=file_path, Body=base64.b64decode(event['content']))
    except Exception as e:
        raise IOError(e)
    return {
        'saved': file_path
    }

