from utils import *

PROJECT_TYPE_DESCRIPTIONS = {
    'web-app': 'web application repository',
    'desktop-app': 'desktop application repository',
    'mobile-app': 'mobile application repository',
    'documentation-repo': 'documentation database',
    'iac': 'deployment config repository',
    'cli': 'command line interface repository',
    'api': 'api repository',
    'data-science': 'data science repository'
}

LANG_FILE_PATTERNS = {
    'javascript': r'.*\.js$',
    'typescript': r'.*\.ts$',
    'python': r'.*\.py$',
    'java': r'.*\.java$',
    'php': r'.*\.php$',
    'c': r'.*\.c$',
    'c#': r'.*\.cs$',
    'c++': r'.*\.cpp$|.*\.cxx$|.*\.cc$',
    'ruby': r'.*\.rb$',
    'swift': r'.*\.swift$',
    'kotlin': r'.*\.kt$',
    'go': r'.*\.go$',
    'rust': r'.*\.rs$',
    'scala': r'.*\.scala$',
    'perl': r'.*\.pl$',
    'lua': r'.*\.lua$',
    'elixir': r'.*\.ex$|.*\.exs$',
    'clojure': r'.*\.clj$|.*\.cljs$',
    'dart': r'.*\.dart$',
    'r': r'.*\.r$',
    'matlab': r'.*\.m$',
    'bash': r'.*\.sh$',
    'shell': r'.*\.sh$',
    'powershell': r'.*\.ps1$',
    'groovy': r'.*\.groovy$',
    'haskell': r'.*\.hs$',
    'erlang': r'.*\.erl$',
    'objective-c': r'.*\.m$|.*\.mm$',
    'vb.net': r'.*\.vb$',
    'assembly': r'.*\.asm$',
    'f#': r'.*\.fs$',
    'julia': r'.*\.jl$',
    'smalltalk': r'.*\.st$',
    'ada': r'.*\.ada$|.*\.ads$|.*\.adb$',
    'fortran': r'.*\.f$|.*\.f90$|.*\.f95$',
    'cobol': r'.*\.cbl$|.*\.cob$',
    'pascal': r'.*\.pas$',
    'vba': r'.*\.bas$',
    'ocaml': r'.*\.ml$|.*\.mli$',
    'apl': r'.*\.apl$',
    'racket': r'.*\.rkt$',
    'lisp': r'.*\.lisp$|.*\.lsp$',
    'scheme': r'.*\.scm$|.*\.ss$',
    'html': r'.*\.html?$',
    'css': r'.*\.css$',
    'codon': r'.*\.codon$'
}

TECH_STACK_PATTERNS_BY_CATEGORY = {
    'languages': {
        'javascript': { 'content_file_types': r'.*\.js$' },
        'typescript': { 'content_file_types': r'.*\.ts$' },
        'python': { 'content_file_types': r'.*\.py$' },
        'java': { 'content_file_types': r'.*\.java$' },
        'php': { 'content_file_types': r'.*\.php$' },
        'c': { 'content_file_types': r'.*\.c$' },
        'c#': { 'content_file_types': r'.*\.cs$' },
        'c++': { 'content_file_types': r'.*\.cpp$|.*\.cxx$|.*\.cc$' },
        'ruby': { 'content_file_types': r'.*\.rb$' },
        'swift': { 'content_file_types': r'.*\.swift$' },
        'kotlin': { 'content_file_types': r'.*\.kt$' },
        'go': { 'content_file_types': r'.*\.go$' },
        'rust': { 'content_file_types': r'.*\.rs$' },
        'scala': { 'content_file_types': r'.*\.scala$' },
        'perl': { 'content_file_types': r'.*\.pl$' },
        'lua': { 'content_file_types': r'.*\.lua$' },
        'elixir': { 'content_file_types': r'.*\.ex$|.*\.exs$' },
        'clojure': { 'content_file_types': r'.*\.clj$|.*\.cljs$' },
        'dart': { 'content_file_types': r'.*\.dart$' },
        'r': { 'content_file_types': r'.*\.r$' },
        'matlab': { 'content_file_types': r'.*\.m$' },
        'bash': { 'content_file_types': r'.*\.sh$' },
        'shell': { 'content_file_types': r'.*\.sh$' },
        'powershell': { 'content_file_types': r'.*\.ps1$' },
        'groovy': { 'content_file_types': r'.*\.groovy$' },
        'haskell': { 'content_file_types': r'.*\.hs$' },
        'erlang': { 'content_file_types': r'.*\.erl$' },
        'objective-c': { 'content_file_types': r'.*\.m$|.*\.mm$' },
        'vb.net': { 'content_file_types': r'.*\.vb$' },
        'assembly': { 'content_file_types': r'.*\.asm$' },
        'f#': { 'content_file_types': r'.*\.fs$' },
        'julia': { 'content_file_types': r'.*\.jl$' },
        'smalltalk': { 'content_file_types': r'.*\.st$' },
        'ada': { 'content_file_types': r'.*\.ada$|.*\.ads$|.*\.adb$' },
        'fortran': { 'content_file_types': r'.*\.f$|.*\.f90$|.*\.f95$' },
        'cobol': { 'content_file_types': r'.*\.cbl$|.*\.cob$' },
        'pascal': { 'content_file_types': r'.*\.pas$' },
        'vba': { 'content_file_types': r'.*\.bas$' },
        'ocaml': { 'content_file_types': r'.*\.ml$|.*\.mli$' },
        'apl': { 'content_file_types': r'.*\.apl$' },
        'racket': { 'content_file_types': r'.*\.rkt$' },
        'lisp': { 'content_file_types': r'.*\.lisp$|.*\.lsp$' },
        'scheme': { 'content_file_types': r'.*\.scm$|.*\.ss$' },
        'html': { 'content_file_types': r'.*\.html?$' },
        'css': { 'content_file_types': r'.*\.css$' },
        'codon': { 'content_file_types': r'.*\.codon$' },
    },  
    'frontend': {
        'react': {
            'manifest_file_names': r'package\.json$',
            'package_names': get_npm_package_regex(['react', 'react-dom']),
            # 'known_artifacts': [
            #     r'.*\/src\/.*\.(jsx?|tsx?)$',  # Includes both JSX and TypeScript React files typically under src directory
            #     r'.*\/public\/index\.html$',  # Often includes the root HTML file where the React app mounts
            # ],
            'content_file_types': r'.*\.(jsx?|tsx?)$',  # Matches JavaScript, JSX, TypeScript, and TSX files
            'known_content': r'(?i)(import\s+React\s+from\s+["\']react["\'];|class\s+.*\s+extends\s+React\.Component|function\s+.*\s+\(\)\s+{\s+return\s+\(|const\s+.*\s+=\s+React\.use[State|Effect|Context|Reducer|Callback|Memo|Ref]|<>\s*|\s*<\/>\s*)'
        },
        'vue': {
            'manifest_file_names': r'package\.json$',
            'package_names': get_npm_package_regex(['vue']),
            # 'known_artifacts': [
            #     r'.*\/src\/.*\.(vue|js)$',  # Includes both Vue component files and JS files under src directory
            # ],
            'content_file_types': r'.*\.(vue|js)$',
            'known_content': r'(?i)<template>|<script>\s*export\s*default\s*{'
        },
        'angular': {
            'manifest_file_names': r'package\.json$',
            'package_names': get_npm_package_regex(['@angular\/core']),
            # 'known_artifacts': [
            #     r'.*\/src\/.*\.(ts|html)$',  # Includes TypeScript and HTML files typically part of Angular components
            # ],
            'content_file_types': r'.*\.(ts|html)$',
            'known_content': r'(?i)@Component\(|@NgModule\('
        },
        'material-ui': {
            'manifest_file_names': r'package\.json$',
            'package_names': get_npm_package_regex(['@material-ui\/core', '@mui\/material']),
            # 'known_artifacts': [
            #     r'.*\/src\/.*\.(jsx?|tsx?)$',  # Includes both JSX and TypeScript files where Material-UI components might be used
            # ],
            'content_file_types': r'.*\.(jsx?|tsx?)$',
            'known_content': r'(?i)from\s+["@]material-ui\/core'
        },
        'bootstrap': {
            'manifest_file_names': r'package\.json$',
            'package_names': get_npm_package_regex(['bootstrap']),
            # 'known_artifacts': [
            #     r'.*\/src\/.*\.(css|scss|js)$',  # Bootstrap may be present in any CSS, SCSS, or JS file
            # ],
            'content_file_types': r'.*\.(css|scss|js)$',
            'known_content': r'(?i)\.container|\.row|\.col-'
        },
        'jquery': {
            'manifest_file_names': r'package\.json$',
            'package_names': get_npm_package_regex(['jquery']),
            # 'known_artifacts': [
            #     r'.*\/src\/.*\.js$',  # jQuery is typically used within JS files
            # ],
            'content_file_types': r'.*\.js$',
            'known_content': r'(?i)\$\('
        },
        'svelte': {
            'manifest_file_names': r'package\.json$',
            'package_names': get_npm_package_regex(['svelte']),
            # 'known_artifacts': [
            #     r'.*\/src\/.*\.svelte$',  # Svelte components are .svelte files
            # ],
            'content_file_types': r'.*\.svelte$',
            'known_content': r'(?i)<script>\s*export\s*let\s*'
        },
        'ember': {
            'manifest_file_names': r'package\.json$',
            'package_names': get_npm_package_regex(['ember-source']),
            # 'known_artifacts': [
            #     r'.*\/app\/.*\.(js|hbs)$',  # Ember uses Handlebars (hbs) and JavaScript
            # ],
            'content_file_types': r'.*\.(js|hbs)$',
            'known_content': r'(?i)Ember\.Component|DS\.Model'
        },
        'tailwindcss': {
            'manifest_file_names': r'package\.json$',
            'package_names': get_npm_package_regex(['tailwindcss']),
            # 'known_artifacts': [
            #     r'.*\/src\/.*\.(css|scss)$',  # Tailwind CSS classes are used within CSS or SCSS files
            # ],
            'content_file_types': r'.*\.(css|scss)$',
            'known_content': r'(?i)@tailwind\s+'
        },
        'bulma': {
            'manifest_file_names': r'package\.json$',
            'package_names': get_npm_package_regex(['bulma']),
            # 'known_artifacts': [
            #     r'.*\/src\/.*\.(css|scss)$',  # Bulma is a CSS framework used within CSS or SCSS files
            # ],
            'content_file_types': r'.*\.(css|scss)$',
            'known_content': r'(?i)\.is\-flex|\.column'
        },
        'alpine.js': {
            'manifest_file_names': r'package\.json$',
            'package_names': get_npm_package_regex(['alpinejs']),
            # 'known_artifacts': [
            #     r'.*\/src\/.*\.js$',  # Alpine.js is typically used within JS files
            # ],
            'content_file_types': r'.*\.js$',
            'known_content': r'(?i)x-data|x-show'
        },
        'handlebars': {
            'manifest_file_names': r'package\.json$',
            'package_names': get_npm_package_regex(['handlebars']),
            # 'known_artifacts': [
            #     r'.*\/src\/.*\.hbs$',  # Handlebars templates are .hbs files
            # ],
            'content_file_types': r'.*\.hbs$',
            'known_content': r'(?i)\{\{#each \w+\}\}|\{\{#if'
        },
        'sass': {
            'manifest_file_names': r'package\.json$',
            'package_names': get_npm_package_regex(['sass']),
            # 'known_artifacts': [
            #     r'.*\/src\/.*\.(scss|sass)$',  # SASS stylesheets are .scss or .sass files
            # ],
            'content_file_types': r'.*\.(scss|sass)$',
            'known_content': r'(?i)\$[a-zA-Z\-]+:|@mixin|@include'
        }
    },
    'backend': {
        'laravel': {
            'content_file_types': r'.*\.(php|blade\.php)$',
            'known_content': r'(?i)\b(Route|Auth|Session|Config|View)::|class\s+.+\s+extends\s+Controller\b',
            'manifest_file_names': r'composer\.json$',  # PHP package management
            'package_names': r'"\s*laravel/framework\s*"\s*":\s*".+?"',  # Specific Laravel package
            'known_artifacts': [
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
        },
        'node.js': {
            # 'manifest_file_names': r'package\.json$',
            # 'package_names': r'"\s*express\s*"\s*":\s*".+?"',
            'known_artifacts': [
                r'.*\/package\.json$',
                r'.*\/.npmrc$',
                r'.*\/.nvmrc$',
            ],
            # 'content_file_types': r'.*\.(js|json)$',
            # 'known_content': r'(?i)\brequire\s*\(\s*["\']express["\']\s*\)|import\s+.*\s+from\s+["\']express["\']'
        },
        'flask': {
            'manifest_file_names': r'requirements\.txt$',
            'package_names': r'flask\s*==\s*.+',
            'known_artifacts': [
                r'.*\/app\.py$',
                r'.*\/requirements\.txt$',
            ],
            'content_file_types': r'.*\.py$',
            'known_content': r'(?i)from\s+flask\s+import\s+Flask'
        },
        'django': {
            'manifest_file_names': r'requirements\.txt$',
            'package_names': r'django\s*==\s*.+',
            'known_artifacts': [
                r'.*\/manage\.py$',
                r'.*\/requirements\.txt$',
            ],
            'content_file_types': r'.*\.py$',
            'known_content': r'(?i)from\s+django\.conf\s+import\s+settings'
        },
        'spring': {
            'manifest_file_names': r'pom\.xml$',
            'package_names': r'<artifactId>spring\-framework</artifactId>',
            'known_artifacts': [
                r'.*\/pom\.xml$',
                r'.*\/.*\.java$',
            ],
            'content_file_types': r'.*\.java$',
            'known_content': r'(?i)@SpringBootApplication'
        },
        'express': {
            'manifest_file_names': r'package\.json$',
            'package_names': r'"\s*express\s*"\s*":\s*".+?"',
            'known_artifacts': [
                r'.*\/package\.json$',
                r'.*\/app\.js$',
            ],
            'content_file_types': r'.*\.js$',
            'known_content': r'(?i)var\s+express\s+=\s+require\(["\']express["\']\);'
        },
        'rails': {
            'manifest_file_names': r'Gemfile$',
            'package_names': r'gem\s+["\']rails["\'],\s*["\'].+["\']',
            'known_artifacts': [
                r'.*\/Gemfile$',
                r'.*\/config\/routes\.rb$',
            ],
            'content_file_types': r'.*\.rb$',
            'known_content': r'(?i)Rails\.application\.routes\.draw\s+do'
        },
        'asp.net': {
            'manifest_file_names': r'\.csproj$',
            'package_names': r'<PackageReference\s+Include="Microsoft\.AspNetCore\..+"',
            'known_artifacts': [
                r'.*\/web\.config$',
                r'.*\/.*\.csproj$',
            ],
            'content_file_types': r'.*\.cs$',
            'known_content': r'(?i)using\s+Microsoft\.AspNetCore\.Mvc;'
        },
        'fastapi': {
            'manifest_file_names': r'requirements\.txt$',
            'package_names': r'fastapi\s*==\s*.+',
            'known_artifacts': [
                r'.*\/main\.py$',
                r'.*\/requirements\.txt$',
            ],
            'content_file_types': r'.*\.py$',
            'known_content': r'(?i)from\s+fastapi\s+import\s+FastAPI'
        },
        'phoenix': {
            'manifest_file_names': r'mix\.exs$',
            'package_names': r'{:\s*phoenix,\s*".+"}',
            'known_artifacts': [
                r'.*\/mix\.exs$',
                r'.*\/lib\/.*\.ex$',
            ],
            'content_file_types': r'.*\.ex$',
            'known_content': r'(?i)use\s+Phoenix\.Controller'
        }
    },
    'web-stockets': {
        'socketi',
        'pusher',
        'socket.io',
        'laravel-reverb'
    },
    'server': [
        'caddy',
        'apache',
        'nginx',
        'tomcat',
    ],
    'general': [
        'dot-net',
        'dot-net-core',
    ],
    'authentication': [
        'keycloak',
        'laravel-passport',
        'next-auth',
        'oauth2',
        'auth0',
        'aws-cognito',
        'firebase-auth', 
        'okta',
        'jwt',
        'saml',
        'azure-ad',
        'openid-connect',
        'apache-shiro',
    ],
    'database': [
        'postgres',
        'couchdb', 
        'mysql', 
        'mongodb',
        'redis',
        'oracle',
        'sql-server',
        'sqlite',
        'cassandra', 
        'dynamo-db',
        'neo4j',
        'firebase',
        'riak',
        'db2',
        'hbase',
        'influxdb',
        'arangodb', 
        'memsql',
        'cockroachdb'
    ],
    'object-storage': [
        's3',
        'azure-blob-storage',
        'google-cloud-storage',
        'backblaze-b2',
        'digitalocean-spaces', 
        'openstack-swift',
        'minio',
        'ceph',
        'oracle-cloud-storage',
        'ibm-cloud-object-storage', 
        'wasabi',
    ],
    'spatial': [
        'postgis',
        'qgis',
        'arcgis',
        'geoserver',
        'leaflet',
        'mapbox',
        'openlayers',
        'turf.js',
        's2geometry', 
        'geotools',
        'geopandas',
        'h3',
        'mapnik',
        'cesium',
        'gdal',
        'ogr',
        'shapely',
        'fiona',
        'rgeo',
        'pyproj'
    ],
    'search': [
        'typesense',
        'elasticsearch',
        'solr',
        'algolia',
        'lucene',
        'sphinx',
        'bleve',
        'whoosh',
        'xapian', 
        'apache-nutch',
        'open-search',
        'meilisearch',
    ],
    'deployment': [
        'aws',
        'openshift',
        'heroku',
        'netlify',
        'azure',
        'google-cloud',
        'digitalocean',
        'vultr', 
        'linode',
        'kubernetes',
        'docker-swarm',
        'ansible',
        'terraform',
        'puppet',
        'chef',
        'twilio',
        'tekton'
    ],
    'testing': [
        'jest',
        'phpunit',
        'selenium',
        'mocha',
        'jasmine',
        'cypress',
        'karma',
        'enzyme',
        'junit',
        'pytest',
        'postman'
    ],
    'cache': [
        'valkey',
        'redis',
        'elasticache',
        'memcached',
        'varnish',
        'hazelcast',
        'nginx-cache',
        'apache-traffic-server', 
        'lru-cache',
        'couchbase',
        'cloudflare',
        'fastly',
        'keycdn',
        'stackpath',
        'edgecast',
        'google-cloud-cdn',
        'amazon-cloudfront'
    ],
    'mailing': [
        'sendgrid',
        'mailgun',
        'mailchimp',
        'amazon-ses',
        'gc-notify',
    ],
    'analytics-and-monitoring': [
        # Analytics
        'google-analytics',
        'mixpanel',
        'amplitude',
        'hotjar',
        'segment',
        'new-relic',
        'adobe-analytics',
        'sentry',
        'tableau',
        'power-bi',
        'kibana',
        # Monitoring
        'datadog',
        'prometheus',
        'grafana',
        'splunk',
    ],
    'security': [
        'sonarqube',
    ],
    'logging': [
        'winston',
        'log4j',
        'bunyan',
        'logback',
        'slf4j',
        'log4net',
        'morgan', 
        'datadog-logs',
    ],
    'internationalization': [
        'i18next',
        'react-intl',
        'vue-i18n',
        'angular-translate',
        'gettext',
        'polyglot.js',
        'formatjs', 
    ],
    'mobile': [
        'react-native',
        'flutter',
        'cordova',
        'ionic',
        'native-script',
        'android-sdk',
        'ruby-motion',
        'corona-sdk', 
        'unity',
        'unreal-engine',
    ],
    'machine-learning-and-data-science': [
        # ML
        'pytorch',
        'tensorflow',
        'keras',
        'scikit-learn',
        'caffe',
        'open-ai'
        'xgboost'
        
        # Data Science
        'jupyter',    
        'numpy',      
        'pandas',     
        'matplotlib',
        'seaborn',   
        'scipy',
        'hadoop',
    ],
    'virtualization': [
        'docker',
        'kubernetes',
        'vmware',
        'virtualbox',
        'hyper-v',
        'qemu',
        'red-hat-virtualization',
    ],
    'ci_cd': [
        'gradle',
        'jenkins',          
        'circleci',         
        'travis-ci',        
        'gitlab-ci',        
        'github-actions',   
        'bamboo',           
        'teamcity',         
        'azure-devops',     
        'bitbucket-pipelines'
    ],
    'package-managers': [
        'npm',        
        'yarn',       
        'pip',        
        'conda',      
        'maven',      
        'gradle',     
        'nuget',      
        'composer',   
        'gem',        
        'cargo',      
        'apt',        
        'yum',        
        'dnf',        
        'zypper',     
        'pacman',     
        'homebrew',   
        'chocolatey', 
        'snap',       
        'flatpak',    
        'rpm',        
        'brew',       
        'apk',        
        'pypi',       
        'bower',      
    ]
}
