import { StarRating } from "@/app/components/ui";
import Link from "next/link";
import Image from "next/image";
import {
  CloudDownloadIcon,
  MacIcon,
  MSWindowIcon,
  PcGameIcon,
} from "@/app/icons";

const ProductCard = ({ key, data, slug }) => {
  // console.log("product card data", data);

  return (
    <div
      key={key}
      className="flex bg-white sm:flex-row flex-col sm:gap-0 gap-3 p-3 border border-solid border-[#ebebeb]"
    >
      <div className="flex items-center flex-1 gap-3">
        <Image
          src={data?.software_image}
          alt="logo of software"
          width={65}
          height={65}
        />
        <div className="flex flex-col">
          <Link
            href={`${data?.category.slug}/${data?.blogkey}`}
            className="text-[#2b373a] cursor-pointer block text-base font-bold 1overflow-hidden 1text-ellipsis 1whitespace-nowrap"
          >
            {data.software_name || "-"} {data.software_version || "-"}
          </Link>
          <p className="text-[#666] text-xs font-medium">
            {/* {data.software_description || "-"} */}
            {data.software_description?.slice(0, 45) +
              (data.software_description?.length > 45 ? "..." : "")}
          </p>
          <Link href={"/"} className="text-[#00856f] text-xs font-bold">
            {data?.subcategory ? data?.subcategory.title : "-"}
          </Link>
        </div>
      </div>
      <div className="flex sm:flex-col flex-row items-center sm:justify-center justify-between sm:px-5 px-0 gap-2 border-l border-solid border-[#ebebeb]">
        <div className="flex items-center justify-start gap-3">
          <div className="flex items-center justify-center h-5 w-5">
            {data?.operating_system === "Windows" ? (
              <MSWindowIcon />
            ) : data?.operating_system === "PC Games" ? (
              <PcGameIcon />
            ) : (
              <MacIcon />
            )}
          </div>
          <span className="text-[#2b373a] text-xs font-semibold capitalize">
            {data?.operating_system || "-"}
          </span>
        </div>
        <div className="flex items-center justify-start gap-1">
          <div className="flex items-center justify-center h-3 w-3">
            <CloudDownloadIcon />
          </div>
          <span className="text-[#666] text-[11px] font-semibold capitalize">
            {data?.review_count || "00"}
          </span>
        </div>
      </div>
      <div className="flex items-center sm:pl-5 pl-0 flex-[0.6] gap-2 border-l border-solid border-[#ebebeb]">
        <div className="flex sm:items-center items-start justify-center flex-1 flex-col gap-2">
          <div className="text-[#2b373a] text-center font-bold text-xs">
            Reputation
          </div>
          <StarRating rating={data?.rating_value} />
        </div>
        <div className="flex flex-1 sm:items-center items-end justify-center flex-col gap-2 pl-5 border-l border-solid border-[#ebebeb] h-full">
          <div className="text-[#2b373a] text-center font-bold text-2xl">
            57.9 <span className="text-base">MB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
