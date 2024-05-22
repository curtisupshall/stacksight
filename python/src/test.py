from classify import classify

path_to_repo = '.stacksight/biohubbc-dev'
tags = classify(path_to_repo)

print('Result:')
for (library) in tags:
    print(f"{library}")
