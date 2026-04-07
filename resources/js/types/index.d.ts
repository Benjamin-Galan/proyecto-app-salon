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

interface ServicePivot {
    service_id: number;
    service_price: string;
    service_discount: string;
    created_at: string;
    updated_at: string;
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
    pivot?: ServicePivot | null
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
    image?: string | null;
    duration: number
}

export interface PaginatedPackage {
    current_page: number;
    data: Package[];
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

export interface Promotion {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    duration: number;
    subtotal: number;
    discount: number;
    total: number;
    active: boolean;
    main: boolean;
    expire_date: string;
    services: Service[];
    promotion_type_id: number;
    created_at: string;
    updated_at: string;
    promotion_type?: string;
}

export interface PaginatedPromotion {
    current_page: number;
    data: Promotion[];
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

export interface PromotionFormService {
    service_id: number;
    service_price?: number | string;
    service_discount?: number | string;
    [key: string]: any;
}

export interface PromotionFormData {
    name: string;
    description: string;
    image: File | null;
    duration: string;
    subtotal: string;
    discount: string;
    total: string;
    promotion_type: string | "";
    expire_date?: string;
    services: PromotionFormService[];
    [key: string]: any;
}

export interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    position: string | null;
    available?: boolean;
    created_at: string;
    updated_at: string;
}

export interface Appointment {
    id: number;
    date: string;
    time: string;
    duration: number;
    subtotal: number;
    discount: number;
    total: number;
    code: string;
    notes: string | null;
    active: boolean;
    status: string;
    user_id: number;
    employee_id: number | null;
    created_at: string;
    updated_at: string;
    items: AppointmentItem[];
    user: User;
    employee: Employee | null;
}

export interface AdminDashboardOverview {
    revenueToday: number;
    revenueMonth: number;
    newClientsMonth: number;
    attendedClientsMonth: number;
    completedAppointmentsMonth: number;
    averageTicketMonth: number;
    appointmentsToday: number;
    upcomingAppointments: number;
    totalClients: number;
    totalAppointments: number;
    completionRate: number;
}

export interface AdminDashboardMonthlyPoint {
    month: string;
    label: string;
    labelLong: string;
    revenue: number;
    newClients: number;
    attendedClients: number;
    completedAppointments: number;
}

export interface AdminDashboardStatusPoint {
    status: string;
    count: number;
}

export interface AdminDashboardAppointmentItem {
    id: number;
    date: string;
    time: string;
    total: number;
    status: string;
    user?: Pick<User, "id" | "name"> | null;
    employee?: Pick<Employee, "id" | "name"> | null;
}

export interface AdminDashboardStats {
    overview: AdminDashboardOverview;
    monthly: AdminDashboardMonthlyPoint[];
    statusBreakdown: AdminDashboardStatusPoint[];
    recentCompletedAppointments: AdminDashboardAppointmentItem[];
    upcomingAppointments: AdminDashboardAppointmentItem[];
}

export interface AdminReportsOverview {
    totalAppointments: number;
    activeAppointments: number;
    completedAppointments: number;
    cancelledAppointments: number;
    confirmedAppointments: number;
    pendingAppointments: number;
    uniqueClients: number;
    totalRevenue: number;
    averageTicket: number;
    completionRate: number;
}

export interface AdminReportsDailyPoint {
    date: string;
    label: string;
    appointments: number;
    completedAppointments: number;
    revenue: number;
}

export interface AdminReportsTypePoint {
    type: string;
    label: string;
    count: number;
    revenue: number;
}

export interface AdminReportsTopItem {
    name: string;
    type: string;
    typeLabel: string;
    count: number;
    revenue: number;
}

export interface AdminReportsTopClient {
    id: number | null;
    name: string;
    appointments: number;
    totalSpent: number;
    lastAppointmentDate: string | null;
}

export interface AdminReportsFilters {
    startDate: string;
    endDate: string;
    days: number;
}

export interface AdminReportsStats {
    filters: AdminReportsFilters;
    overview: AdminReportsOverview;
    dailySeries: AdminReportsDailyPoint[];
    statusBreakdown: AdminDashboardStatusPoint[];
    appointmentTypeBreakdown: AdminReportsTypePoint[];
    topItems: AdminReportsTopItem[];
    topClients: AdminReportsTopClient[];
    appointments: AdminDashboardAppointmentItem[];
}

export interface AppNotification {
    id: string;
    type: string;
    title: string;
    message: string | null;
    appointment_id: number | null;
    read_at: string | null;
    created_at: string | null;
}

export interface PaginatedNotification {
    current_page: number;
    data: AppNotification[];
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

export interface PaginatedAppointment {
    current_page: number;
    data: Appointment[];
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

export type ProductType = "service" | "promotion" | "package";
export type AppointmentItemType = ProductType;

interface AppointmentItemBase {
    id: number;
    appointment_id: number;
    item_type: AppointmentItemType;
    item_id: number;
    quantity: number;
    unit_price: number;
    unit_discount: number;
    duration_min: number;
    created_at: string;
    updated_at: string;
}

export interface AppointmentServiceItem extends AppointmentItemBase {
    item_type: "service";
    item: Service;
}

export interface AppointmentPromotionItem extends AppointmentItemBase {
    item_type: "promotion";
    item: Promotion;
}

export interface AppointmentPackageItem extends AppointmentItemBase {
    item_type: "package";
    item: Package;
}

export type AppointmentItem =
    | AppointmentServiceItem
    | AppointmentPromotionItem
    | AppointmentPackageItem;

export type ClientScreen = "products" | "cart" | "datetime" | "summary" | "status" | "appointments" | "list" | "details" | "edit";

export type Flash = {
    success?: string
    error?: string
    warning?: string
}


export type AppointmentRequestPayload = {
    date: string;
    time: string;
    notes?: string | null;
    totals: {
        lineItems: number;
        itemsCount: number;
        subtotal: number;
        discount: number;
        total: number;
        durationMin: number;
    };
    items: {
        item_id: number;
        item_type: ProductType;
        quantity: number;
        unit_price: number;
        original_unit_price: number;
        unit_discount: number;
        duration_min: number;
    }[];
}
