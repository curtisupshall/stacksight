rm -rf ./dist
rm package.zip
pip install -r requirements.txt -t ./dist/
cp src/*.py dist
# cp src/lambda_function.py dist/lambda_function.py
pushd dist
zip -r ../package.zip .
popd
