export const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-03'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sovereign-local'

export const useCdn = true

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        console.warn(`[SOVEREIGN_BYPASS] ${errorMessage}`);
        return 'bypass' as unknown as T;
    }
    return v
}
