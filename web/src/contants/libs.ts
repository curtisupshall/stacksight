import { string } from "zod";

export interface SoftwareLibrary {
    name: string;
    description: string;
    docsUrl?: string;
}

export interface SoftwareCategory {
    name: string;
    subtitle?: string;
}

export const SOFTWARE_CATEGORIES = {
    'frontend': {
        name: 'Frontend',
    },
    'backend': {
        name: 'Backend',
    },
    'web-stockets': {
        name: 'Web Sockets',
    },
    'server': {
        name: 'Server',
    },
    'general': {
        name: 'General',
    },
    'authentication': {
        name: 'Authentication',
    },
    'database': {
        name: 'Database',
    },
    'object-storage': {
        name: 'Object Storage',
    },
    'spatial': {
        name: 'Spatial',
    },
    'search': {
        name: 'Search',
    },
    'deployment': {
        name: 'Deployment',
    },
    'testing': {
        name: 'Testing',
    },
    'cache': {
        name: 'Caching',
    },
    'mailing': {
        name: 'Mailing',
    },
    'analytics-and-monitoring': {
        name: 'Analytics',
        subtitle: 'and Monitoring'
    },
    'security': {
        name: 'Security',
    },
    'logging': {
        name: 'Logging',
    },
    'internationalization': {
        name: 'Internationalization',
    },
    'mobile': {
        name: 'Mobile',
    },
    'machine-learning-and-data-science': {
        name: 'Machine Learning',
        subtitle: 'and Data Science'
    },
    'virtualization': {
        name: 'Virtualization',
    },
    'ci_cd': {
        name: 'Continuous Integration',
        subtitle: 'and Continuous Deployment'
    },
    'package-managers': {
        name: 'Package Managers',
    }
} as const;

export type SoftwareCategorySlug = keyof typeof SOFTWARE_CATEGORIES;

export const SOFTWARE_LIBRARIES = {
    'react': {
        name: 'React.js',
        description: 'The library for web and native user interfaces',
        docsUrl: 'https://react.dev/learn'
    },
    'vue': {
        
    },
    'angular': {
        
    },
    'material-ui': {
        
    },
    'bootstrap': {
        
    },
    'jquery': {
        
    },
    'svelte': {
        
    },
    'ember': {
        
    },
    'tailwindcss': {
        
    },
    'bulma': {
        
    },
    'alpine.js': {
        
    },
    'handlebars': {
        
    },
    'sass': {
        
    }
} as const;

export type SoftwareLibrarySlug = keyof typeof SOFTWARE_LIBRARIES;

export const SOFTWARE_LIBRARIES_BY_CATEGORY: Record<SoftwareCategorySlug, SoftwareLibrarySlug[]> = {
    'analytics-and-monitoring': [

    ],
    'authentication': [

    ],
    'backend': [

    ],
    'cache': [

    ],
    'ci_cd': [

    ],
    'database': [

    ],
    'deployment': [

    ],
    'frontend': [

    ],
    'general': [

    ],
    'internationalization': [

    ],
    'logging': [

    ],
    'machine-learning-and-data-science': [

    ],
    'mailing': [

    ],
    'mobile': [
        
    ],
    'object-storage': [
        
    ],
    'package-managers': [
        
    ],
}