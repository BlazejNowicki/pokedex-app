export enum DisplayMode {
    Normal,
    Type,
    Name,
}

export type displayConfig = {
    mode: DisplayMode.Normal
} | {
    mode: DisplayMode.Name,
    query: string,
} | {
    mode: DisplayMode.Type,
    typeName: string;
}

export enum RequestStatus {
    pending = 'pending',
    fulfilled = 'fulfilled',
    rejected = 'rejected'
}
