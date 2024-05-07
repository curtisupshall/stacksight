'use server'

import { List, ListItem, Typography } from "@mui/material";
// import { db } from "../../database/db";
import { useEffect } from "react";

import { Client } from 'pg'
import knex from "knex";

const connection = {
    host: process.env.POSTGRES_DATABASE_HOST,
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : undefined,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
}

const db = knex({
    client: 'mysql',
    connection
})

const client = new Client(connection)

console.log('connection config:', connection)

export default async function ProjectsPage() {
    const projects: any[] = [];
    
    client.connect();

    await client.query(`
        SELECT * FROM software_project
    `, (err, res) => {
        console.error(err)
        console.log(res.rows)
    })
       
    // client.end();

    return (
        <div>
            <Typography variant='h6'>My Projects</Typography>
            <List>
                {projects.map((project: any) => {
                    return (
                        <ListItem>{JSON.stringify(project)}</ListItem>
                    )
                })}
            </List>
        </div>
    )
}
