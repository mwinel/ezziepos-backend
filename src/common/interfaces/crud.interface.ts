export interface CRUD {
    create: (resource: any) => Promise<any>;
    getAll: (limit: number, page: number) => Promise<any>;
    getById: (id: string) => Promise<any>;
    patchById: (id: string, resource: any) => Promise<any>;
    deleteById: (id: string) => Promise<any>;
}
