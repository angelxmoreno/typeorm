/* eslint-disable @typescript-eslint/no-explicit-any */
import Database from "tauri-plugin-sql-api";
import {QueryResult} from "../../query-runner/QueryResult";
import {AbstractSqliteQueryRunner} from "../sqlite-abstract/AbstractSqliteQueryRunner";
import {Broadcaster} from "../../subscriber/Broadcaster";
import {TauriSqlDriver} from "./TauriSqlDriver";

export class TauriSqlQueryRunner extends AbstractSqliteQueryRunner {
    databaseConnection: Database

    constructor(driver: TauriSqlDriver) {
        super()
        this.databaseConnection = driver.databaseConnection;
        this.driver = driver;
        this.broadcaster = new Broadcaster(this); // will add broadcasting events later
    }

    async query(
        query: string,
        parameters?: any[],
        useStructuredResult = false,
    ): Promise<any> {
        const queryResult = new QueryResult();
        const isSelectQuery = query.trim().toLowerCase().startsWith('select');

        const result = isSelectQuery
            ? await this.databaseConnection.select<any>(query, parameters)
            : await this.databaseConnection.execute(query, parameters);

        queryResult.raw = result;
        queryResult.records = isSelectQuery ? result : [];
        queryResult.affected = isSelectQuery ? undefined : result.rowsAffected;

        return useStructuredResult ? queryResult : queryResult.raw;
    }

}
