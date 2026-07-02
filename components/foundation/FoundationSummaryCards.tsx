import Card from '@/components/common/Card';

export interface FoundationSummaryCardsProps {
  activeCurrencies: number;
  activeBanks: number;
  paymentProviders: number;
  treatyCountries?: number;
}

export default function FoundationSummaryCards({
  activeCurrencies,
  activeBanks,
  paymentProviders,
  treatyCountries = 0,
}: FoundationSummaryCardsProps) {
  const cards = [
    {
      label: 'Active Currencies',
      value: activeCurrencies,
      iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Active Banks',
      value: activeBanks,
      iconPath: 'M11 21h-7v-2h7v2zm6.56-7.26L10 5.44 2.44 13.74h2.56v7h10v-7h2.56zM9 13h2v7h-2v-7z',
      color: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      label: 'Payment Providers',
      value: paymentProviders,
      iconPath: 'M20 8H4V6h16m1-2H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H3V6h18v12zm-5.04-6.71l-2.75 3.54-2.16-2.66c-.23-.29-.62-.29-.85 0l-2.96 3.83c-.3.38-.03.97.39.97h14.31c.41 0 .69-.54.39-.97L15.04 6.3c-.23-.29-.62-.29-.85 0z',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Treaty Countries',
      value: treatyCountries,
      iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
      color: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className={`${card.color} text-center`}>
          <svg
            className={`w-8 h-8 mx-auto mb-2 ${card.iconColor}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d={card.iconPath} />
          </svg>
          <div className="text-3xl font-bold text-slate-900 mb-1">{card.value}</div>
          <div className="text-sm text-slate-600">{card.label}</div>
        </Card>
      ))}
    </div>
  );
}
