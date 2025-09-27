import { Author } from "@/modules/authors/types/author";
import { Editorial } from "@/modules/editorial/types/editorial";
import { Review } from "@/modules/books/types/review";

export interface Book {
    id: string;
    name: string;
    isbn: string;
    image: string;
    publishingDate: string;
    description: string;
    editorial: Editorial;
    authors: Author[];
    reviews: Review[];
}