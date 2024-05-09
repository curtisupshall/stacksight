from typing import List

def get_npm_package_regex(package_names: List[str]):
    expression = f'"(?:{"|".join(package_names)})":\s*(?:"latest"|"[~^<>=]*\d+(\.\d+)*[~^<>=\s\d.\-\|]*")'
    # print(expression)
    return expression
