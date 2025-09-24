import { Organization } from "@/modules/organization/types/organization";

export interface Prize {
    premiationDate: string;
    name: string;
    description: string;
    organization: Organization;
}