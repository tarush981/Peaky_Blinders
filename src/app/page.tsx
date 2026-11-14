import React from "react";
import { getProducts } from "@/lib/db";
import HeroShowcase from "@/components/home/HeroShowcase";
import MistExperienceDemo from "@/components/home/MistExperienceDemo";
import ProductSpecs from "@/components/home/ProductSpecs";
import ReviewsSection from "@/components/home/ReviewsSection";
import FaqAccordion from "@/components/home/FaqAccordion";
import NewsletterSection from "@/components/home/NewsletterSection";
import ContactSection from "@/components/home/ContactSection";
import { siteConfig } from "@/config/site";

export default async function HomePage() {
  const products = await getProducts();
  const heroProduct = products[0];

  // Product JSON-LD Schema
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: heroProduct.title,
    image: heroProduct.images,
    description: heroProduct.description,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: heroProduct.sellingPrice,
      highPrice: heroProduct.originalPrice,
      offerCount: heroProduct.bundles.length,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: heroProduct.rating,
      reviewCount: heroProduct.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="flex flex-col">
        {/* 1. Hero Showcase with Gallery & Bundle Offers */}
        <HeroShowcase product={heroProduct} />

        {/* 2. Ultrasonic Mist Mechanical Demonstration */}
        <MistExperienceDemo />

        {/* 3. Detailed Specifications & Packaging Breakdown */}
        <ProductSpecs product={heroProduct} />

        {/* 4. Customer Review Section */}
        <ReviewsSection productId={heroProduct.id} />

        {/* 5. Frequently Asked Questions */}
        <FaqAccordion />

        {/* 6. Newsletter Syndicate Signup */}
        <NewsletterSection />

        {/* 7. Direct Contact Concierge Form */}
        <ContactSection />
      </div>
    </>
  );
}
