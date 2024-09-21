"use client";
import React, { useState, useEffect } from "react";
import { MenuIcon, SearchIcon } from "@/app/icons";
import Link from "next/link";
import Image from "next/image";
import { useGetCategoriesQuery } from "../../../../redux/services/categoryService";

function Header({ setOpenSidebar, title }) {
  const { data } = useGetCategoriesQuery();
  const [currentUrl, setCurrentUrl] = useState("");
  // console.log("currentUrl....", currentUrl);
  console.log("title...", title);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href); // Get the full URL
    }
  }, []);

  return (
    <div className="flex flex-col top-0 z-40 min-h-16 shrink-0 items-center bg-white">
      {/* <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setOpenSidebar(true)}
      >
        <span className="sr-only">Open sidebar</span>

        <div className="h-6 w-6">
          <MenuIcon />
        </div>
      </button> */}
      <div className="flex w-full py-4">
        <div className="margins w-full">
          <div className="flex w-full">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src="/images/zeezfaveicon.png"
                  alt="Description of image"
                  width={46}
                  height={46}
                />
              </Link>
              <div className="search-box flex items-center h-9 rounded-lg overflow-hidden bg-[#F5F5F5] border border-[#ebebeb] focus-within:border-[#00856f] anim">
                <div className="search-icon flex items-center justify-center bg-[#00856f] border-2 border-solid border-[#00856f] h-full w-10">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  className="bg-transparent sm:w-96 w-full py-1 px-3 font-semibold"
                  placeholder="search products here..."
                />
              </div>
            </div>
            <div className="flex flex-1 items-center justify-end">
              <div className="hidden md:flex items-center gap-5">
                {data?.data?.map((item, index) => (
                  <Link
                    href={`/${item.slug}`}
                    key={index}
                    className="text-lg font-medium hover:cursor-pointer  hover:text-[#00856f]"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="flex md:hidden items-center justify-center cursor-pointer">
                <MenuIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      {title === undefined || title === null || title === "" ? null : (
        <div className="title-header flex items-center">
          <h1 className="margins w-full capitalize text-2xl font-semibold">
            {title}
          </h1>
        </div>
      )}
    </div>
  );
}

export default Header;
