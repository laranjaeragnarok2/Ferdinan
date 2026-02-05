import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic';

export default async function TestSanityPage() {
    try {
        const posts = await client.fetch('*[_type == "post"]');
        return (
            <div className="p-10">
                <h1>Teste Sanity</h1>
                <pre>{JSON.stringify(posts, null, 2)}</pre>
            </div>
        );
    } catch (e: any) {
        return <div className="p-10 text-red-500">Erro: {e.message}</div>;
    }
}
