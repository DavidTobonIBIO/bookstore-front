import { Editorial } from "@/modules/editorial/types/editorial";

export interface Book {
    id: string;
    name: string;
    isbn: string;
    image: string;
    publishingDate: string;
    description: string;
    editorial: Editorial;
}