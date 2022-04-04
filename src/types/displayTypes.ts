export enum DisplayMode {
    Normal,
    Type,
    Name,
}

export type displayConfig = {
    mode: DisplayMode.Normal,
    size: number
} | {
    mode: DisplayMode.Name,
    query: string,
    size: number,
} | {
    mode: DisplayMode.Type,
    typeName: string;
    size: number
}

export enum RequestStatus {
    empty = 'empty', 
    pending = 'pending',
    fulfilled = 'fulfilled',
    rejected = 'rejected'
}
