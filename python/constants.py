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
    'frontend': [
        'react',
        'vue',
        'angular',
        'material-ui',
        'bootstrap',
        'jquery',
        'svelte',
        'ember',
        # 'backbone', 
        'tailwindcss',
        # 'foundation',
        'bulma',
        'alpine.js',
        # 'lit',
        # 'stencil',
        # 'pug',
        'handlebars', 
        # 'blazor',
        # 'famo.us',
        # 'aurelia',
        # 'glimmer',
        'shad-cdn',
        'sass'
    ],
    'backend': [
        'node.js',
        'flask',
        'laravel',
        'django',
        'spring',
        'express',
        'rails',
        'asp.net',
        'fastapi', 
        'java',
        'ruby',
        'php',
        'go',
        'phoenix',
        
    ],
    'server': [
        'caddy',
        'apache',
        'nginx',
        # 'iis',
        'tomcat',
        # 'jetty',
        # 'lighttpd',
        # 'cherokee',
        # 'openresty', 
        # 'node-http',
        # 'gunicorn',
        # 'unicorn',
        # 'puma',
        # 'thor',
        # 'uWSGI',
        # 'netty',
        # 'wildfly',
        # 'glassfish', 
        # 'haproxy',
        # 'mongrel'
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
        # 'casbin', 
        # 'stormpath',
        # 'duo',
        # 'pomerium',
        # 'onelogin',
        # 'clever'
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
        # 'vespa',
        # 'manticore',
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
        'twilio'
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
        'map-reduce'   
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
