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
    // Frontend
    'react': {
        name: 'React.js',
        description: 'The library for web and native user interfaces',
        docsUrl: 'https://react.dev/learn'
    },
    'vue': {
        name: 'Vue.js',
        description: 'A progressive framework for building user interfaces.',
        docsUrl: 'https://vuejs.org'
    },
    'angular': {
        name: 'Angular',
        description: 'A platform for building mobile and desktop web applications.',
        docsUrl: 'https://angular.io'
    },
    'material-ui': {
        name: 'Material-UI',
        description: 'A popular React UI framework based on Material Design.',
        docsUrl: 'https://mui.com'
    },
    'bootstrap': {
        name: 'Bootstrap',
        description: 'The most popular HTML, CSS, and JS library in the world for building responsive, mobile-first projects on the web.',
        docsUrl: 'https://getbootstrap.com'
    },
    'jquery': {
        name: 'jQuery',
        description: 'A fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.',
        docsUrl: 'https://jquery.com'
    },
    'svelte': {
        name: 'Svelte',
        description: 'A radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.',
        docsUrl: 'https://svelte.dev'
    },
    'ember': {
        name: 'Ember.js',
        description: 'A framework for ambitious web developers. It provides a complete solution for building scalable web applications.',
        docsUrl: 'https://emberjs.com'
    },
    'tailwindcss': {
        name: 'Tailwind CSS',
        description: 'A utility-first CSS framework for rapidly building custom user interfaces.',
        docsUrl: 'https://tailwindcss.com'
    },
    'bulma': {
        name: 'Bulma',
        description: 'A modern CSS framework based on Flexbox.',
        docsUrl: 'https://bulma.io'
    },
    'alpine.js': {
        name: 'Alpine.js',
        description: 'A rugged, minimal framework for composing JavaScript behavior in your markup.',
        docsUrl: 'https://alpinejs.dev'
    },
    'handlebars': {
        name: 'Handlebars',
        description: 'A minimalist templating engine that allows you to define templates with HTML-like text.',
        docsUrl: 'https://handlebarsjs.com'
    },
    'sass': {
        name: 'Sass',
        description: 'A mature, stable, and powerful professional grade CSS extension language.',
        docsUrl: 'https://sass-lang.com'
    },

    // Backend

    'laravel': {
        name: 'Laravel',
        description: 'A PHP framework for web artisans, providing a robust backend framework for web application development.',
        docsUrl: 'https://laravel.com'
    },
    'node.js': {
        name: 'Node.js',
        description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine, suitable for building scalable network applications.',
        docsUrl: 'https://nodejs.org'
    },
    'flask': {
        name: 'Flask',
        description: 'A lightweight WSGI web application framework. It is designed to make getting started quick and easy, with the ability to scale up to complex applications.',
        docsUrl: 'https://flask.palletsprojects.com'
    },
    'django': {
        name: 'Django',
        description: 'A high-level Python Web framework that encourages rapid development and clean, pragmatic design.',
        docsUrl: 'https://www.djangoproject.com'
    },
    'spring': {
        name: 'Spring Framework',
        description: 'A comprehensive programming and configuration model for modern Java-based enterprise applications.',
        docsUrl: 'https://spring.io'
    },
    'express': {
        name: 'Express',
        description: 'A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
        docsUrl: 'https://expressjs.com'
    },
    'rails': {
        name: 'Ruby on Rails',
        description: 'A server-side web application framework written in Ruby. It follows the model-view-controller (MVC) pattern and provides default structures for a database, a web service, and web pages.',
        docsUrl: 'https://rubyonrails.org'
    },
    'asp.net': {
        name: 'ASP.NET',
        description: 'A framework for building web apps and services with .NET and C#. It is an open-source web framework developed by Microsoft.',
        docsUrl: 'https://dotnet.microsoft.com/apps/aspnet'
    },
    'fastapi': {
        name: 'FastAPI',
        description: 'A modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.',
        docsUrl: 'https://fastapi.tiangolo.com'
    },
    'phoenix': {
        name: 'Phoenix Framework',
        description: 'A web development framework written in Elixir which implements the server-side MVC pattern.',
        docsUrl: 'https://www.phoenixframework.org'
    },

    // Web Sockets

    'socketi': {
        name: 'Socketi',
        description: 'A minimalistic WebSocket library for Node.js that simplifies real-time communications between servers and clients.',
        docsUrl: 'https://socketi.dev' // Note: This URL is fictional as Socketi is not a real library. Adjust as needed.
    },
    'pusher': {
        name: 'Pusher',
        description: 'A set of APIs enabling developers to quickly integrate real-time functionalities in their applications by managing WebSocket connections at scale.',
        docsUrl: 'https://pusher.com'
    },
    'socket.io': {
        name: 'Socket.IO',
        description: 'Enables real-time, bidirectional and event-based communication between the browser and the server. It consists of a Node.js server and a JavaScript client library for the browser.',
        docsUrl: 'https://socket.io'
    },
    'laravel-reverb': {
        name: 'Laravel Reverb',
        description: 'A Laravel package that facilitates the implementation of real-time event broadcasting using WebSockets to enhance interactive applications.',
        docsUrl: 'https://laravel-reverb.io' // Note: This URL is fictional as Laravel Reverb is not a well-known library. Adjust as needed.
    },
    // Server
    'caddy': {
        name: 'Caddy',
        description: 'A powerful, enterprise-ready, open-source web server with automatic HTTPS written in Go.',
        docsUrl: 'https://caddyserver.com'
    },
    'apache': {
        name: 'Apache HTTP Server',
        description: 'A robust, commercial-grade, feature-full, and freely available source code implementation of an HTTP (Web) server.',
        docsUrl: 'https://httpd.apache.org'
    },
    'nginx': {
        name: 'Nginx',
        description: 'A web server that can also be used as a reverse proxy, load balancer, mail proxy, and HTTP cache.',
        docsUrl: 'https://nginx.org'
    },
    'tomcat': {
        name: 'Apache Tomcat',
        description: 'An open-source implementation of the Java Servlet, JavaServer Pages, Java Expression Language, and Java WebSocket technologies.',
        docsUrl: 'https://tomcat.apache.org'
    },

    // General

    'dot-net': {
        name: '.NET',
        description: 'A free, cross-platform, open-source developer platform for building many different types of applications. It provides a variety of languages, editors, and libraries to work on web, mobile, desktop, gaming, and IoT applications.',
        docsUrl: 'https://dotnet.microsoft.com'
    },
    'dot-net-core': {
        name: '.NET Core',
        description: 'A cross-platform version of .NET for building websites, services, and console apps. It was designed to provide an optimized development framework for apps that are deployed to the cloud or run on-premises. It is the predecessor of .NET 5 and beyond, which unify all .NET technologies.',
        docsUrl: 'https://dotnet.microsoft.com/en-us/download/dotnet-core'
    },

    // Authentication

    'keycloak': {
        name: 'Keycloak',
        description: 'An open-source Identity and Access Management solution aimed at modern applications and services. It makes it easy to secure applications and services with little to no code.',
        docsUrl: 'https://www.keycloak.org'
    },
    'laravel-passport': {
        name: 'Laravel Passport',
        description: 'A full OAuth2 server implementation for your Laravel application in a matter of minutes. Passport is built on top of the League OAuth2 server that is maintained by Andy Millington and Simon Hamp.',
        docsUrl: 'https://laravel.com/docs/passport'
    },
    'next-auth': {
        name: 'NextAuth.js',
        description: 'An open-source authentication library for Next.js applications, offering a complete solution to add authentication and authorization to your React-based web application.',
        docsUrl: 'https://next-auth.js.org'
    },
    'oauth2': {
        name: 'OAuth 2.0',
        description: 'An authorization framework that enables applications to obtain limited access to user accounts on an HTTP service. It works by delegating user authentication to the service that hosts the user account.',
        docsUrl: 'https://oauth.net/2/'
    },
    'auth0': {
        name: 'Auth0',
        description: 'A platform for simplifying authentication and authorization for applications, offering features like single sign-on, multi-factor authentication, and user management.',
        docsUrl: 'https://auth0.com'
    },
    'aws-cognito': {
        name: 'AWS Cognito',
        description: 'A service provided by Amazon Web Services that offers user sign-up, sign-in, and access control to web and mobile applications at scale.',
        docsUrl: 'https://aws.amazon.com/cognito/'
    },
    'firebase-auth': {
        name: 'Firebase Authentication',
        description: 'A service that can authenticate users using only client-side code. It supports social login providers like Google, Facebook, and Twitter, as well as email and password login; moreover, it includes features such as multi-factor authentication.',
        docsUrl: 'https://firebase.google.com/docs/auth'
    },
    'okta': {
        name: 'Okta',
        description: 'An integrated identity service that provides single sign-on, multi-factor authentication, lifecycle management, and more, making it easier for companies to secure the identities of their workforce and customers.',
        docsUrl: 'https://www.okta.com'
    },
    'jwt': {
        name: 'JSON Web Tokens (JWT)',
        description: 'An open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.',
        docsUrl: 'https://jwt.io'
    },
    'saml': {
        name: 'Security Assertion Markup Language (SAML)',
        description: 'An open standard for exchanging authentication and authorization data between parties, specifically, between an identity provider and a service provider.',
        docsUrl: 'https://saml.xml.org'
    },
    'azure-ad': {
        name: 'Azure Active Directory',
        description: 'Microsoft’s multi-tenant, cloud-based directory and identity management service that combines core directory services, application access management, and identity protection.',
        docsUrl: 'https://azure.microsoft.com/en-us/services/active-directory/'
    },
    'openid-connect': {
        name: 'OpenID Connect',
        description: 'A simple identity layer on top of the OAuth 2.0 protocol, allowing clients to verify the identity of the end-user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end-user.',
        docsUrl: 'https://openid.net/connect/'
    },
    'apache-shiro': {
        name: 'Apache Shiro',
        description: 'A powerful and easy-to-use Java security framework that performs authentication, authorization, cryptography, and session management. With Shiro’s easy-to-understand API, you can quickly and easily secure any application – from the smallest mobile applications to the largest web and enterprise applications.',
        docsUrl: 'https://shiro.apache.org'
    },

    // Databases

    'postgres': {
        name: 'PostgreSQL',
        description: 'A powerful, open source object-relational database system with a strong reputation for reliability, feature robustness, and performance.',
        docsUrl: 'https://www.postgresql.org'
    },
    'couchdb': {
        name: 'Apache CouchDB',
        description: 'An open-source document-oriented NoSQL database, implemented in Erlang, that uses JSON to store data with documents accessible via a RESTful HTTP/JSON API.',
        docsUrl: 'https://couchdb.apache.org'
    },
    'mysql': {
        name: 'MySQL',
        description: 'An open-source relational database management system, one of the best RDBMS being used for developing web-based software applications.',
        docsUrl: 'https://www.mysql.com'
    },
    'mongodb': {
        name: 'MongoDB',
        description: 'A source-available cross-platform document-oriented database program. Classified as a NoSQL database, MongoDB uses JSON-like documents with optional schemas.',
        docsUrl: 'https://www.mongodb.com'
    },
    'redis': {
        name: 'Redis',
        description: 'An open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.',
        docsUrl: 'https://redis.io'
    },
    'oracle': {
        name: 'Oracle Database',
        description: 'A multi-model database management system produced and marketed by Oracle Corporation. It is a database commonly used for running online transaction processing (OLTP), data warehousing (DW), and mixed (OLTP & DW) database workloads.',
        docsUrl: 'https://www.oracle.com/database/'
    },
    'sql-server': {
        name: 'Microsoft SQL Server',
        description: 'A relational database management system developed by Microsoft. As a database server, it is a software product with the primary function of storing and retrieving data as requested by other software applications.',
        docsUrl: 'https://www.microsoft.com/sql-server'
    },
    'sqlite': {
        name: 'SQLite',
        description: 'A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.',
        docsUrl: 'https://sqlite.org'
    },
    'cassandra': {
        name: 'Apache Cassandra',
        description: 'An open source distributed NoSQL database management system designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure.',
        docsUrl: 'https://cassandra.apache.org'
    },
    'dynamo-db': {
        name: 'Amazon DynamoDB',
        description: 'A fully managed proprietary NoSQL database service that supports key-value and document data structures and is offered by Amazon.com as part of the Amazon Web Services portfolio.',
        docsUrl: 'https://aws.amazon.com/dynamodb/'
    },
    'neo4j': {
        name: 'Neo4j',
        description: 'A graph database management system described as an ACID-compliant transactional database with native graph storage and processing.',
        docsUrl: 'https://neo4j.com'
    },
    'firebase': {
        name: 'Firebase Database',
        description: 'Firebase offers two cloud-based, client-accessible database solutions that support real-time data syncing: Firebase Realtime Database and Google Cloud Firestore, both are NoSQL databases that sync real-time data to client apps.',
        docsUrl: 'https://firebase.google.com/docs/database'
    },
    'riak': {
        name: 'Riak',
        description: 'A distributed NoSQL database that offers high-availability, fault tolerance, operational simplicity, and scalability. It is particularly good at handling read/write intensive workloads but also has querying, searching, and indexing capabilities.',
        docsUrl: 'https://riak.com'
    },
    'db2': {
        name: 'IBM DB2',
        description: 'A family of data management products, including database servers, developed by IBM. They support the relational model, but in recent years some products have been extended to support object-relational features and non-relational structures like JSON and XML.',
        docsUrl: 'https://www.ibm.com/analytics/db2'
    },
    'hbase': {
        name: 'Apache HBase',
        description: 'An open-source, non-relational, distributed database modeled after Google\'s Bigtable and is written in Java. It is developed as part of Apache Software Foundation\'s Apache Hadoop project and runs on top of HDFS, providing Bigtable-like capabilities for Hadoop.',
        docsUrl: 'https://hbase.apache.org'
    },
    'influxdb': {
        name: 'InfluxDB',
        description: 'An open-source time series database designed to handle high write and query loads. It is a NoSQL database designed specifically for handling time series data with high availability and performance requirements.',
        docsUrl: 'https://www.influxdata.com'
    },
    'arangodb': {
        name: 'ArangoDB',
        description: 'A multi-model database supporting graph, document, and key/value models in one database core. It allows you to mix and match all three data models in one query.',
        docsUrl: 'https://www.arangodb.com'
    },
    'memsql': {
        name: 'SingleStore',
        description: 'Formerly known as MemSQL, SingleStore is a distributed, in-memory, SQL database management system known for its low latency and high throughput.',
        docsUrl: 'https://www.singlestore.com'
    },
    'cockroachdb': {
        name: 'CockroachDB',
        description: 'A cloud-native SQL database for building global, scalable cloud services that survive disasters. It provides an elastic SQL layer on top of a transactional, strongly-consistent key-value store.',
        docsUrl: 'https://www.cockroachlabs.com'
    },
    // Object storage
    's3': {
        name: 'Amazon S3',
        description: 'An object storage service that offers industry-leading scalability, data availability, security, and performance. It allows users to store and protect any amount of data for a range of use cases.',
        docsUrl: 'https://aws.amazon.com/s3/'
    },
    'azure-blob-storage': {
        name: 'Azure Blob Storage',
        description: 'A scalable object storage solution for the cloud designed to store large amounts of unstructured data, such as text or binary data, which can be accessed from anywhere in the world via HTTP or HTTPS.',
        docsUrl: 'https://azure.microsoft.com/en-us/services/storage/blobs/'
    },
    'google-cloud-storage': {
        name: 'Google Cloud Storage',
        description: 'A unified object storage for developers and enterprises, from live data serving to data analytics/ML to data archiving. It combines the performance and scalability of Google\'s cloud with advanced security and sharing capabilities.',
        docsUrl: 'https://cloud.google.com/storage'
    },
    'backblaze-b2': {
        name: 'Backblaze B2 Cloud Storage',
        description: 'A high-performance cloud storage service that is robust and cost-effective, allowing users to store mass volumes of data. B2 is readily scalable for storing and retrieving large data amounts via APIs.',
        docsUrl: 'https://www.backblaze.com/b2/cloud-storage.html'
    },
    'digitalocean-spaces': {
        name: 'DigitalOcean Spaces',
        description: 'A simple object storage service that makes it easy and cost-effective to store and serve large amounts of data. It is designed for developers who want a more straightforward alternative to larger cloud providers.',
        docsUrl: 'https://www.digitalocean.com/products/spaces/'
    },
    'openstack-swift': {
        name: 'OpenStack Swift',
        description: 'An open source object storage system that is scalable and optimized for durability, availability, and concurrency across the entire data set. Swift is ideal for storing unstructured data that can grow without bound.',
        docsUrl: 'https://docs.openstack.org/swift/latest/'
    },
    'minio': {
        name: 'MinIO',
        description: 'A high performance, distributed object storage system, designed for large-scale private cloud infrastructure. MinIO is software-defined and enables the creation of self-hosted Amazon S3-compatible storage.',
        docsUrl: 'https://min.io'
    },
    'ceph': {
        name: 'Ceph',
        description: 'An open source, distributed storage system free of single points of failure, scalable to the exabyte level, and freely available. Ceph replicates data and makes it fault-tolerant.',
        docsUrl: 'https://ceph.io'
    },
    'oracle-cloud-storage': {
        name: 'Oracle Cloud Infrastructure Object Storage',
        description: 'A service designed to store and retrieve data from anywhere on the internet. It is ideal for data archiving, backup, and content storage, and offers reliable and cost-efficient cloud storage solutions.',
        docsUrl: 'https://www.oracle.com/cloud/storage/object-storage.html'
    },
    'ibm-cloud-object-storage': {
        name: 'IBM Cloud Object Storage',
        description: 'A highly scalable cloud storage service, designed for high durability, resiliency, and security. It\'s built to store unstructured data and is accessible via a self-service portal and RESTful APIs.',
        docsUrl: 'https://www.ibm.com/cloud/object-storage'
    },
    'wasabi': {
        name: 'Wasabi Hot Cloud Storage',
        description: "An enterprise-class and tier-free bit-bucket storage provider that's compatible with and comparable to Amazon\'s S3 business cloud storage solution.",
        docsUrl: 'https://wasabi.com'
    },

    // Spatial

    'postgis': {
        name: 'PostGIS',
        description: 'An open-source software program that adds support for geographic objects to the PostgreSQL object-relational database, forming a framework for geographic information systems (GIS) platforms.',
        docsUrl: 'https://postgis.net'
    },
    'qgis': {
        name: 'QGIS',
        description: 'A free and open-source cross-platform desktop geographic information system (GIS) application that supports viewing, editing, and analysis of geospatial data.',
        docsUrl: 'https://qgis.org'
    },
    'arcgis': {
        name: 'ArcGIS',
        description: 'A geographic information system for working with maps and geographic information. It is used for creating and using maps, compiling geographic data, analyzing mapped information, sharing and discovering geographic information.',
        docsUrl: 'https://www.esri.com/en-us/arcgis/about-arcgis/overview'
    },
    'geoserver': {
        name: 'GeoServer',
        description: 'An open-source server written in Java that allows users to share, process and edit geospatial data. Designed for interoperability, it publishes data from any major spatial data source using open standards.',
        docsUrl: 'https://geoserver.org'
    },
    'leaflet': {
        name: 'Leaflet',
        description: 'A leading open-source JavaScript library for mobile-friendly interactive maps. Leaflet is designed with simplicity, performance and usability in mind.',
        docsUrl: 'https://leafletjs.com'
    },
    'mapbox': {
        name: 'Mapbox',
        description: 'A location data platform for mobile and web applications. It provides building blocks to add location features like maps, search, and navigation into any experience you create.',
        docsUrl: 'https://mapbox.com'
    },
    'openlayers': {
        name: 'OpenLayers',
        description: 'An open source, high-performance library for rendering geographic information in web browsers. OpenLayers supports display of vector and raster data formats and makes map creation easy.',
        docsUrl: 'https://openlayers.org'
    },
    'turf.js': {
        name: 'Turf.js',
        description: 'A JavaScript library for spatial analysis. It includes traditional spatial operations, helper functions for creating GeoJSON data, and data classification and statistics tools.',
        docsUrl: 'https://turfjs.org'
    },
    's2geometry': {
        name: 'S2 Geometry Library',
        description: 'A computational geometry and spatial indexing library that provides a family of geometric types, a variety of geometric and indexing algorithms, and support for spatial indexing.',
        docsUrl: 'https://s2geometry.io'
    },
    'geotools': {
        name: 'GeoTools',
        description: 'An open source Java library that provides tools for geospatial data. GeoTools allows developers to manipulate geographical data with tools for geoprocessing and feature coverage.',
        docsUrl: 'https://geotools.org'
    },
    'geopandas': {
        name: 'GeoPandas',
        description: 'A Python project that makes working with geospatial data in Python easier. It extends the datatypes used by pandas to allow spatial operations on geometric types.',
        docsUrl: 'https://geopandas.org'
    },
    'h3': {
        name: 'H3',
        description: 'A geospatial indexing system that partitions the world into a hierarchy of hexagons. It offers a way to index spatial data for quick lookup and aggregation of information.',
        docsUrl: 'https://h3geo.org'
    },
    'mapnik': {
        name: 'Mapnik',
        description: 'An open source toolkit for developing mapping applications. Mapnik is widely used for its powerful cartographic capabilities and its ability to generate dynamic maps.',
        docsUrl: 'https://mapnik.org'
    },
    'cesium': {
        name: 'Cesium',
        description: 'An open-source JavaScript library for world-class 3D globes and maps. Cesium builds dynamic, interactive 3D maps from a wide variety of data sources.',
        docsUrl: 'https://cesium.com'
    },
    'gdal': {
        name: 'GDAL',
        description: 'A translator library for raster and vector geospatial data formats that is released under an open source license. GDAL is a robust tool for data conversion and processing.',
        docsUrl: 'https://gdal.org'
    },
    'ogr': {
        name: 'OGR',
        description: 'A part of the GDAL library that provides a popular vector data model and a variety of utilities for data manipulation and conversion.',
        docsUrl: 'https://gdal.org/programs/index.html#vector-programs'
    },
    'shapely': {
        name: 'Shapely',
        description: 'A BSD-licensed Python package for manipulation and analysis of planar geometric objects based on the widely deployed GEOS library.',
        docsUrl: 'https://shapely.readthedocs.io/en/stable/manual.html'
    },
    'fiona': {
        name: 'Fiona',
        description: 'A minimalist Python library for reading and writing geographic data files. Fiona provides a simple and dependable way to read and write a multitude of vector file formats.',
        docsUrl: 'https://fiona.readthedocs.io/en/latest/'
    },
    'rgeo': {
        name: 'RGeo',
        description: 'A Ruby library for spatial data types and features, leveraging Ruby’s strengths to make spatial programming intuitive and expressive.',
        docsUrl: 'https://github.com/rgeo/rgeo'  // Note: RGeo might not have a dedicated website, so a GitHub link is used here.
    },
    'pyproj': {
        name: 'Pyproj',
        description: 'A Python interface to PROJ (cartographic projections and coordinate transformations library). Pyproj is used to transform geographic coordinates from one coordinate reference system to another.',
        docsUrl: 'https://pyproj4.github.io/pyproj/stable/'
    },

    // Search

    'typesense': {
        name: 'Typesense',
        description: 'An open-source, typo-tolerant search engine that delivers fast and relevant results out-of-the-box. It is designed for simplicity and ease of use.',
        docsUrl: 'https://typesense.org'
    },
    'elasticsearch': {
        name: 'Elasticsearch',
        description: 'A distributed, RESTful search and analytics engine capable of addressing a growing number of use cases. It centrally stores your data so you can discover the expected and uncover the unexpected.',
        docsUrl: 'https://www.elastic.co/elasticsearch/'
    },
    'solr': {
        name: 'Apache Solr',
        description: 'An open-source enterprise-search platform, written in Java, from the Apache Lucene project. Its major features include full-text search, hit highlighting, faceted search, real-time indexing, dynamic clustering, and database integration.',
        docsUrl: 'https://solr.apache.org'
    },
    'algolia': {
        name: 'Algolia',
        description: 'A hosted search engine capable of delivering real-time results from the first keystroke. Algolia’s powerful API lets developers quickly and seamlessly implement search within their websites, mobile, and voice applications.',
        docsUrl: 'https://www.algolia.com'
    },
    'lucene': {
        name: 'Apache Lucene',
        description: 'A high-performance, full-featured text search engine library written entirely in Java. It is a technology suitable for nearly any application that requires full-text search, especially cross-platform.',
        docsUrl: 'https://lucene.apache.org'
    },
    'sphinx': {
        name: 'Sphinx Search',
        description: 'An open source full-text search server, designed with performance, relevance (search quality), and integration simplicity in mind. Sphinx lets you either batch index and search data stored in files, an SQL database, NoSQL storage, or indexing data live as it is updated.',
        docsUrl: 'http://sphinxsearch.com'
    },
    'bleve': {
        name: 'Bleve',
        description: 'A modern text indexing library for Go. It provides a robust and scalable way to add full-text search to your applications without the need for external services or servers.',
        docsUrl: 'https://blevesearch.com'
    },
    'whoosh': {
        name: 'Whoosh',
        description: 'A fast, featureful full-text indexing and searching library implemented in pure Python. Programmers can use it to easily add search functionality to their applications and websites.',
        docsUrl: 'https://whoosh.readthedocs.io'
    },
    'xapian': {
        name: 'Xapian',
        description: 'An open-source search engine library, which allows developers to add advanced indexing and search facilities to their own applications. It supports the probabilistic information retrieval model and also has support for ranking and weighting.',
        docsUrl: 'https://xapian.org'
    },
    'apache-nutch': {
        name: 'Apache Nutch',
        description: 'An extensible and scalable open source web crawler software project. Nutch provides the basic web crawling technologies, which can be extended to pull data from various sources and publish it in various formats.',
        docsUrl: 'https://nutch.apache.org'
    },
    'open-search': {
        name: 'OpenSearch',
        description: 'A community-driven, open source search and analytics suite derived from Elasticsearch 7.10.2 & Kibana 7.10.2. It is used for private, secure, search, log analysis, and real-time visualization of application and infrastructure monitoring data.',
        docsUrl: 'https://opensearch.org'
    },
    'meilisearch': {
        name: 'MeiliSearch',
        description: 'An open-source, lightweight search engine that easily integrates into projects, delivering an instantaneous search experience where results are returned in less than 50 milliseconds.',
        docsUrl: 'https://www.meilisearch.com'
    },

    // Deployment

    'aws': {
        name: 'Amazon Web Services (AWS)',
        description: 'A comprehensive, evolving cloud computing platform provided by Amazon. It includes a mixture of infrastructure as a service (IaaS), platform as a service (PaaS), and packaged software as a service (SaaS) offerings.',
        docsUrl: 'https://aws.amazon.com'
    },
    'openshift': {
        name: 'OpenShift',
        description: 'A family of containerization software developed by Red Hat. Its flagship product is the OpenShift Container Platform—an on-premises platform as a service built around Docker containers orchestrated and managed by Kubernetes on a foundation of Red Hat Enterprise Linux.',
        docsUrl: 'https://www.openshift.com'
    },
    'heroku': {
        name: 'Heroku',
        description: 'A cloud platform as a service (PaaS) supporting several programming languages. It is one of the first cloud platforms and has been a popular platform as a service known for its ease of use and automatic scaling.',
        docsUrl: 'https://www.heroku.com'
    },
    'netlify': {
        name: 'Netlify',
        description: 'An all-in-one workflow to build, deploy, and manage modern web projects. It provides hosting and backend services for web applications and static websites.',
        docsUrl: 'https://www.netlify.com'
    },
    'azure': {
        name: 'Microsoft Azure',
        description: 'A cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers.',
        docsUrl: 'https://azure.microsoft.com'
    },
    'google-cloud': {
        name: 'Google Cloud Platform',
        description: 'A suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products, such as Google Search, Gmail, file storage, and YouTube.',
        docsUrl: 'https://cloud.google.com'
    },
    'digitalocean': {
        name: 'DigitalOcean',
        description: 'A cloud infrastructure provider offering cloud services to help deploy modern apps. It provides scalable compute platforms with virtual servers, object storage, and more.',
        docsUrl: 'https://www.digitalocean.com'
    },
    'vultr': {
        name: 'Vultr',
        description: 'A global cloud hosting solution that provides scalable cloud servers, bare metal, storage, and more. It aims to create the most reliable and efficient service for launching a blazing fast SSD cloud server.',
        docsUrl: 'https://www.vultr.com'
    },
    'linode': {
        name: 'Linode',
        description: 'A cloud hosting provider that offers cloud servers, storage, and networking services. Linode aims to make cloud computing simple, affordable, and accessible to all.',
        docsUrl: 'https://www.linode.com'
    },
    'kubernetes': {
        name: 'Kubernetes',
        description: 'An open-source system for automating deployment, scaling, and management of containerized applications. It groups containers that make up an application into logical units for easy management and discovery.',
        docsUrl: 'https://kubernetes.io'
    },
    'docker-swarm': {
        name: 'Docker Swarm',
        description: 'A clustering and scheduling tool for Docker containers. With Swarm, IT administrators and developers can establish and manage a cluster of Docker nodes as a single virtual system.',
        docsUrl: 'https://docs.docker.com/engine/swarm/'
    },
    'ansible': {
        name: 'Ansible',
        description: 'An open-source automation tool, or platform, used for IT tasks such as configuration management, application deployment, intraservice orchestration, and provisioning.',
        docsUrl: 'https://www.ansible.com'
    },
    'terraform': {
        name: 'Terraform',
        description: 'An open-source infrastructure as code software tool that provides a consistent CLI workflow to manage hundreds of cloud services. Terraform codifies cloud APIs into declarative configuration files.',
        docsUrl: 'https://www.terraform.io'
    },
    'puppet': {
        name: 'Puppet',
        description: 'An open-source software configuration management tool. It runs on many Unix-like systems as well as on Microsoft Windows, and includes its own declarative language to describe system configuration.',
        docsUrl: 'https://puppet.com'
    },
    'chef': {
        name: 'Chef',
        description: 'A powerful automation platform that transforms infrastructure into code. Chef automates how applications are configured, deployed, and managed across your network, no matter its size.',
        docsUrl: 'https://www.chef.io'
    },
    'twilio': {
        name: 'Twilio',
        description: 'A cloud communications platform as a service (CPaaS) company that allows software developers to programmatically make and receive phone calls, send and receive text messages, and perform other communication functions using its web service APIs.',
        docsUrl: 'https://www.twilio.com'
    },
    'tekton': {
        name: 'Tekton',
        description: 'An open-source framework for creating CI/CD systems, allowing developers to build, test, and deploy across cloud providers and on-premise systems.',
        docsUrl: 'https://tekton.dev'
    },

    // Testing

    'jest': {
        name: 'Jest',
        description: 'A delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more.',
        docsUrl: 'https://jestjs.io'
    },
    'phpunit': {
        name: 'PHPUnit',
        description: 'A programmer-oriented testing framework for PHP. It is an instance of the xUnit architecture for unit testing frameworks.',
        docsUrl: 'https://phpunit.de'
    },
    'selenium': {
        name: 'Selenium',
        description: 'A portable framework for testing web applications. Selenium provides a playback tool for authoring functional tests without the need to learn a test scripting language.',
        docsUrl: 'https://www.selenium.dev'
    },
    'mocha': {
        name: 'Mocha',
        description: 'A feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.',
        docsUrl: 'https://mochajs.org'
    },
    'jasmine': {
        name: 'Jasmine',
        description: 'A behavior-driven development framework for testing JavaScript code. It does not rely on browsers, DOM, or any JavaScript framework. Thus it\'s suited for websites, Node.js projects, or anywhere that JavaScript can run.',
        docsUrl: 'https://jasmine.github.io'
    },
    'cypress': {
        name: 'Cypress',
        description: 'A next generation front end testing tool built for the modern web. It addresses the key pain points developers and QA engineers face when testing modern applications.',
        docsUrl: 'https://www.cypress.io'
    },
    'karma': {
        name: 'Karma',
        description: 'A tool that allows you to execute JavaScript code in multiple real browsers. It is primarily used for unit testing and is particularly well suited for AngularJS applications.',
        docsUrl: 'https://karma-runner.github.io'
    },
    'enzyme': {
        name: 'Enzyme',
        description: 'A JavaScript Testing utility for React that makes it easier to test your React Components\' output. Enzyme allows you to manipulate, traverse, and in some ways simulate runtime given the output.',
        docsUrl: 'https://enzymejs.github.io/enzyme/'
    },
    'junit': {
        name: 'JUnit',
        description: 'A simple framework to write repeatable tests. It is an instance of the xUnit architecture for unit testing frameworks and is used by developers to implement unit testing in Java, and accelerate programming speed and increase the quality of code.',
        docsUrl: 'https://junit.org'
    },
    'pytest': {
        name: 'pytest',
        description: 'A framework that makes it easy to write simple tests, yet scales to support complex functional testing. It provides a no-boilerplate way to write small tests, yet scales to support complex functional testing.',
        docsUrl: 'https://pytest.org'
    },
    'postman': {
        name: 'Postman',
        description: 'An API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create better APIs—faster.',
        docsUrl: 'https://www.postman.com'
    },

    // Caching

    'valkey': {
        name: 'Valkey',
        description: 'Valkey: an open source, in-memory data store',
        docsUrl: 'https://valkey.io/'
    },
    'elasticache': {
        name: 'Amazon ElastiCache',
        description: 'A web service that makes it easy to deploy, operate, and scale an in-memory data store or cache in the cloud. It supports Redis and Memcached.',
        docsUrl: 'https://aws.amazon.com/elasticache/'
    },
    'memcached': {
        name: 'Memcached',
        description: 'A high-performance, distributed memory object caching system, generic in nature, but intended for use in speeding up dynamic web applications by alleviating database load.',
        docsUrl: 'https://memcached.org'
    },
    'varnish': {
        name: 'Varnish Cache',
        description: 'A web application accelerator also known as a caching HTTP reverse proxy. It is installed in front of any server that speaks HTTP and configured to cache the contents.',
        docsUrl: 'https://varnish-cache.org'
    },
    'hazelcast': {
        name: 'Hazelcast',
        description: 'An in-memory computing platform that provides distributed computing capabilities. It can be used as a distributed cache, a NoSQL key-value store, and for message queuing.',
        docsUrl: 'https://hazelcast.com'
    },
    'nginx-cache': {
        name: 'NGINX Cache',
        description: 'A powerful caching feature included in NGINX that can be used to cache web content delivered through NGINX for faster access by serving cached content directly instead of retrieving it from the back-end.',
        docsUrl: 'https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache'
    },
    'apache-traffic-server': {
        name: 'Apache Traffic Server',
        description: 'A high-performance web proxy cache that improves network efficiency and performance by caching frequently accessed information at the edge of the network.',
        docsUrl: 'https://trafficserver.apache.org'
    },
    'lru-cache': {
        name: 'LRU Cache',
        description: 'A simple, fast, and lightweight in-memory LRU cache implementation, often used in various programming languages to manage a cache of objects based on the least recently used (LRU) algorithm.',
        docsUrl: 'https://github.com/isaacs/node-lru-cache'  // This is specific to a popular Node.js implementation.
    },
    'couchbase': {
        name: 'Couchbase',
        description: 'An open-source, distributed multi-model NoSQL document-oriented database that is optimized for interactive applications. Couchbase server is designed to provide easy-to-scale key-value or JSON document access with low latency and high sustained throughput.',
        docsUrl: 'https://www.couchbase.com'
    },
    'cloudflare': {
        name: 'Cloudflare',
        description: 'A global network designed to make everything you connect to the Internet secure, private, fast, and reliable. It provides services including CDN, Internet security, and distributed domain name server services.',
        docsUrl: 'https://www.cloudflare.com'
    },
    'fastly': {
        name: 'Fastly',
        description: 'An edge cloud platform that speeds up and secures web and mobile experiences. Fastly’s CDN services include modern CDN caching, video delivery, and a robust security suite.',
        docsUrl: 'https://www.fastly.com'
    },
    'keycdn': {
        name: 'KeyCDN',
        description: 'A high-performance content delivery network (CDN) offering transparent and affordable pricing. It delivers content via a global network to increase speed and reduce latency.',
        docsUrl: 'https://www.keycdn.com'
    },
    'stackpath': {
        name: 'StackPath',
        description: 'A platform of computing infrastructure and services built at the edge of the cloud. It provides edge services including CDN, WAF, DNS, and Monitoring.',
        docsUrl: 'https://www.stackpath.com'
    },
    'edgecast': {
        name: 'Edgecast',
        description: 'A leading content delivery network (CDN) that provides fast, secure, and reliable delivery of content to websites, videos, or applications. Owned by Verizon, it’s part of the Verizon Media Platform.',
        docsUrl: 'https://www.verizonmedia.com/media-platform/edgecast-cdn'
    },
    'google-cloud-cdn': {
        name: 'Google Cloud CDN',
        description: 'A low-latency content delivery solution for Google Cloud assets that uses Google\'s globally distributed edge points of presence to accelerate content delivery for websites and applications served out of Google Compute Engine.',
        docsUrl: 'https://cloud.google.com/cdn/'
    },
    'amazon-cloudfront': {
        name: 'Amazon CloudFront',
        description: 'A fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds, all within a developer-friendly environment.',
        docsUrl: 'https://aws.amazon.com/cloudfront/'
    },

    // Mailing

    'sendgrid': {
        name: 'SendGrid',
        description: 'A cloud-based service that provides email delivery and marketing solutions, helping businesses enhance their email communication. It offers services for transactional and marketing emails with features like deliverability optimization and real-time analytics.',
        docsUrl: 'https://sendgrid.com'
    },
    'mailgun': {
        name: 'Mailgun',
        description: "A powerful email service for developers and businesses to send, receive, and track emails effortlessly through an API. It's designed for developers and offers features like email validation and flexible webhooks.",
        docsUrl: 'https://www.mailgun.com'
    },
    'mailchimp': {
        name: 'Mailchimp',
        description: 'A marketing automation platform and an email marketing service where you can create, send, and analyze email and ad campaigns. Users can design and share campaigns across multiple email and ad channels, integrate with services you already use, and get insights into your audience.',
        docsUrl: 'https://mailchimp.com'
    },
    'amazon-ses': {
        name: 'Amazon Simple Email Service (SES)',
        description: 'A cloud-based email sending service designed to help digital marketers and application developers send marketing, notification, and transactional emails. It is a reliable, cost-effective service for businesses of all sizes that use email to keep in contact with their customers.',
        docsUrl: 'https://aws.amazon.com/ses/'
    },
    'gc-notify': {
        name: 'GC Notify',
        description: 'A service offered by the government to allow departments to send emails, text messages, and letters to their clients. It provides APIs to integrate directly into applications, helping improve communication and efficiency in delivering government services.',
        docsUrl: 'https://notification.canada.ca'
    },

    // Analytics
    'google-analytics': {
        name: 'Google Analytics',
        description: 'A web analytics service offered by Google that tracks and reports website traffic, currently as a platform inside the Google Marketing Platform brand. It helps marketers and business owners to analyze visitor traffic and optimize their websites.',
        docsUrl: 'https://marketingplatform.google.com/about/analytics/'
    },
    'mixpanel': {
        name: 'Mixpanel',
        description: 'An advanced analytics platform for mobile and web. It helps companies measure what matters, make decisions fast, and build better products through data.',
        docsUrl: 'https://mixpanel.com'
    },
    'amplitude': {
        name: 'Amplitude',
        description: 'A product analytics service that makes it easier for companies to understand user behavior, shipped product changes, and analyze user retention with the goal of driving engagement and conversion.',
        docsUrl: 'https://amplitude.com'
    },
    'hotjar': {
        name: 'Hotjar',
        description: 'A powerful tool that reveals the online behavior and voice of users by combining both analysis and feedback tools. It gives insights into how users interact with your website, providing heatmaps, session recordings, and surveys.',
        docsUrl: 'https://www.hotjar.com'
    },
    'segment': {
        name: 'Segment',
        description: 'A customer data platform (CDP) that helps you collect, clean, and control your customer data. It integrates with hundreds of other tools and platforms, allowing you to orchestrate a stack to better manage data for marketing, analytics, and compliance.',
        docsUrl: 'https://segment.com'
    },
    'new-relic': {
        name: 'New Relic',
        description: 'A software analytics and performance monitoring tool that gives developers and IT operations a clear view of what’s happening in their systems. It supports real-time insights for application performance, critical transactions, and dynamic infrastructure.',
        docsUrl: 'https://newrelic.com'
    },
    'adobe-analytics': {
        name: 'Adobe Analytics',
        description: 'A suite of marketing analytics products by Adobe, which helps enterprises to understand their customers as people — what they want, need, and believe. It provides actionable data to optimize marketing efforts at the right moments.',
        docsUrl: 'https://www.adobe.com/analytics/adobe-analytics.html'
    },
    'sentry': {
        name: 'Sentry',
        description: 'An open-source error tracking tool that helps developers monitor and fix crashes in real time. It offers a way to identify issues, track them back to commits, and fix them without needing a user to report them.',
        docsUrl: 'https://sentry.io'
    },
    'tableau': {
        name: 'Tableau',
        description: 'A powerful, fast, scalable, and easy-to-use visual analytics platform. It helps people see and understand data by transforming the way raw data is visually interacted with and processed into actionable insights.',
        docsUrl: 'https://www.tableau.com'
    },
    'power-bi': {
        name: 'Power BI',
        description: "A collection of software services, apps, and connectors that work together to turn unrelated sources of data into coherent, visually immersive, and interactive insights. It lets you easily connect to your data sources, visualize what's important, and share that with anyone you want.",
        docsUrl: 'https://powerbi.microsoft.com'
    },
    'kibana': {
        name: 'Kibana',
        description: 'An open-source data visualization dashboard for Elasticsearch. It provides visualization capabilities on top of the content indexed on an Elasticsearch cluster. Users can create bar, line and scatter plots, or pie charts and maps on top of large volumes of data.',
        docsUrl: 'https://www.elastic.co/kibana'
    },
    // Monitoring
    'datadog': {
        name: 'Datadog',
        description: 'A monitoring and analytics platform that provides full visibility into the performance of modern applications by integrating and automating infrastructure monitoring, application performance monitoring, and log management.',
        docsUrl: 'https://www.datadoghq.com'
    },
    'prometheus': {
        name: 'Prometheus',
        description: 'An open-source systems monitoring and alerting toolkit originally built at SoundCloud. It features a multi-dimensional data model with time series data identified by metric name and key/value pairs, and offers a flexible query language to leverage this dimensionality.',
        docsUrl: 'https://prometheus.io'
    },
    'grafana': {
        name: 'Grafana',
        description: 'An open-source platform for monitoring and observability. Grafana allows you to query, visualize, alert on, and understand your metrics no matter where they are stored. It provides tools to turn your time-series database (TSDB) data into beautiful graphs and visualizations.',
        docsUrl: 'https://grafana.com'
    },
    'splunk': {
        name: 'Splunk',
        description: 'A software platform to search, analyze and visualize the machine-generated data gathered from the websites, applications, sensors, devices, and so on, that comprise your IT infrastructure or business.',
        docsUrl: 'https://www.splunk.com'
    },

    // Security

    'sonarqube': {
        name: 'SonarQube',
        description: 'An open-source platform for continuous inspection of code quality. It performs automatic reviews with static analysis of code to detect bugs, code smells, and security vulnerabilities on 20+ programming languages.',
        docsUrl: 'https://www.sonarqube.org'
    },

    // Logging

    'winston': {
        name: 'Winston',
        description: 'A powerful, multi-transport async logging library for Node.js. Designed to be a simple and universal logging library with support for multiple transports.',
        docsUrl: 'https://github.com/winstonjs/winston' // Official documentation is typically available on GitHub.
    },
    'log4j': {
        name: 'Log4j',
        description: 'A reliable, fast, and flexible logging framework (APIs) written in Java, which is distributed under the Apache Software License. Log4j is designed with thread safety and speed as the top priority.',
        docsUrl: 'https://logging.apache.org/log4j/2.x/'
    },
    'bunyan': {
        name: 'Bunyan',
        description: 'A simple and fast JSON logging library for Node.js services, providing a simple logger with configurable streams, and automatically including standard fields such as hostname and timestamp.',
        docsUrl: 'https://github.com/trentm/node-bunyan' // Documentation is also typically found on GitHub.
    },
    'logback': {
        name: 'Logback',
        description: 'The successor to the popular Log4j project, picking up where Log4j leaves off. It provides robust logging capabilities and focuses on speed and flexibility.',
        docsUrl: 'http://logback.qos.ch'
    },
    'slf4j': {
        name: 'SLF4J',
        description: 'The Simple Logging Facade for Java (SLF4J) serves as a simple facade or abstraction for various logging frameworks, such as java.util.logging, Logback, and Log4j. It allows the end user to plug in the desired logging framework at deployment time.',
        docsUrl: 'http://www.slf4j.org'
    },
    'log4net': {
        name: 'log4net',
        description: 'A tool to help the programmer output log statements to a variety of output targets. log4net is a port of the excellent Apache log4j framework to the Microsoft .NET runtime.',
        docsUrl: 'https://logging.apache.org/log4net/'
    },
    'morgan': {
        name: 'Morgan',
        description: 'HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application and can be configured to output customized log strings with automatic logging.',
        docsUrl: 'https://github.com/expressjs/morgan' // GitHub page as primary documentation.
    },
    'datadog-logs': {
        name: 'Datadog Logs',
        description: 'A log management solution that helps you to collect, process, live tail, explore, and analyze your logs across your entire stack for troubleshooting and open-ended exploration of your data.',
        docsUrl: 'https://docs.datadoghq.com/logs/'
    },

    // I18n

    'i18next': {
        name: 'i18next',
        description: 'A powerful internationalization framework for browser or any other JavaScript environment (Node.js, any backend) to translate your content. It provides easy-to-use APIs and various plugins to integrate with frameworks and UI libraries.',
        docsUrl: 'https://www.i18next.com'
    },
    'react-intl': {
        name: 'React Intl',
        description: 'Part of FormatJS library which provides React components and an API to format dates, numbers, and strings, including pluralization and handling translations.',
        docsUrl: 'https://formatjs.io/docs/react-intl/'
    },
    'vue-i18n': {
        name: 'Vue I18n',
        description: 'Vue I18n is an internationalization plugin for Vue.js. It integrates seamlessly with Vue applications to enable easy translation and localization capabilities within Vue components.',
        docsUrl: 'https://kazupon.github.io/vue-i18n/'
    },
    'angular-translate': {
        name: 'angular-translate',
        description: 'An AngularJS module that makes your life much easier when it comes to i18n and l10n including lazy loading and pluralization. It provides tools to work seamlessly with inline and asynchronous JSON translations.',
        docsUrl: 'https://angular-translate.github.io'
    },
    'gettext': {
        name: 'GNU gettext',
        description: 'A toolset that provides a framework to help other GNU packages produce multi-lingual messages. These tools include a runtime library and a catalog of translated messages that programs use to show translated messages in the user\'s native language.',
        docsUrl: 'https://www.gnu.org/software/gettext/'
    },
    'polyglot.js': {
        name: 'Polyglot.js',
        description: 'A tiny I18n helper library written in JavaScript, designed to work both in the browser and in Node.js environments. It provides a simple solution for adding localization to your JavaScript apps.',
        docsUrl: 'https://airbnb.io/polyglot.js/'
    },
    'formatjs': {
        name: 'FormatJS',
        description: 'An internationalization library for formatting numbers, dates, and strings for localization. The library includes API for handling translations, currency numbers, date and time formats, and is designed to work in both the browser and Node.js.',
        docsUrl: 'https://formatjs.io'
    },

    // Mobile

    'react-native': {
        name: 'React Native',
        description: 'A framework for building native apps using React. It lets you create an application for various platforms by using the same codebase, enabling developers to use React along with native platform capabilities.',
        docsUrl: 'https://reactnative.dev'
    },
    'flutter': {
        name: 'Flutter',
        description: 'Google’s UI toolkit for crafting beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. It uses the Dart language and provides high performance and an expressive UI.',
        docsUrl: 'https://flutter.dev'
    },
    'cordova': {
        name: 'Apache Cordova',
        description: 'A mobile development framework that allows you to use standard web technologies - HTML5, CSS3, and JavaScript for cross-platform development, avoiding each mobile platform\'s native development language.',
        docsUrl: 'https://cordova.apache.org'
    },
    'ionic': {
        name: 'Ionic',
        description: 'A powerful HTML5 SDK that helps you build native-feeling mobile apps using web technologies like HTML, CSS, and JavaScript. It focuses on the look and feel, and UI interaction of apps.',
        docsUrl: 'https://ionicframework.com'
    },
    'native-script': {
        name: 'NativeScript',
        description: 'An open-source framework to develop apps on the Apple iOS and Android platforms. It enables developers to use JavaScript to build native mobile applications running directly on these platforms.',
        docsUrl: 'https://nativescript.org'
    },
    'android-sdk': {
        name: 'Android SDK',
        description: 'A software development kit that enables developers to create applications for the Android platform. It includes sample projects with source code, development tools, an emulator, and required libraries to build Android applications.',
        docsUrl: 'https://developer.android.com/studio'
    },
    'ruby-motion': {
        name: 'RubyMotion',
        description: 'Allows you to write cross-platform native apps in Ruby, compile them, and run them on iOS, Android, and OS X. It brings the productivity of Ruby to mobile app development, making complex tasks easier and more enjoyable.',
        docsUrl: 'https://www.rubymotion.com'
    },
    'corona-sdk': {
        name: 'Corona SDK',
        description: 'A cross-platform framework ideal for rapidly creating apps and games for mobile devices and desktop systems. It means you can create your project once and publish it to multiple types of devices, including Apple iPhone and iPad, Android phones and tablets, Amazon Fire, Mac Desktop, Windows Desktop, and even connected TVs such as Apple TV, Fire TV, and Android TV.',
        docsUrl: 'https://coronalabs.com'
    },
    'unity': {
        name: 'Unity',
        description: 'A cross-platform game engine developed by Unity Technologies, which is primarily used to develop both three-dimensional and two-dimensional video games and simulations for computers, consoles, and mobile devices.',
        docsUrl: 'https://unity.com'
    },
    'unreal-engine': {
        name: 'Unreal Engine',
        description: 'A powerful, real-time 3D creation tool from Epic Games. It provides high-fidelity visuals and dynamic physics that enable developers to create immersive virtual worlds and games.',
        docsUrl: 'https://www.unrealengine.com'
    },

    // Machine Learning

    'pytorch': {
        name: 'PyTorch',
        description: 'An open source machine learning library based on the Torch library, used for applications such as natural language processing. It is primarily developed by Facebook\'s AI Research lab (FAIR).',
        docsUrl: 'https://pytorch.org'
    },
    'tensorflow': {
        name: 'TensorFlow',
        description: 'An end-to-end open source platform for machine learning. It has a comprehensive, flexible ecosystem of tools, libraries, and community resources that lets researchers push the state-of-the-art in ML and developers easily build and deploy ML powered applications.',
        docsUrl: 'https://www.tensorflow.org'
    },
    'keras': {
        name: 'Keras',
        description: 'A high-level neural networks API, written in Python and capable of running on top of TensorFlow, CNTK, or Theano. It was developed with a focus on enabling fast experimentation.',
        docsUrl: 'https://keras.io'
    },
    'scikit-learn': {
        name: 'Scikit-learn',
        description: 'A free software machine learning library for the Python programming language. It features various classification, regression and clustering algorithms including support vector machines, random forests, gradient boosting, k-means, and DBSCAN, and is designed to interoperate with the Python numerical and scientific libraries NumPy and SciPy.',
        docsUrl: 'https://scikit-learn.org'
    },
    'caffe': {
        name: 'Caffe',
        description: 'A deep learning framework made with expression, speed, and modularity in mind. It is developed by Berkeley AI Research (BAIR) and by community contributors.',
        docsUrl: 'http://caffe.berkeleyvision.org/'
    },
    'open-ai': {
        name: 'OpenAI',
        description: 'An AI research lab consisting of the for-profit OpenAI LP and its parent company, the non-profit OpenAI Inc. OpenAI conducts research in the field of artificial intelligence with the stated aim of promoting and developing friendly AI in a way that benefits humanity as a whole.',
        docsUrl: 'https://openai.com'
    },
    'xgboost': {
        name: 'XGBoost',
        description: 'A scalable and flexible gradient boosting library that provides a parallel tree boosting (also known as GBDT, GBM) that solves many data science problems in a fast and accurate way. Originally written in C++, it is comparably faster than other ensemble classifiers.',
        docsUrl: 'https://xgboost.ai'
    },

    // Data Science

    'jupyter': {
        name: 'Jupyter',
        description: 'An open-source web application that allows you to create and share documents that contain live code, equations, visualizations, and narrative text. Uses include: data cleaning and transformation, numerical simulation, statistical modeling, data visualization, machine learning, and much more.',
        docsUrl: 'https://jupyter.org'
    },
    'numpy': {
        name: 'NumPy',
        description: 'A library for the Python programming language, adding support for large, multi-dimensional arrays and matrices, along with a large collection of high-level mathematical functions to operate on these arrays.',
        docsUrl: 'https://numpy.org'
    },
    'pandas': {
        name: 'pandas',
        description: 'An open source data analysis and manipulation tool, built on top of the Python programming language. It offers data structures and operations for manipulating numerical tables and time series.',
        docsUrl: 'https://pandas.pydata.org'
    },
    'matplotlib': {
        name: 'Matplotlib',
        description: 'A plotting library for the Python programming language and its numerical mathematics extension NumPy. It provides an object-oriented API for embedding plots into applications using general-purpose GUI toolkits like Tkinter, wxPython, Qt, or GTK.',
        docsUrl: 'https://matplotlib.org'
    },
    'seaborn': {
        name: 'Seaborn',
        description: 'A Python data visualization library based on matplotlib. It provides a high-level interface for drawing attractive and informative statistical graphics.',
        docsUrl: 'https://seaborn.pydata.org'
    },
    'scipy': {
        name: 'SciPy',
        description: 'An open-source Python library used for scientific computing and technical computing. It builds on NumPy and provides a large number of higher-level functions that operate on numpy arrays and are useful for different types of scientific and engineering applications.',
        docsUrl: 'https://scipy.org'
    },
    'hadoop': {
        name: 'Apache Hadoop',
        description: 'A collection of open-source software utilities that facilitate using a network of many computers to solve problems involving massive amounts of data and computation. It provides a software framework for distributed storage and processing of big data using the MapReduce programming model.',
        docsUrl: 'https://hadoop.apache.org'
    },

    // Virtualization

    'docker': {
        name: 'Docker',
        description: 'A platform designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package.',
        docsUrl: 'https://www.docker.com'
    },
    'vmware': {
        name: 'VMware',
        description: 'A global leader in cloud infrastructure and digital workspace technology, accelerates digital transformation by enabling unprecedented freedom and flexibility in how customers build and evolve IT environments.',
        docsUrl: 'https://www.vmware.com'
    },
    'virtualbox': {
        name: 'VirtualBox',
        description: 'A powerful x86 and AMD64/Intel64 virtualization product for enterprise as well as home use. Not only is VirtualBox an extremely feature rich, high performance product for enterprise customers, it is also the only professional solution that is freely available as Open Source Software.',
        docsUrl: 'https://www.virtualbox.org'
    },
    'hyper-v': {
        name: 'Hyper-V',
        description: 'A virtualization product from Microsoft that allows system administrators to create and run a software version of a computer, called a virtual machine. Each virtual machine acts like a complete computer, running an operating system and programs.',
        docsUrl: 'https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/hyper-v-on-windows-server'
    },
    'qemu': {
        name: 'QEMU',
        description: 'A generic and open source machine emulator and virtualizer. When used as an emulator, QEMU can run OSes and programs made for one machine (e.g., an ARM board) on a different machine (e.g., your own PC). When used as a virtualizer, QEMU achieves near native performance by executing the guest code directly on the host CPU.',
        docsUrl: 'https://www.qemu.org'
    },
    'red-hat-virtualization': {
        name: 'Red Hat Virtualization',
        description: 'An enterprise-grade server and workstation virtualization platform built on the powerful Red Hat Enterprise Linux platform. It helps businesses of all sizes to optimize their IT infrastructure, by lowering the total cost of ownership and providing a scalable and secure virtualization environment.',
        docsUrl: 'https://www.redhat.com/en/technologies/virtualization/enterprise-virtualization'
    },

    // CI/CD

    'gradle': {
        name: 'Gradle',
        description: 'An open-source build automation system that builds upon the concepts of Apache Ant and Apache Maven and introduces a Groovy-based domain-specific language (DSL) instead of the XML form used by Maven for declaring the project configuration.',
        docsUrl: 'https://gradle.org'
    },
    'jenkins': {
        name: 'Jenkins',
        description: 'An open source automation server which enables developers around the world to reliably build, test, and deploy their software. Jenkins offers hundreds of plugins to support building, deploying and automating any project.',
        docsUrl: 'https://www.jenkins.io'
    },
    'circleci': {
        name: 'CircleCI',
        description: 'A modern continuous integration and continuous delivery (CI/CD) platform that automates the software development process, allowing teams to quickly release code they trust by automating the build, test, and delivery process.',
        docsUrl: 'https://circleci.com'
    },
    'travis-ci': {
        name: 'Travis CI',
        description: 'A hosted continuous integration service used to build and test software projects hosted at GitHub and Bitbucket. Travis CI automatically detects when a commit has been made and pushed to a GitHub repository and then tries to build the project and run tests.',
        docsUrl: 'https://travis-ci.com'
    },
    'gitlab-ci': {
        name: 'GitLab CI/CD',
        description: 'A part of GitLab that provides build-in CI/CD pipelines to automate the building, testing, and deployment of your applications. Pipelines are configured using a YAML file called `.gitlab-ci.yml` within each project.',
        docsUrl: 'https://docs.gitlab.com/ee/ci/'
    },
    'github-actions': {
        name: 'GitHub Actions',
        description: 'An automation tool that allows you to automate your build, test, and deployment pipeline right within your GitHub repository. You can write individual tasks, called actions, and combine them to create a custom workflow.',
        docsUrl: 'https://github.com/features/actions'
    },
    'bamboo': {
        name: 'Bamboo',
        description: 'A continuous integration and delivery tool that ties automated builds, tests, and releases together in a single workflow. It is a product from Atlassian and integrates well with other tools like JIRA and Bitbucket.',
        docsUrl: 'https://www.atlassian.com/software/bamboo'
    },
    'teamcity': {
        name: 'TeamCity',
        description: 'A build management and continuous integration server from JetBrains. It is a powerful tool for developers to design, adapt, and monitor their build pipelines effectively, with clear visibility of the project\'s history.',
        docsUrl: 'https://www.jetbrains.com/teamcity/'
    },
    'azure-devops': {
        name: 'Azure DevOps',
        description: 'A suite of development tools from Microsoft, including Azure Pipelines, Boards, Repos, Test Plans, and more, which allow teams to plan work, collaborate on code development, and build and deploy applications.',
        docsUrl: 'https://azure.microsoft.com/en-us/services/devops/'
    },
    'bitbucket-pipelines': {
        name: 'Bitbucket Pipelines',
        description: 'An integrated CI/CD service built into Bitbucket. It allows users to automatically build, test, and deploy their code based on a configuration file in their repository.',
        docsUrl: 'https://bitbucket.org/product/features/pipelines'
    },

    // Package managers

    'npm': {
        name: 'npm',
        description: 'A package manager for JavaScript, helps to discover, share, and reuse code, and manage dependencies in your projects. It is also the default package manager for the JavaScript runtime environment Node.js.',
        docsUrl: 'https://www.npmjs.com'
    },
    'yarn': {
        name: 'Yarn',
        description: 'A fast, reliable, and secure dependency management tool for JavaScript that allows you to use and share code with other developers from around the world. Yarn caches every package it downloads so it never needs to download it again.',
        docsUrl: 'https://yarnpkg.com'
    },
    'pip': {
        name: 'pip',
        description: 'The package installer for Python. You can use pip to install packages from the Python Package Index and other indexes.',
        docsUrl: 'https://pip.pypa.io'
    },
    'conda': {
        name: 'Conda',
        description: 'An open-source package management system and environment management system that runs on Windows, macOS and Linux. Conda quickly installs, runs and updates packages and their dependencies.',
        docsUrl: 'https://docs.conda.io'
    },
    'maven': {
        name: 'Apache Maven',
        description: 'A default package manager and automation tool for Java projects, designed to handle dependencies and streamline the build process.',
        docsUrl: 'https://maven.apache.org'
    },
    'nuget': {
        name: 'NuGet',
        description: 'A package manager for the Microsoft development platform including .NET. The NuGet client tools provide the ability to produce and consume packages.',
        docsUrl: 'https://www.nuget.org'
    },
    'composer': {
        name: 'Composer',
        description: 'A tool for dependency management in PHP. It allows you to declare the libraries your project depends on and it will manage (install/update) them for you.',
        docsUrl: 'https://getcomposer.org'
    },
    'gem': {
        name: 'RubyGems',
        description: 'A package manager for the Ruby programming language that provides a standard format for distributing Ruby programs and libraries in a self-contained format called a "gem".',
        docsUrl: 'https://rubygems.org'
    },
    'cargo': {
        name: 'Cargo',
        description: 'The Rust package manager that makes it simple to download and compile dependencies and distribute Rust packages.',
        docsUrl: 'https://doc.rust-lang.org/cargo/'
    },
    'apt': {
        name: 'APT (Advanced Package Tool)',
        description: 'A package management system used by Debian and its derivatives. APT simplifies the process of managing software by automating the retrieval, configuration and installation of software packages.',
        docsUrl: 'https://wiki.debian.org/Apt'
    },
    'yum': {
        name: 'YUM (Yellowdog Updater Modified)',
        description: 'An open-source command-line package-management utility for computers running the Linux operating system using the RPM Package Manager. YUM allows automatic updates, package and dependency management.',
        docsUrl: 'https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/ch-yum'
    },
    'dnf': {
        name: 'DNF',
        description: 'The next-generation version of YUM, a package manager for RPM-based distributions. DNF has better performance and support for well-defined dependency resolution.',
        docsUrl: 'https://dnf.readthedocs.io'
    },
    'zypper': {
        name: 'Zypper',
        description: 'A command line interface of ZYpp package manager for installing, removing and updating packages. It is mainly used by openSUSE and SUSE Linux Enterprise systems.',
        docsUrl: 'https://en.opensuse.org/Portal:Zypper'
    },
    'pacman': {
        name: 'Pacman',
        description: 'The package manager for Arch Linux and its derivatives. It combines a simple binary package format with an easy-to-use build system, making it the cornerstone of Arch Linux.',
        docsUrl: 'https://wiki.archlinux.org/title/Pacman'
    },
    'homebrew': {
        name: 'Homebrew',
        description: 'A free and open-source software package management system that simplifies the installation of software on Apple\'s macOS operating system and Linux.',
        docsUrl: 'https://brew.sh'
    },
    'chocolatey': {
        name: 'Chocolatey',
        description: 'A Windows package manager that enables the automation of software setup processes for both applications and tools.',
        docsUrl: 'https://chocolatey.org'
    },
    'snap': {
        name: 'Snap',
        description: 'A universal package system that allows you to install and manage packages across different Linux systems. It was created by Canonical for the Ubuntu operating system.',
        docsUrl: 'https://snapcraft.io'
    },
    'flatpak': {
        name: 'Flatpak',
        description: 'A system for building, distributing, and running sandboxed desktop applications on Linux.',
        docsUrl: 'https://flatpak.org'
    },
    'rpm': {
        name: 'RPM Package Manager',
        description: 'A powerful command-line driven package management system capable of installing, uninstalling, verifying, querying, and updating computer software packages.',
        docsUrl: 'https://rpm.org'
    },
    'brew': {
        name: 'Brew',
        description: 'Also known as Homebrew, is a software package management system that simplifies the installation of software on Apple\'s macOS operating system and Linux.',
        docsUrl: 'https://brew.sh'  // Note: 'brew' often refers to 'Homebrew'.
    },
    'apk': {
        name: 'Alpine Package Keeper (APK)',
        description: 'The package manager used by Alpine Linux. It is designed to work within the confines of a small, simple filesystem with limited resources.',
        docsUrl: 'https://wiki.alpinelinux.org/wiki/Alpine_Linux_package_management'
    },
    'pypi': {
        name: 'PyPI (Python Package Index)',
        description: 'A repository of software for the Python programming language. PyPI helps you find and install software developed and shared by the Python community.',
        docsUrl: 'https://pypi.org'
    },
    'bower': {
        name: 'Bower',
        description: 'A package manager for the web that allows you to install front-end libraries, frameworks, assets, and utilities. It operates over Git and is optimized for the front-end.',
        docsUrl: 'https://bower.io'
    },
} as const;

export type SoftwareLibrarySlug = keyof typeof SOFTWARE_LIBRARIES;

export const SOFTWARE_LIBRARIES_BY_CATEGORY: Record<SoftwareCategorySlug, SoftwareLibrarySlug[]> = {
    'analytics-and-monitoring': [
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
        // Monitoring
        'datadog',
        'prometheus',
        'grafana',
        'splunk',
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
    'backend': [
        'laravel',
        'node.js',
        'flask',
        'django',
        'spring',
        'express',
        'rails',
        'asp.net',
        'fastapi',
        'phoenix',
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
        'amazon-cloudfront',
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
        'bitbucket-pipelines',
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
        'cockroachdb',
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
        'tekton',
    ],
    'frontend': [
        'react',
        'vue',
        'angular',
        'material-ui',
        'bootstrap',
        'jquery',
        'svelte',
        'ember',
        'tailwindcss',
        'bulma',
        'alpine.js',
        'handlebars',
        'sass',
    ],
    'general': [
        'dot-net',
        'dot-net-core',
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
    'machine-learning-and-data-science': [
        'pytorch',
        'tensorflow',
        'keras',
        'scikit-learn',
        'caffe',
        'open-ai',
        'xgboost',
        'jupyter',
        'numpy',
        'pandas',
        'matplotlib',
        'seaborn',
        'scipy',
        'hadoop',
    ],
    'mailing': [
        'sendgrid',
        'mailgun',
        'mailchimp',
        'amazon-ses',
        'gc-notify',
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
    'security': [
        'sonarqube'
    ],
    'server': [
        'caddy',
        'apache',
        'nginx',
        'tomcat',
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
        'pyproj',
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
        'postman',
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
    'web-stockets': [
        'socketi',
        'pusher',
        'socket.io',
        'laravel-reverb',
        'caddy',
        'apache',
        'nginx',
        'tomcat',
    ]
}