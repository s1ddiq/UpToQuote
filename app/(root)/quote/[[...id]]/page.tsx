"use client";
import { fetchQuoteById } from "@/api/api";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Quote = () => {
  const router = useRouter();
  const params = useParams();
  const [quote, setQuote] = useState<{
    quote: string;
    author: string;
    id: string;
  }>();
  useEffect(() => {
    const func = async () => {
      const response = await fetchQuoteById(params.id as string);
      setQuote(response);
    };
    func();
  }, []);
  return (
    <section className="h-screen w-full">
     

      {/* {params.id} */}
      {quote && (
        <div className="relative w-full h-full flex justify-center items-center flex-col">
          <div
            className="  w-128 min-h-36 h-auto
            bg-transparent
            border 
            border-px
            border-[#262629ff]
            rounded-xl p-4
            relative
            hover:-translate-y-2
            cursor-pointer
            transition-discrete
            transition-all
            duration-300
            
            "
          >
            <h1 className="text-2xl font-bold">{quote?.quote}</h1>
          </div>
          <p className="text-lg opacity-60 mt-4 ml-4">- {quote?.author}</p>
        </div>
      )}
       <button
        onClick={() => router.back()}
        className="
            bg-white
            border 
            border-px
            border-[#262629ff]
            rounded-xl p-4 w-11/12 left-1/2 -translate-1/2 text-black text-xl fixed bottom-4 cursor-pointer"
      >
        Cool, go back
      </button>
    </section>
  );
};

export default Quote;
