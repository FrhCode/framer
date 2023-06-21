"use client";
import React, { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let URL_SEARCH_PARAMS = new URLSearchParams({
      search: e.target.value,
      dump: Math.random() > 0.5 ? "" : "terjadi",
    })
      .toString()
      .replace(/(?<=&|^)[^=]+=(?:&|$)|(?:&|^)[^=]+=(?=&|$)/g, "");

    const URL = `/13?${URL_SEARCH_PARAMS}`;

    router.push(URL);
  };

  return (
    <div className="relative">
      <input
        ref={searchInputRef}
        type="text"
        className="peer rounded bg-slate-50 py-2 pl-2 pr-9  outline outline-1 outline-slate-300 focus:outline-2"
        placeholder="Cari Barang"
        onChange={handleChange}
      />
      <AiOutlineSearch
        className="absolute right-0 top-2/4 -translate-x-3 -translate-y-2/4 text-slate-300 peer-focus:text-slate-900"
        size={25}
      />
    </div>
  );
}
