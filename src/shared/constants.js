export const CONSTANTS = {
    API: {
        EXCHANGE_RATES: {
            ROOT: `https://api.exchangeratesapi.io`,
            QUOTE: `/latest`
        }
    },
    CURRENCIES: {
        DEFAULT_BASE: 'USD',
        LIST: [
            { code: 'USD', name: 'United States Dollar' },
            { code: 'CAD', name: 'Canadian Dollar' },
            { code: 'CHF', name: 'Swiss Franc' },
            { code: 'GBP', name: 'British Pound' },
            { code: 'IDR', name: 'Indonesian Rupiah' },
            { code: 'INR', name: 'Indian Rupee' },
            { code: 'JPY', name: 'Japanese Yen' },
            { code: 'KRW', name: 'South Korean Won' },
            { code: 'MYR', name: 'Malaysian Ringgit' },
            { code: 'SGD', name: 'Singapore Dollar' }
        ]
    } 
}