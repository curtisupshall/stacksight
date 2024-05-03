import os
import psycopg2
from psycopg2 import sql
from psycopg2.extras import execute_values

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Load environment variables
POSTGRES_DB = os.getenv('POSTGRES_DB')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_HOST = os.getenv('DATABASE_HOST', 'localhost')  # Default to localhost if not specified
POSTGRES_PORT = os.getenv('POSTGRES_PORT', '5432')        # Default to 5432 if not specified

# Construct connection string
conn_info = f"dbname='{POSTGRES_DB}' user='{POSTGRES_USER}' password='{POSTGRES_PASSWORD}' host='{POSTGRES_HOST}' port='{POSTGRES_PORT}'"

def connect_to_db():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # Connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(conn_info)

        # Create a cursor
        cur = conn.cursor()
        
        # Execute a statement
        print('PostgreSQL database version:')
        cur.execute('SELECT version()')

        # Display the PostgreSQL database server version
        db_version = cur.fetchone()
        print(db_version)
       
        # Close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None and conn.closed == 0:
            conn.close()
            print('Database connection closed.')

if __name__ == '__main__':
    connect_to_db()
