export interface Product {
    id: string;
    name:string;
    category:string;
    price: number;
    salePrice?:number;
    description: string;
    images: string[];
    features:string[];
    dimensions: {
        width:number;
        heigh:number;
        depth:number;
    };
    colors: string[];
    materials: string[];
    inStock: boolean;
    rating: number;
    reviews: number;
    isNew?: boolean;
    isBestseller?: boolean;
}
export interface CartItem {
    product: Product;
    quantity: number; 
    color: string;
}