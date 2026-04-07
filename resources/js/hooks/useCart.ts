import { useMemo, useReducer } from "react";
import type { Package, Promotion, Service, ProductType, AppointmentRequestPayload } from "@/types";
type ProductItem = Service | Promotion | Package;

export interface BookingCartItem {
    key: string;
    itemId: number;
    type: ProductType;
    name: string;
    description: string | null;
    unitPrice: number;
    originalUnitPrice: number;
    unitDiscount: number;
    durationMin: number;
    quantity: number;
}

export interface BookingDraft {
    items: BookingCartItem[];
    date: string | null;
    time: string | null;
    notes: string;
}

interface BookingState {
    draft: BookingDraft;
}

export interface BookingTotals {
    lineItems: number;
    itemsCount: number;
    subtotal: number;
    discount: number;
    total: number;
    durationMin: number;
}

type BookingAction =
    | { type: "ADD_ITEM"; payload: BookingCartItem }
    | { type: "REMOVE_ITEM"; payload: { key: string } }
    | { type: "SET_QUANTITY"; payload: { key: string; quantity: number } }
    | { type: "SET_DATE"; payload: string | null }
    | { type: "SET_TIME"; payload: string | null }
    | { type: "SET_NOTES"; payload: string }
    | { type: "CLEAR_ITEMS" }
    | { type: "RESET_DRAFT" };

const initialState: BookingState = {
    draft: {
        items: [],
        date: null,
        time: null,
        notes: "",
    },
};

const toNumber = (value: unknown): number => {
    const parsed = Number.parseFloat(String(value ?? 0));
    return Number.isFinite(parsed) ? parsed : 0;
};

const getDuration = (item: ProductItem, type: ProductType): number => {
    if (type === "service") {
        return toNumber((item as Service).duration);
    }

    if ("duration" in item && toNumber(item.duration) > 0) {
        return toNumber(item.duration);
    }

    if ("services" in item) {
        return item.services.reduce(
            (total, service) => total + toNumber(service.duration),
            0,
        );
    }

    return 0;
};

const mapToCartItem = (
    item: ProductItem,
    type: ProductType,
): BookingCartItem => {
    const id = Number(item.id);
    const key = `${type}-${id}`;

    if (type === "service") {
        const service = item as Service;
        const originalUnitPrice = toNumber(service.price);
        const unitDiscount = toNumber(service.discount);
        const unitPrice = Math.max(originalUnitPrice - unitDiscount, 0);

        return {
            key,
            itemId: id,
            type,
            name: service.name,
            description: service.description,
            unitPrice,
            originalUnitPrice,
            unitDiscount,
            durationMin: getDuration(service, type),
            quantity: 1,
        };
    }

    const originalUnitPrice = toNumber(
        "subtotal" in item ? item.subtotal : 0,
    );
    const unitPrice = toNumber("total" in item ? item.total : 0);
    const unitDiscount = Math.max(originalUnitPrice - unitPrice, 0);

    return {
        key,
        itemId: id,
        type,
        name: item.name,
        description: item.description,
        unitPrice,
        originalUnitPrice,
        unitDiscount,
        durationMin: getDuration(item, type),
        quantity: 1,
    };
};

const bookingReducer = (
    state: BookingState,
    action: BookingAction,
): BookingState => {
    switch (action.type) {
        case "ADD_ITEM": {
            const existingIndex = state.draft.items.findIndex(
                (item) => item.key === action.payload.key,
            );

            if (existingIndex >= 0) {
                const nextItems = [...state.draft.items];
                nextItems[existingIndex] = {
                    ...nextItems[existingIndex],
                    quantity: nextItems[existingIndex].quantity + 1,
                };
                return { ...state, draft: { ...state.draft, items: nextItems } };
            }

            return {
                ...state,
                draft: {
                    ...state.draft,
                    items: [...state.draft.items, action.payload],
                },
            };
        }
        case "REMOVE_ITEM":
            return {
                ...state,
                draft: {
                    ...state.draft,
                    items: state.draft.items.filter(
                        (item) => item.key !== action.payload.key,
                    ),
                },
            };
        case "SET_QUANTITY":
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    draft: {
                        ...state.draft,
                        items: state.draft.items.filter(
                            (item) => item.key !== action.payload.key,
                        ),
                    },
                };
            }

            return {
                ...state,
                draft: {
                    ...state.draft,
                    items: state.draft.items.map((item) =>
                        item.key === action.payload.key
                            ? { ...item, quantity: action.payload.quantity }
                            : item,
                    ),
                },
            };
        case "SET_DATE":
            return {
                ...state,
                draft: { ...state.draft, date: action.payload },
            };
        case "SET_TIME":
            return {
                ...state,
                draft: { ...state.draft, time: action.payload },
            };
        case "SET_NOTES":
            return {
                ...state,
                draft: { ...state.draft, notes: action.payload },
            };
        case "CLEAR_ITEMS":
            return {
                ...state,
                draft: { ...state.draft, items: [] },
            };
        case "RESET_DRAFT":
            return initialState;
        default:
            return state;
    }
};

const calculateTotals = (items: BookingCartItem[]): BookingTotals => {
    return items.reduce<BookingTotals>(
        (acc, item) => {
            const quantity = Math.max(item.quantity, 0);
            acc.lineItems += 1;
            acc.itemsCount += quantity;
            acc.subtotal += item.originalUnitPrice * quantity;
            acc.discount += item.unitDiscount * quantity;
            acc.total += item.unitPrice * quantity;
            acc.durationMin += item.durationMin * quantity;
            return acc;
        },
        {
            lineItems: 0,
            itemsCount: 0,
            subtotal: 0,
            discount: 0,
            total: 0,
            durationMin: 0,
        },
    );
};

export const useCart = () => {
    const [state, dispatch] = useReducer(bookingReducer, initialState);

    const totals = useMemo(
        () => calculateTotals(state.draft.items),
        [state.draft.items],
    );

    const addItem = (item: ProductItem, type: ProductType) => {
        dispatch({
            type: "ADD_ITEM",
            payload: mapToCartItem(item, type),
        });
    };

    const removeItem = (key: string) => {
        dispatch({ type: "REMOVE_ITEM", payload: { key } });
    };

    const setQuantity = (key: string, quantity: number) => {
        dispatch({ type: "SET_QUANTITY", payload: { key, quantity } });
    };

    const setDate = (date: string | null) => {
        dispatch({ type: "SET_DATE", payload: date });
    };

    const setTime = (time: string | null) => {
        dispatch({ type: "SET_TIME", payload: time });
    };

    const setNotes = (notes: string) => {
        dispatch({ type: "SET_NOTES", payload: notes });
    };

    const clearItems = () => {
        dispatch({ type: "CLEAR_ITEMS" });
    };

    const clearDraft = () => {
        dispatch({ type: "RESET_DRAFT" });
    };

    const buildAppointmentPayload = (): AppointmentRequestPayload | null => {
        if (!state.draft.date || !state.draft.time) {
            return null;
        }

        return {
            date: state.draft.date,
            time: state.draft.time,
            notes: state.draft.notes.trim() || null,
            totals: {
                lineItems: totals.lineItems,
                itemsCount: totals.itemsCount,
                subtotal: totals.subtotal,
                discount: totals.discount,
                total: totals.total,
                durationMin: totals.durationMin,
            },
            items: state.draft.items.map((item) => ({
                item_id: item.itemId,
                item_type: item.type,
                quantity: item.quantity,
                unit_price: item.unitPrice,
                original_unit_price: item.originalUnitPrice,
                unit_discount: item.unitDiscount,
                duration_min: item.durationMin,
            })),
        };
    };

    return {
        draft: state.draft,
        totals,
        canContinueToConfirmation:
            state.draft.items.length > 0 && !!state.draft.date && !!state.draft.time,
        addItem,
        removeItem,
        setQuantity,
        setDate,
        setTime,
        setNotes,
        clearItems,
        clearDraft,
        buildAppointmentPayload,
    };
};
