import os
import sys
import constants
from CodeSniffer import CodeSniffer

directory_path = '.cims/'

categories = [
    'languages',
    'frontend',
    # 'backend'
]

orgs = [entry for entry in os.listdir(directory_path) if os.path.isdir(os.path.join(directory_path, entry))]

for org in orgs:
    org_path = os.path.join(directory_path, org)
    repos = [entry for entry in os.listdir(org_path) if os.path.isdir(os.path.join(org_path, entry))]
    for repo in repos:
        print(f'\n----------------\n{org}/{repo}\n----------------')
        project_path = os.path.join(org_path, repo)

        libraries = []
        for category in categories:
            # print(f'\n{category.upper()}')
            for library_name, options in constants.TECH_STACK_PATTERNS_BY_CATEGORY[category].items():
                debug = library_name == 'react' and repo == 'ftt-spotlight'
                actual_scores, weight_total = CodeSniffer(project_path, debug=debug).find(
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
            
        print(', '.join([f"\'{lib}\'" for lib in libraries]))
    
        # sys.exit()
    

