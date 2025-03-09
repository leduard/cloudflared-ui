import { trace, info, error, } from "tauri-plugin-log-api";

export class Logger {
    static async trace(message: string): Promise<void> {
        await trace(message);
    }

    static async info(message: string): Promise<void> {
        await info(message);
    }

    static async error(message: string): Promise<void> {
       await error(message);
    }
}
