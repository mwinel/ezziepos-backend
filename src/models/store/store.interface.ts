export interface StoreDoc {
    name: string; // The stores normalized and formatted name.
    numberOfEmployees: number; // The number of employees at the store e.g. 10.
    addressOne: string; // The first line of the store's street address e.g. 123 Main St.
    addressTwo?: string; // The second line of the store's street address e.g. Suite 100.
    city: string; // The store's city e.g. Kampala.
    country: string; // The store's country e.g. Uganda.
    countryCode: string; // The store's country code e.g. UG.
    storeIndustry: string; // The store's industry e.g. ICT, Agriculture, Health etc.
    storeType: string; // The store's type e.g. Retail, Department, Wholesale, Supermarket, Discount, Grocery etc.
    storeCurrency: string; // The stores default (three-letter code (ISO 4217 format)) currency e.g. UGX.
    storeDomain: string; // The stores domain e.g. ak.com.
    storeOwner: any; // The user that owns the store.
    isActive: boolean; // The stores status, whether the store is active or not.
}
