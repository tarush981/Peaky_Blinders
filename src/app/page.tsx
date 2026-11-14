import React from "react";
import { getProducts } from "@/lib/db";
import { initialFaqs } from "@/data/mockData";
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
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  // Product JSON-LD Schema
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: heroProduct.title,
    image: heroProduct.images.map((img) =>
      img.startsWith("http") ? img : `${baseUrl}${img.startsWith("/") ? "" : "/"}${img}`
    ),
    description: heroProduct.description,
    sku: heroProduct.sku,
    mpn: heroProduct.id,
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
      bestRating: 5,
      worstRating: 1,
    },
  };

  // FAQ Schema for Google Rich Search Results
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: initialFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Breadcrumb Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: heroProduct.title,
        item: `${baseUrl}/product/${heroProduct.slug}`,
      },
    ],
  };

  // WebSite Schema with SearchAction
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
