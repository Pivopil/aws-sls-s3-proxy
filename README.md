# aws-sls-s3-proxy
AWS Serverless S3 Proxy

### Prerequisites

https://nodejs.org/en/download/
https://github.com/jorgebastida/awslogs
https://serverless.com

Windows only
```shell script
npm i -g windows-build-tools
```

All OS
```shell script
npm i -g serverless pino
```

### Clone 
```shell script
git clone https://github.com/Pivopil/aws-sls-s3-proxy.git
cd aws-sls-s3-proxy
```

### Get your AWS Account
```shell script
aws sts get-caller-identity --query 'Account' --profile [YOUR_PROFILE]
```

### Deploy
```shell script
sls deploy -s dev --profile [YOUR_PROFILE] --account [YOUR_AWS_ACCOUNT]
```

### Get Logs for the lambdas 
```shell script
sls logs -f S3Proxy --startTime 5m --tail --stage dev --profile [YOUR_PROFILE] --account [YOUR_AWS_ACCOUNT]
sls logs -f CustomAuthorizer --startTime 5m --tail --stage dev --profile [YOUR_PROFILE] --account [YOUR_AWS_ACCOUNT]
```

### Get API Gateway logs 
```shell script
awslogs groups --profile [YOUR_PROFILE] --aws-region [YOUR_REGION]
awslogs streams API-Gateway-Execution-Logs_[YOUR_HASH]/dev --profile [YOUR_PROFILE] --aws-region [YOUR_HASH]
awslogs get API-Gateway-Execution-Logs_[YOUR_HASH]/dev ALL --start='20m' --profile [YOUR_PROFILE] --aws-region [YOUR_REGION]
```

### Examples of usage
```shell script
curl \
 -X POST \
 -H "Content-Type: image/jpg" \
 -H "Authorization: super-secure-token" \
 --data-binary "@[ABSOLUTE_PATH_TO_FILE]/[FILE_NAME].jpg" \
 "https://[API_HASH_FROM_SERVERLESS].execute-api.us-east-1.amazonaws.com/dev/upload/[FILE_NAME].jpg"
```

### Destroy (You can only delete empty buckets. Deletion fails for buckets that have contents.)
```shell script
aws s3 rm s3://content-folder-rydu574-aws-training-dev --recursive --profile [YOUR_PROFILE]
sls remove -s dev --profile [YOUR_PROFILE] --account [YOUR_AWS_ACCOUNT]
```
