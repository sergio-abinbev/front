import { ReactNode } from 'react';
import { Header } from "@/components/layout/Header"
import '@/styles/globals.scss';

export const metadata = {
    title: 'Gerenciamento de Funcionários',
    description: 'Sistema para gerenciamento de funcionários da empresa.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}