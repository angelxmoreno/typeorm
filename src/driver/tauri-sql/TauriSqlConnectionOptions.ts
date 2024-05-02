import { BaseDataSourceOptions } from "../../data-source/BaseDataSourceOptions"

/**
 * Sqlite-specific connection options.
 */
export interface TauriSqlConnectionOptions extends BaseDataSourceOptions {
    /**
     * Database type.
     */
    readonly type: "tauri-sql"

    /**
     * Database name.
     */
    readonly database: string

    /**
     * Driver module
     */
    readonly driver?: any

    readonly poolSize?: never
}
