import axios from "axios";
import { createContext, useEffect, useState, ReactNode, SetStateAction } from "react";

interface OrderParams {
    id: number;
    company: string;
    type: string;
    quantity: number;
    price: number;
    dateOrder: string;
}

interface OrdersProviderProps {
    children: ReactNode;
}

interface OrdersContextData {
    orders: OrderParams[];
    createOrder: (order: OrderInput) => Promise<void>;
}

type OrderInput = Omit<OrderParams, 'id'>;
export const OrdersContext = createContext<OrdersContextData>({} as OrdersContextData);

export function OrdersProvider({ children }: OrdersProviderProps) {
    const [orders, setOrders] = useState<OrderParams[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3333/orders')
            .then((response: { data: SetStateAction<OrderParams[]>; }) => {
                setOrders(response.data);
            });
    }, []);

    async function createOrder(orderInput: OrderInput) {
        await axios.post('http://localhost:3333/orders', orderInput)
    }
    return (
        <OrdersContext.Provider value={{ orders, createOrder }}>
            {children}
        </OrdersContext.Provider>
    );
}