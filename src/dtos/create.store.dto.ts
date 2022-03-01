export interface CreateStoreDto {
    name: string;
    numberOfEmployees: number;
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
}
