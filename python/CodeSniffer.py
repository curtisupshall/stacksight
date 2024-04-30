import os
import re
from typing import Optional, List

# A class used to determine the presence of a particular software library in
# a code repository.
class CodeSniffer:
    def __init__(self, project_directory):
        self._project_directory = project_directory
        self._files = []

        # Initialize regex properties
        self._known_artifacts_regexes = None
        self._content_file_types_regex = None
        self._known_content_regex = None
        self._manifest_file_names_regex = None
        self._package_names_regex = None

        self._known_artifacts_weight = 1.0
        self._known_content_weight = 1.0
        self._content_file_types_weight = 1.0
        self._manifest_file_names_weight = 1.0
        self._package_names_weight = 1.0

        # Populate self._files with all files in the project directory
        for root, _, files in os.walk(self._project_directory):
            for file in files:
                self._files.append(os.path.join(root, file))

    def find(
        self: 'CodeSniffer',

        # Array of regex strings matching on particular known files for a given
        # technology; Typically not source code files.
        known_artifacts: Optional[List[str]] = None,
        known_artifacts_weight: Optional[float] = 1.0,
        
        # Matches on source code or content associated with the given technology.
        known_content: Optional[str] = None,
        known_content_weight: Optional[float] = 1.0,
        
        # Matches on source code file names associated with the given technology.
        content_file_types: Optional[str] = None,
        content_file_types_weight: Optional[float] = 1.0,
        
        # Matches on known manifest/package manager files associated with the given
        # technology.
        manifest_file_names: Optional[str] = None,
        manifest_file_names_weight: Optional[float] = 1.0,
        
        # Matches on known package names within the known manifest file
        package_names: Optional[str] = None,
        # package_names_weight: Optional[float] = 1.0,
    ):
        # Compile the regexes based on provided options
        self._known_artifacts_regexes = [re.compile(pattern) for pattern in known_artifacts] if known_artifacts else None
        self._content_file_types_regex = re.compile(content_file_types) if content_file_types else None
        self._known_content_regex = re.compile(known_content) if known_content else None
        self._manifest_file_names_regex = re.compile(manifest_file_names) if manifest_file_names else None
        self._package_names_regex = re.compile(package_names) if package_names else None
        
        self._known_artifacts_weight = known_artifacts_weight
        self._content_file_types_weight = content_file_types_weight
        self._known_content_weight = known_content_weight
        # self._package_names_weight = package_names_weight
        self._manifest_file_names_weight = manifest_file_names_weight

        return self

    def compile(self):
        # Establish a base score for each type of check
        known_artifacts_weight = self._known_artifacts_weight if self._known_artifacts_regexes else 0
        content_file_types_weight = self._content_file_types_weight if self._content_file_types_regex else 0
        known_content_weight = self._known_content_weight if self._known_content_regex else 0
        # package_names_weight = self._package_names_weight if self._package_names_regex else 0
        manifest_file_names_weight = self._manifest_file_names_weight if self._manifest_file_names_regex else 0

        weight_total = sum([
            known_artifacts_weight,
            content_file_types_weight,
            known_content_weight,
            # package_names_weight,
            manifest_file_names_weight,
        ])

        # Initialize match counters
        content_file_match_count = 0
        artifact_file_match_count = 0
        content_parsing_match_count = 0

        package_match_found = False

        # Check each file
        for file_path in self._files:
            # Check if the file is a matching artifact
            if self._known_artifacts_regexes and any(pattern.search(file_path) for pattern in self._known_artifacts_regexes):
                artifact_file_match_count += 1

            # Check if the file might contain matching content
            if self._content_file_types_regex and self._content_file_types_regex.search(file_path):
                content_file_match_count += 1
                with open(file_path, 'r') as file:
                    try:
                        content = file.read()
                        # Check content pattern match
                        if self._known_content_regex and self._known_content_regex.search(content):
                            content_parsing_match_count += 1
                    except:
                        pass

            # Check package manifest and name
            if self._manifest_file_names_regex and self._manifest_file_names_regex.search(file_path):
                with open(file_path, 'r') as file:
                    package_content = file.read()
                    # Binary check for package name
                    if self._package_names_regex and self._package_names_regex.search(package_content):
                        package_match_found = True

        # Calculate the final score
        total_files_checked = len(self._files)
        # total_possible_matches = (total_files_checked * file_base_score) + (total_files_checked * content_base_score) + package_base_score
        # file_match_rate = 

        actual_scores = [
            known_artifacts_weight * (artifact_file_match_count / len(self._known_artifacts_regexes) if self._known_artifacts_regexes else 0),
            content_file_types_weight * (content_file_match_count / total_files_checked if total_files_checked > 0 else 0),
            known_content_weight * (content_parsing_match_count / content_file_match_count if content_file_match_count > 0 else 0),
            manifest_file_names_weight * (1 if package_match_found else 0),
        ]

        return [actual_scores, weight_total]



# Example invocation
laravel_code_sniffer = CodeSniffer('./test_project').find(
    manifest_file_names=r'composer\.json$',
    package_names=r'"\s*laravel/framework\s*"\s*":\s*".+?"',
    known_artifacts=[
                r'.*\/artisan$',                 # Matches the Artisan command file at the root
                r'.*\/composer\.json$',          # Matches the composer.json file
                r'.*\/\.env$',                   # Matches the environment settings file
                r'.*\/app\/Http\/Controllers\/.*\.php$',  # Matches PHP files in the Controllers directory
                r'.*\/routes\/web\.php$',        # Matches the web routes file
                r'.*\/routes\/api\.php$',        # Matches the API routes file
                r'.*\/config\/.*\.php$',         # Matches any PHP file in the config directory
                r'.*\/resources\/views\/.*\.blade\.php$', # Matches Blade template files
                r'.*\/database\/migrations\/.*\.php$',    # Matches migration files
                r'.*\/public\/.*',               # Matches any file in the public directory
                r'.*\/storage\/.*',              # Matches any file in the storage directory
                r'.*\/tests\/.*\.php$',          # Matches PHP test files
            ]
)
# vue_code_sniffer = CodeSniffer('./.cims/curtisupshall/ftt-spotlight').find(vue_options)

# confidence_score = vue_code_sniffer.compile()
# print(confidence_score)  # Will print a score between 0 and 1 based on the presence of React
