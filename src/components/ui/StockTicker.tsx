'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MarketItem {
    symbol: string;
    name?: string;
    price: string;
    change: number; // percentage
}

export const StockTicker = () => {
    const [items, setItems] = useState<MarketItem[]>([]);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                // Fetch Currencies (Real Data)
                const res = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL');
                const data = await res.json();

                const currencies: MarketItem[] = [
                    {
                        symbol: 'USD',
                        price: `R$ ${parseFloat(data.USDBRL.bid).toFixed(2)}`,
                        change: parseFloat(data.USDBRL.pctChange),
                    },
                    {
                        symbol: 'EUR',
                        price: `R$ ${parseFloat(data.EURBRL.bid).toFixed(2)}`,
                        change: parseFloat(data.EURBRL.pctChange),
                    },
                    {
                        symbol: 'BTC',
                        price: `R$ ${(parseFloat(data.BTCBRL.bid) / 1000).toFixed(1)}k`,
                        change: parseFloat(data.BTCBRL.pctChange),
                    },
                ];

                // Simulated Stock Data (Since we don't have a free real-time stock API key)
                const stocks: MarketItem[] = [
                    { symbol: 'IBOVESPA', price: '131.200', change: 0.45 },
                    { symbol: 'PETR4', price: 'R$ 38,50', change: -1.2 },
                    { symbol: 'VALE3', price: 'R$ 68,90', change: 0.8 },
                    { symbol: 'ITUB4', price: 'R$ 33,20', change: 0.15 },
                    { symbol: 'WEGE3', price: 'R$ 28,10', change: 1.5 },
                ];

                setItems([...currencies, ...stocks]);
            } catch (e) {
                console.error('Failed to fetch ticker data', e);
            }
        };

        fetchMarketData();
        const interval = setInterval(fetchMarketData, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-slate-950 text-white text-xs py-2 overflow-hidden border-b border-white/10 relative z-50">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
                {[...items, ...items].map((item, i) => ( // Duplicate for seamless loop
                    <div key={i} className="flex items-center gap-2">
                        <span className="font-bold text-slate-400">{item.symbol}</span>
                        <span className="font-mono">{item.price}</span>
                        <span className={cn(
                            "flex items-center",
                            item.change > 0 ? "text-emerald-400" : item.change < 0 ? "text-rose-400" : "text-slate-400"
                        )}>
                            {item.change > 0 ? <TrendingUp size={12} className="mr-0.5" /> :
                                item.change < 0 ? <TrendingDown size={12} className="mr-0.5" /> :
                                    <Minus size={12} className="mr-0.5" />}
                            {Math.abs(item.change)}%
                        </span>
                    </div>
                ))}
            </div>
            <style jsx>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        div:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
};
