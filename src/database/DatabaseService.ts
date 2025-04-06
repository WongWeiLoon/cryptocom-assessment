import * as SQLite from 'expo-sqlite';
import { CRYPTO_TABLE, CURRENCY_INFO_DB, FIAT_TABLE } from "@src/constants/dbConstants"
import { CurrencyInfo } from './models/CurrencyInfo';

/**
 * Opens the SQLite database asynchronously.
 *
 * @returns {Promise<SQLite.SQLiteDatabase>} A Promise that resolves with the SQLiteDatabase object.
 */
const openDatabase = () => {
    return SQLite.openDatabaseAsync(CURRENCY_INFO_DB);
}

/**
 * Initializes the SQLite database by creating tables (CryptoCurrency and FiatCurrency)
 * if they don't already exist.
 *
 * @async
 * 
 * @returns {Promise<void>} A Promise that resolves when the database initialization is complete.
 */
const initDatabase = async () => {
    try {
        const db = await openDatabase();

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS ${CRYPTO_TABLE} (
                id TEXT PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                symbol TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS ${FIAT_TABLE} (
                id TEXT PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                symbol TEXT NOT NULL,
                code TEXT NOT NULL
            );
        `);
        // console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}

/**
 * Clears all data from CryptoCurrency and FiatCurrency tables in the SQLite database.
 *
 * @async
 * 
 * @returns {Promise<void>} A Promise that resolves when all data is cleared successfully.
 */
const clearAllData = async () => {
    try {
        const db = await openDatabase();
        await db.withTransactionAsync(async () => {
            await db.execAsync(`DELETE FROM ${CRYPTO_TABLE};`);
            await db.execAsync(`DELETE FROM ${FIAT_TABLE};`);
        });
    } catch (error) {
        console.log('Failed to clear data:', error);
    }
}

/**
 * Inserts or replaces crypto-currency data into the CryptoCurrency table in SQLite database.
 *
 * @async
 * @param {CurrencyInfo[]} data An array of CurrencyList - Crypto objects.
 * @returns {Promise<void>} A Promise that resolves when the data insertion is complete.
 * @description This function iterates through the provided `data` array and inserts or replaces
 * each item into the CryptoCurrency table using an `INSERT OR REPLACE` SQL statement.
 */
const insertCryptoCurrencyData = async (data: CurrencyInfo[]) => {
    try {
        const db = await openDatabase();
        await db.withTransactionAsync(async () => {
            for (const item of data) {
              await db.runAsync(
                `INSERT OR REPLACE INTO ${CRYPTO_TABLE} (id, name, symbol) VALUES (?, ?, ?);`,
                [item.id, item.name, item.symbol]
              );
            }
        });
    } catch (error) {
        console.log('Failed to insert Crypto data:', error);
    }
}

/**
 * Inserts or replaces fiat-currency data into the FiatCurrency table in the SQLite database.
 *
 * @async
 * @param {CurrencyInfo[]} data An array of CurrencyList - Fiat objects.
 * @returns {Promise<void>} A Promise that resolves when the data insertion is complete.
 * @description This function iterates through the provided `data` array and inserts or replaces
 * each item into the FiatCurrency table using an `INSERT OR REPLACE` SQL statement.
 * If the `code` property of an item is undefined or null, it defaults to an empty string.
 */
const insertFiatCurrencyData = async (data: CurrencyInfo[]) => {
    try {
        const db = await openDatabase();
        await db.withTransactionAsync(async () => {
            for (const item of data) {
              await db.runAsync(
                `INSERT OR REPLACE INTO ${FIAT_TABLE} (id, name, symbol, code) VALUES (?, ?, ?, ?);`,
                [item.id, item.name, item.symbol, item.code || ""]
              );
            }
        });
    } catch (error) {
        console.log('Failed to insert Fiat data:', error);
    }
}

/**
 * Retrieves all crypto-currency data from CryptoCurrency table in the SQLite database.
 *
 * @async
 * @returns {Promise<SQLite.ResultSet[]> | undefined} A Promise that resolves with an array of SQLite.ResultSet objects.
 * @description This function queries the CryptoCurrency table for all rows and returns the results.
 */
const getCryptoCurrencyData = async () => {
    try {
        const db = await openDatabase();
        const result = await db.getAllAsync(`SELECT * FROM ${CRYPTO_TABLE};`);
        return result;
    } catch (error) {
        console.log('Failed to get Crypto-Currency data:', error);
    }
}

/**
 * Retrieves all fiat-currency data from FiatCurrency table in the SQLite database.
 *
 * @async
 * @returns {Promise<SQLite.ResultSet[]> | undefined} A Promise that resolves with an array of SQLite.ResultSet objects.
 * @description This function queries the FiatCurrency table for all rows and returns the results.
 */
const getFiatCurrencyData = async () => {
    try {
        const db = await openDatabase();
        const result = await db.getAllAsync(`SELECT * FROM ${FIAT_TABLE};`);
        return result;
    } catch (error) {
        console.log('Failed to get Fiat-Currency data:', error);
    }
}

/**
 * Retrieves all-currency data from CryptoCurrency and FiatCurrency table in the SQLite database.
 * UNION ALL to combine 2 tables result.
 *
 * @async
 * @returns {Promise<SQLite.ResultSet[]> | undefined} A Promise that resolves with an array of SQLite.ResultSet objects.
 */
const getAllCurrencyData = async () => {
    try {
        const db = await openDatabase();
        const result = await db.getAllAsync(
            `SELECT id, name, symbol, '' AS code FROM ${CRYPTO_TABLE}
            UNION ALL
            SELECT id, name, symbol, code FROM ${FIAT_TABLE};
            `
        );
        return result;
    } catch (error) {
        console.log('Failed to get All Currency data:', error);
    }
} 

export {
    initDatabase,
    clearAllData,
    insertCryptoCurrencyData,
    insertFiatCurrencyData,
    getCryptoCurrencyData,
    getFiatCurrencyData,
    getAllCurrencyData,
};