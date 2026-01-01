import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog - Ferdinan MSP',
    description: 'Insights sobre Growth, AI e Automação',
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
