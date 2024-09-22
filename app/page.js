"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import Layout from "@/app/components/layout";
import { ProductCard } from "@/app/components/ui";
import { OverlayLoading } from "./components/ui";
import { Helmet } from "react-helmet-async";
import HelmetWrapper from "@/app/components/HelmetWrapper";
import {
  useGetBlogsQuery,
  useGetAllCategoriesBlogsQuery,
  useGetBlogsByCategoryQuery,
} from "../redux/services/blogService";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(24);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const { isLoading, data } = useGetBlogsQuery(currentPage);
  const { data: blogGameCategoryData } = useGetBlogsByCategoryQuery("pc-games");

  const [softwareList, setSoftwareList] = useState([]);
  const { isLoading: allCategoriesLoading, data: allCategoriesBlogsData } =
    useGetAllCategoriesBlogsQuery();

  useEffect(() => {
    if (!allCategoriesLoading) {
      setSoftwareList(allCategoriesBlogsData?.data?.data || []);
    }
  }, [allCategoriesLoading, allCategoriesBlogsData]);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "https://gaullacltd.co.uk",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://gaullacltd.co.uk/search?query={search_term_string}",
        },
        "query-input": {
          "@type": "PropertyValueSpecification",
          valueRequired: "http://schema.org/True",
          valueName: "search_term_string",
        },
      },
    },
    ...softwareList.map((software) => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: software.software_name,
      operatingSystem: software.operating_system,
      applicationCategory: software.application_category,
      offers: {
        "@type": "Offer",
        price: software.price.split(" ")[0],
        priceCurrency: software.price.split(" ")[1],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        reviewCount: software.review_count,
        ratingValue: software.rating_value,
      },
    })),
  ];

  return (
    <HelmetWrapper>
      <Helmet>
        <title>gaullacltd - Full Version Software</title>
        <meta
          name="description"
          content={
            "Free Download Windows & MacOS software, Android Apps & Games, E-Learning Videos & E-Books, PC Games, Scripts and much more."
          }
        />
        <link rel="canonical" href={`https://gaullacltd.co.uk`} />
        <meta
          property="og:url"
          content={"https://gaullacltd.co.uk" || "Default OG URL"}
        />
        <meta
          property="og:title"
          content={"gaullacltd - Full Version Software" || "Default OG Title"}
        />
      </Helmet>
      <main className="w-full min-h-[730px]">
        {!allCategoriesLoading && softwareList.length > 0 ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        ) : null}
        <Layout>
          <div className="margins">
            {isLoading ? (
              <OverlayLoading />
            ) : (
              <div className="flex md:flex-row flex-col gap-10 py-5">
                <div className="flex flex-col flex-1 gap-6">
                  {data?.data?.map((item, index) => (
                    <div key={index} className="flex flex-col gap-6">
                      <div className="flex items-center mb-2 bg-white overflow-hidden border border-[#ebebeb] min-h-[66px] w-full relative">
                        <div className="h-full w-[6px] bg-[#00856f] absolute top-0 left-0 bottom-0"></div>
                        <div className="flex items-center justify-between w-full px-7">
                          <h4 className="text-[#2b373a] text-xl font-bold">
                            {item.title || "-"}
                          </h4>
                          <Link
                            href={`/${item.slug}`}
                            className="btn-transparent anim"
         
