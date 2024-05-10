import os
import sys
import constants
from typing import List
from CodeSniffer import CodeSniffer

categories = [
    'languages',
    'frontend',
    'backend'
]

def classify(project_path) -> List[str]:
    libraries = []

    for category in categories:
        # print(f'\n{category.upper()}')
        for library_name, options in constants.TECH_STACK_PATTERNS_BY_CATEGORY[category].items():
            actual_scores, weight_total = CodeSniffer(project_path, debug=False).find(
                content_file_types=options.get('content_file_types'),
                known_artifacts=options.get('known_artifacts'),
                known_content=options.get('known_content'),
                manifest_file_names=options.get('manifest_file_names'),
                package_names=options.get('package_names'),
            ).compile()

            score = sum(actual_scores) / weight_total if weight_total > 0 else 0

            if (score <= 0.05):
                continue
            
            libraries.append(library_name)

                # scores_str = ', '.join([str(x) for x in actual_scores])
                # print(f'{library_name}: {score}')
            
        # print(', '.join([f"\'{lib}\'" for lib in libraries]))
    
        # sys.exit()
    return libraries 
