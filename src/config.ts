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
    var request = new XMLHttpRequest();
    request.open('GET', '/appconfig.json', true);
    request.send();

    return new Promise((resolve, reject) => {
        request.onload = (evt:ProgressEvent) => resolve(JSON.parse(request.responseText));
        request.onerror = (evt: ProgressEvent) => reject(
            `Could not load application configuration data (server returned ${request.status}):\n`
            + request.responseText
        );
    });

}
