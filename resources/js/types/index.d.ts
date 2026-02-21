import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export type UserRole = "admin" | "cliente";

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    phone: string | null;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Category {
    id: number
    name: string
    created_at: string
    updated_at: string
}

export interface Service {
    id: number
    name: string
    description: string | null
    price: number
    discount: number
    total_price: number
    duration: number
    image: string | null
    active: boolean
    category_id: number
    created_at: string
    updated_at: string
    category?: Category | null
}

export interface PaginatedService {
    current_page: number;
    data: Service[];
    from: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    per_page: number;
    to: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface Package {
    id: number;
    name: string;
    description: string | null;
    subtotal: number;
    discount: number;
    total: number;
    active: boolean;
    created_at: string;
    updated_at: string;
    services: Service[];
}

export interface PaginatedPackage {
    current_page: number;
    data: Package;
    from: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    per_page: number;
    to: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface PromotionType {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}
