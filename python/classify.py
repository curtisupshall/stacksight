import constants
from CodeSniffer import CodeSniffer

project_path = './.cims/curtisupshall/ftt-spotlight'

for frontend_lib_name, options in constants.TECH_STACK_PATTERNS_BY_CATEGORY['frontend'].items():
    score = CodeSniffer(project_path).find(options).compile()
    print(f'{frontend_lib_name}: {score}')
    

