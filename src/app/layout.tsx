import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import {cn} from "@/lib/utils"

const fontSans = Inter({subsets: ["latin"], variable: "--font-sans",})

export const metadata: Metadata = {
    title: "Vivis Tidlösa",
    description: "Kreationer, buketter och installationer med torkade blommor",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        {children}
        </body>
        </html>
    )
}
