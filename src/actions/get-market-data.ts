'use server';

export interface MarketItem {
  symbol: string;
  name?: string;
  price: string;
  change: number; // percentage
}

export async function getMarketData(): Promise<MarketItem[]> {
  try {
    // Fetch Currencies (Real Data)
    const res = await fetch(
      'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL',
      { next: { revalidate: 60 } } // Cache for 60 seconds
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch market data: ${res.status}`);
    }

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

    // Simulated Stock Data
    const stocks: MarketItem[] = [
      { symbol: 'IBOVESPA', price: '131.200', change: 0.45 },
      { symbol: 'PETR4', price: 'R$ 38,50', change: -1.2 },
      { symbol: 'VALE3', price: 'R$ 68,90', change: 0.8 },
      { symbol: 'ITUB4', price: 'R$ 33,20', change: 0.15 },
      { symbol: 'WEGE3', price: 'R$ 28,10', change: 1.5 },
    ];

    return [...currencies, ...stocks];
  } catch (error) {
    console.error('SERVER ACTION ERROR: Failed to fetch market data', error);
    // Return fallback data in case of error to prevent UI crash
    return [
      { symbol: 'USD', price: 'R$ 0,00', change: 0 },
      { symbol: 'EUR', price: 'R$ 0,00', change: 0 },
      { symbol: 'BTC', price: 'R$ 0,0k', change: 0 },
    ];
  }
}
