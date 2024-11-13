import pgp from 'pg-promise';
import { join } from "path";

export interface DatabaseConnection {
    query(statment: string, params: any): Promise<any>;
    close(): Promise<any>;
    executeScript(pathScript: string): Promise<any>;
}

class PgPromiseAdapter implements DatabaseConnection {

    public connection: any;

    constructor () {
        this.connection = pgp()('postgresql://postgres:webdesign@localhost:5432/strategy-sale.db?schema=public');
    }
    
    async query (statment: string, params: any) {
        return await this.connection.query(statment, params);
    }
    
    async executeScript (pathScript: string) {
        const pgPromise = pgp();
        const filePath = join(pathScript);
        const query = new pgPromise.QueryFile(filePath);
        return await this.connection.query(query);
    }
    
    async close(): Promise<any> {
        this.connection.$pool.end();
    }
    
}

export { PgPromiseAdapter }
