'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../../sanity.config'; // Ajustar caminho relativo para raiz

export const dynamic = 'force-static';

export default function StudioPage() {
    return <NextStudio config={config} />;
}
