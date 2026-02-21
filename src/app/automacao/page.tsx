import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import { MainContent } from './MainContent';

export default function AutomacaoPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow pt-20">
                <FadeInOnScroll>
                    <MainContent />
                </FadeInOnScroll>
            </main>
            <Footer />
        </div>
    );
}
