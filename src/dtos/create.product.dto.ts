export interface CreateProductDto {
    title: string;
    description?: string;
    handle?: string;
    productType: string;
    isActive: boolean;
    images?: any;
    options?: any;
    variants?: any;
    createdBy: any;
    updatedBy?: any;
}
