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
  // console.log("all blogs list data...", data?.data);

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
      url: "https://sgetintopc.com",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://sgetintopc.comsearch?query={search_term_string}",
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
        <title>SGetInToPC - Full Version Software</title>
        <meta
          name="description"
          content={
            "Free Download Windows & MacOS software, Android Apps & Games, E-Learning Videos & E-Books, PC Games, Scripts and much more."
          }
        />
        <link rel="canonical" href={`https://sgetintopc.com`} />
        {/* <meta
          property="og:image"
          content={data?.data?.software_image || "Default OG Image URL"}
        /> */}
        <meta
          property="og:url"
          content={"https://sgetintopc.com" || "Default OG URL"}
        />
        <meta
          property="og:title"
          content={"SGetInToPC - Full Version Software" || "Default OG Title"}
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
                          >
                            View All
                          </Link>
                        </div>
                      </div>
                      {item.blogs?.data?.length ? (
                        <>
                          {item.blogs?.data?.map((meta, idx) => (
                            <ProductCard key={idx} data={meta} slug={""} />
                          ))}
                        </>
                      ) : (
                        <div className="">Data No Found!</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col md:w-[350px] w-full overflow-hidden">
                  <div className="flex flex-col gap-4 sticky bg-white  border border-[#ebebeb] p-6 rounded">
                    <div className="border-b border-solid mb-4 pb-6">
                      <h3 className="text-xl font-bold">
                        {blogGameCategoryData?.category?.title || ""}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-4">
                      {blogGameCategoryData?.data?.data.length ? (
                        <>
                          {blogGameCategoryData?.data?.data.map(
                            (item, index) => (
                              <div key={index} className="flex w-full gap-3">
                                <Image
                                  src={item?.software_image}
                                  alt="logo of software"
                                  width={65}
                                  height={65}
                                />
                                <div className="flex flex-col">
                                  <Link
                                    href={`${item?.category.slug}/${item?.blogkey}`}
                                    className="text-[#2b373a] cursor-pointer block text-sm font-bold 1overflow-hidden 1text-ellipsis 1whitespace-nowrap"
                                  >
                                    {item.software_name || "-"}
                                  </Link>
                                  <Link
                                    href={`/${blogGameCategoryData?.category?.slug}`}
                                    className="text-[#00856f] text-xs font-bold mb-[2px]"
                                  >
                                    {blogGameCategoryData?.category?.title ||
                                      "-"}
                                  </Link>
                                  <div className="text-[#2b373a] text-start font-bold text-xl">
                                    20{" "}
                                    <span className="text-xs uppercase text-start">
                                      GB
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </>
                      ) : (
                        <p className="text-sm">Data not found!</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Layout>
      </main>
    </HelmetWrapper>
  );
}
