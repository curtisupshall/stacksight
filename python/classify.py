import constants
from CodeSniffer import CodeSniffer

project_path = './.cims/curtisupshall/ftt-spotlight'

categories = ['languages', 'frontend']

for category in categories:
    print(f'\n{category.upper()}')
    for frontend_lib_name, options in constants.TECH_STACK_PATTERNS_BY_CATEGORY[category].items():
        score = CodeSniffer(project_path).find(options).compile()
        if (score <= 0.05):
            continue
        print(f'{frontend_lib_name}: {score}')
    

