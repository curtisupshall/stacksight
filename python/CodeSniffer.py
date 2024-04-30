# A class used to determine the presence of a particular software library in
# a code repository.
class CodeSniffer:
    # Project data
    _project_directory = None
    _files = []
    
    # Instance data
    _package_manifest_regex = None
    _package_name_regex = None
    _file_regex = None

    def __init__(self, project_directory):
        self._project_directory = project_directory
        # TODO: walk the project directory and populate self._files

        return self

    def usesFiles(self, file_regex):
        self._file_regex = file_regex

        return self
    
    def belongsToManifest(self, package_manifest_regex):
        self._package_manifest_regex = package_manifest_regex

        return self
    
    def hasPackageName(self, package_name_regex):
        self._package_name_regex = package_name_regex

        return self
    
    def compile():
        # TODO: For all the instance data regexs that are not None, return true if all of them match
        return

# Example invocation
react_code_sniffer = CodeSniffer('./test').usesFiles(r'.*\.(jsx|tsx)$').belongsToManifest(r'package\.json$').hasPackageName(r'"\s*(react|react-dom)\s*"\s*:\s*".+?"')
    