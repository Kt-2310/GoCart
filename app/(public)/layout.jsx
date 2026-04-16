'use client'

import { SessionProvider } from "next-auth/react"; // ✅ ADD THIS
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {
    return (
        <SessionProvider> {/* ✅ WRAP EVERYTHING */}
            <Banner />
            <Navbar />
            {children}
            <Footer />
        </SessionProvider>
    );
}