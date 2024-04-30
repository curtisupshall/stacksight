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
        self._file_regex = re.compile(options['knownFiles']) if options['knownFiles'] else None
        self._content_regex = re.compile(options['knownContent']) if options['knownContent'] else None
        self._package_manifest_regex = re.compile(options['belongsToManifest']) if options['belongsToManifest'] else None
        self._package_name_regex = re.compile(options['hasPackageName']) if options['hasPackageName'] else None
        return self

    def compile(self):
        # Establish a base score for each type of check
        file_base_score = 0.3
        content_base_score = 0.4
        package_base_score = 0.3

        # Track successful matches
        file_match_count = 0
        content_match_count = 0
        package_match_count = 0

        # Check each file
        for file_path in self._files:
            file_matched = False
            content_matched = False

            # Check file pattern match
            if self._file_regex and self._file_regex.search(file_path):
                file_matched = True
                file_match_count += 1
                with open(file_path, 'r') as file:
                    content = file.read()
                    # Check content pattern match
                    if self._content_regex and self._content_regex.search(content):
                        content_matched = True
                        content_match_count += 1

            # Check package manifest and name
            if self._package_manifest_regex and self._package_manifest_regex.search(file_path):
                with open(file_path, 'r') as file:
                    package_content = file.read()
                    if self._package_name_regex and self._package_name_regex.search(package_content):
                        package_match_count += 1

        # Calculate the final score
        total_possible_matches = len(self._files) * (file_base_score + content_base_score) + 1 * package_base_score
        actual_score = (file_match_count * file_base_score + content_match_count * content_base_score + package_match_count * package_base_score)

        return actual_score / total_possible_matches if total_possible_matches > 0 else 0

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
