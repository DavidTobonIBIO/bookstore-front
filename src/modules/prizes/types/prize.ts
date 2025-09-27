import { Organization } from "@/modules/organization/types/organization";

export interface Prize {
    id: string;
    premiationDate: string;
    name: string;
    description: string;
    organization: Organization;
}