'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

import { getMarketData, MarketItem } from '@/actions/get-market-data';

export const StockTicker = () => {
    const [items, setItems] = useState<MarketItem[]>([]);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const data = await getMarketData();
                setItems(data);
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
