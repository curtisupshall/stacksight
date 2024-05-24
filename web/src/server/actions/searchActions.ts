// 'use server'

// import { DbConnection } from "../database/db";
// import { SearchService } from "../services/search-service";

// export async function handleSearch(searchQuery: string) {
//     // const searchQuery = formData.get('q');

//     const connection = new DbConnection();

//     try {
//         await connection.open();
        
//         const searchService = new SearchService(connection);

//         const results = await searchService.searchByKeyword(String(searchQuery));
        
//         await connection.commit();

//         return results;
//     } catch (error) {
//         connection.rollback();
//         throw error;
//     } finally {
//         connection.release();
//     }
// }
