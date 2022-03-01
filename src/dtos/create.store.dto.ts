export interface CreateStoreDto {
    name: string;
    numberOfEmployees: number;
    customerEmail: string;
    customerPhone: string;
    addressOne: string;
    addressTwo?: string;
    city: string;
    country: string;
    countryCode: string;
    storeIndustry: string;
    storeType: string;
    storeCurrency: string;
    storeDomain: string;
    storeOwner: any;
    isActive: boolean;
    latitude?: number;
    longitude?: number;
    source?: string;
    timezone?: string;
    weightUnit?: string;
}
