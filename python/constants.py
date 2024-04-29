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
    ],
    'backend': [
        'node.js',
        'flask',
        'laravel',
        'django',    
        'spring',    
        'express',   
        
    ],
    'server': [
        'caddy',
        'apache',
        'nginx',
    ],
    'general': [
        'dot-net-core'
    ],
    'authentication': [
        'keycloak',
        'laravel-passport',
        'next-auth',
    ],
    'database': [
        'postgres',
        'couch-db',
        'mysql'
    ],
    'object-storage': [
        's3'
    ],
    'spatial': [
        'postgis'
    ],
    'search': [
        'typesense',
        'elasticsearch'
    ],
    'deployment': [
        'aws',
        'openshift'
    ],
    'testing': [
        'jest',
        'phpunit'
    ],
    'cache': [
        'redis',
        'elasticache'
    ],
    'mailing': [
        'sendgrid'
    ],
    'analytics': [
        #
    ],
    'monitoring': [
        #
    ],
    'security': [
        #
    ],
    'logging': [
        'winston'
    ],
    'internationalization': [
        #
    ],
    'accessibility': [
        #
    ],
    'mobile': [
        'react-native'
    ],
    'machine-learning': [
        'pytorch'
    ],
    'virtualization': [
        'docker'
    ]
}
