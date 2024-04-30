import os
import re

class CodeSniffer:
    def __init__(self, project_directory):
        self._project_directory = project_directory
        self._files = []

        # Initialize regex properties
        self._file_regex = None
        self._content_regex = None
        self._package_manifest_regex = None
        self._package_name_regex = None

        # Populate self._files with all files in the project directory
        for root, _, files in os.walk(self._project_directory):
            for file in files:
                self._files.append(os.path.join(root, file))

    def find(self, options):
        # Compile the regexes based on provided options
        self._file_regex = re.compile(options.get('knownFiles')) if options.get('knownFiles') else None
        self._content_regex = re.compile(options.get('knownContent')) if options.get('knownContent') else None
        self._package_manifest_regex = re.compile(options.get('belongsToManifest')) if options.get('belongsToManifest') else None
        self._package_name_regex = re.compile(options.get('hasPackageName')) if options.get('hasPackageName') else None
        return self

    def compile(self):
        # Establish a base score for each type of check
        file_match_weight = 3 if self._file_regex else 0
        content_match_weight = 3 if self._content_regex else 0
        package_match_weight = 3 if self._package_name_regex else 0
        
        weight_total = file_match_weight + content_match_weight + package_match_weight

        # Initialize match counters
        file_match_count = 0
        content_match_count = 0

        package_match_found = False

        # Check each file
        for file_path in self._files:
            # Check file pattern match
            if self._file_regex and self._file_regex.search(file_path):
                file_match_count += 1
                with open(file_path, 'r') as file:
                    content = file.read()
                    # Check content pattern match
                    if self._content_regex and self._content_regex.search(content):
                        content_match_count += 1

            # Check package manifest and name
            if self._package_manifest_regex and self._package_manifest_regex.search(file_path):
                with open(file_path, 'r') as file:
                    package_content = file.read()
                    # Binary check for package name
                    if self._package_name_regex and self._package_name_regex.search(package_content):
                        package_match_found = True

        # Calculate the final score
        total_files_checked = len(self._files)
        # total_possible_matches = (total_files_checked * file_base_score) + (total_files_checked * content_base_score) + package_base_score
        # file_match_rate = 
        
        actual_score = \
            + file_match_weight * (file_match_count / total_files_checked if total_files_checked > 0 else 0) \
            + content_match_weight * (content_match_count / file_match_count if file_match_count > 0 else 0) \
            + package_match_weight * (1 if package_match_found else 0)

        return actual_score / weight_total if weight_total > 0 else 0



# # Example invocation
# react_options = {
#     'knownFiles': r'.*\.(jsx|tsx)$',
#     'knownContent': r'import React', # Example of content to match in a JSX/TSX file
#     'belongsToManifest': r'package\.json$',
#     'hasPackageName': r'"\s*(react|react-dom)\s*"\s*":\s*".+?"'
# }

# vue_options = {
#     'knownFiles': r'.*\.vue$',  # Matches files with a .vue extension
#     'knownContent': r'(<template>|<script>|import Vue from ["\']vue["\'])',  # Matches Vue component blocks or Vue import statements
#     'belongsToManifest': r'package\.json$',  # Matches package.json file
#     'hasPackageName': r'"\s*vue\s*"\s*:\s*".+?"'  # Matches Vue entry in package.json dependencies
# }


# react_code_sniffer = CodeSniffer('./.cims/curtisupshall/ftt-spotlight').find(react_options)
# vue_code_sniffer = CodeSniffer('./.cims/curtisupshall/ftt-spotlight').find(vue_options)

# confidence_score = vue_code_sniffer.compile()
# print(confidence_score)  # Will print a score between 0 and 1 based on the presence of React
