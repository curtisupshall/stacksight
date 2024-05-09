awslocal lambda create-function \
    --function-name localstack-lambda-url-example \
    --runtime python3.10 \
    --zip-file fileb://package.zip \
    --handler lambda_function.lambda_handler \
    --role arn:aws:iam::000000000000:role/lambda-role \
    --environment Variables="{GIT_PYTHON_REFRESH='quiet'}"

