from classify import classify

path_to_repo = '.stacksight/biohubbc-dev'
tags = classify(path_to_repo)

print('Result:')
for (library, actual_scores) in tags:
    print(f"{library}: {actual_scores}")
