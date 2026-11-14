import React from "react";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/db";
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

  return {
    title: `${product.title} | PeakyBlinders-Tommyshelby`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: [{ url: product.images[0] }],
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

  return (
    <div className="min-h-screen bg-vintage-950 text-zinc-100">
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
