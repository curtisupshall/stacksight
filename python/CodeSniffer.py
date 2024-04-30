import os
import re

class CodeSniffer:
    def __init__(self, project_directory):
        self._project_directory = project_directory
        self._files = []
        # Populate self._files with all files in the project directory
        for root, dirs, files in os.walk(self._project_directory):
            for file in files:
                self._files.append(os.path.join(root, file))
    
    def usesFiles(self, file_regex):
        self._file_regex = re.compile(file_regex)
        return self
    
    def belongsToManifest(self, package_manifest_regex):
        self._package_manifest_regex = re.compile(package_manifest_regex)
        return self
    
    def hasPackageName(self, package_name_regex):
        self._package_name_regex = re.compile(package_name_regex)
        return self
    
    def compile(self):
        file_matched = False
        manifest_matched = False
        package_name_matched = False
        
        for file_path in self._files:
            if self._file_regex and self._file_regex.search(file_path):
                file_matched = True
            if self._package_manifest_regex and self._package_manifest_regex.search(file_path):
                with open(file_path, 'r') as file:
                    content = file.read()
                    if self._package_name_regex and self._package_name_regex.search(content):
                        package_name_matched = True
                manifest_matched = True
            
            # Check all conditions based on provided configurations
            if self._file_regex and not file_matched:
                return False
            if self._package_manifest_regex and not manifest_matched:
                return False
            if self._package_name_regex and not package_name_matched:
                return False

        return True

# Example invocation
react_code_sniffer = CodeSniffer('./cims/curtisupshall/ftt-spotlight').usesFiles(r'.*\.(jsx|tsx)$').belongsToManifest(r'package\.json$').hasPackageName(r'"\s*(react|react-dom)\s*"\s*":\s*".+?"')
result = react_code_sniffer.compile()
print(result)  # Will print True if the specified conditions are met, otherwise False
