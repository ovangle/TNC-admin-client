export interface AppConfig {
    debug?: boolean;
    router: {
        appBaseHref: string;
        locationStrategy: string;
    },
    api: {
        serverHref: string,
        searchPageSize: number
    },
    google: {
        apiKey: string,
    }
}

export function loadAppConfig(): Promise<AppConfig> {
    return Promise.resolve(process.env.APPCONFIG);
}
