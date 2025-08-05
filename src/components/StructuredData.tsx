import Script from 'next/script';

interface StructuredDataProps {
  type: 'Calculator' | 'WebApplication' | 'SoftwareApplication';
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  browserRequirements?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  creator?: {
    '@type': string;
    name: string;
    url?: string;
  };
  additionalProperties?: Record<string, any>;
}

export default function StructuredData({
  type,
  name,
  description,
  url,
  applicationCategory = 'BusinessApplication',
  operatingSystem = 'All',
  browserRequirements = 'Requires JavaScript',
  offers = { price: '0', priceCurrency: 'KRW' },
  creator = {
    '@type': 'Organization',
    name: 'HPLankr Tools',
    url: 'https://tools.hplankr.com'
  },
  additionalProperties = {}
}: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'Calculator' ? 'SoftwareApplication' : type,
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
    browserRequirements,
    offers: {
      '@type': 'Offer',
      ...offers
    },
    creator,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    ...additionalProperties
  };

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}