import {AbstractSqliteDriver} from "../sqlite-abstract/AbstractSqliteDriver";
import {TauriSqlConnectionOptions} from "./TauriSqlConnectionOptions";
import Database from '@tauri-apps/plugin-sql';
import {QueryRunner} from "../../query-runner/QueryRunner";
import {TauriSqlQueryRunner} from "./TauriSqlQueryRunner";

export class TauriSqlDriver extends AbstractSqliteDriver {
    transactionSupport = "none" as const
    databaseConnection: Database;

    protected createDatabaseConnection(): Promise<Database> {
        const options = this.options as TauriSqlConnectionOptions;
        return Database.load(options.database);
    }

    createQueryRunner(): QueryRunner {
        return new TauriSqlQueryRunner(this);
    }
}
