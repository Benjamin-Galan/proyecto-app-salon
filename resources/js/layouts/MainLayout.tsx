import Footer from "@/pages/home/Footer";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

type MainLayoutProps = {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            {children}
            <Footer />
            <Toaster position="top-right" richColors closeButton />
        </>
    )
}

