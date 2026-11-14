import React from "react";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/db";
import { siteConfig } from "@/config/site";
import HeroShowcase from "@/components/home/HeroShowcase";
import MistExperienceDemo from "@/components/home/MistExperienceDemo";
import ProductSpecs from "@/components/home/ProductSpecs";
import ReviewsSection from "@/components/home/ReviewsSection";
import FaqAccordion from "@/components/home/FaqAccordion";
import NewsletterSection from "@/components/home/NewsletterSection";
import ContactSection from "@/components/home/ContactSection";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };

  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const firstImage = product.images[0]?.startsWith("http")
    ? product.images[0]
    : `${baseUrl}${product.images[0]?.startsWith("/") ? "" : "/"}${product.images[0]}`;

  return {
    title: `${product.title} | ${siteConfig.name}`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: [{ url: firstImage }],
    },
    alternates: {
      canonical: `${baseUrl}/product/${product.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: product.images.map((img) =>
      img.startsWith("http") ? img : `${baseUrl}${img.startsWith("/") ? "" : "/"}${img}`
    ),
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: product.sellingPrice,
      highPrice: product.originalPrice,
      offerCount: product.bundles.length,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <div className="min-h-screen bg-vintage-950 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <HeroShowcase product={product} />
      <MistExperienceDemo />
      <ProductSpecs product={product} />
      <ReviewsSection productId={product.id} />
      <FaqAccordion />
      <NewsletterSection />
      <ContactSection />
    </div>
  );
}
