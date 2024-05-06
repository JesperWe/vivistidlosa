import type {Metadata} from "next"
import {Crimson_Pro} from "next/font/google"
import "./globals.css"
import {cn} from "@/lib/utils"

const fontSans = Crimson_Pro({subsets: ["latin"], variable: "--font-sans",})

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
