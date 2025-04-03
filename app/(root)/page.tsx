"use client";
import { fetchQuote, fetchAllQuotes } from "@/api/api";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const QuotesPage = () => {
  const [quote, setQuote] = useState<
    { quote: string; author: string; id: number }[]
  >([]);
  const [quotes, setQuotes] = useState<
    { quote: string; author: string; id: number }[]
  >([]);
  useEffect(() => {
    const func = async () => {
      const quote = await fetchQuote();
      setQuote(quote);
      const quotes = await fetchAllQuotes();
      setQuotes(quotes);
      console.log(quotes);
    };
    func();
  }, []);

  return (
    <div className="pt-16 mb-32">
      <h1 className="text-6xl text-center opacity-10 font-bold">
        Stay up to Quote :)
      </h1>
      <div className="flex justify-center items-center w-full h-screen flex-row flex-wrap lg:px-64 md:px-32 sm:px-24 px-16 gap-8 pt-16">
        {quotes.map((quote, index) => (
          <Link key={index} href={`/quote/${quote.id}`}>
            <div
              className="
            w-64 min-h-32 h-auto
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
              <div>
                <p className="font-light text-sm">{quote.quote}</p>
                <p className="text-sm font-semibold absolute bottom-2 right-4">
                  {quote.author}
                </p>
                <p className="font-semibold text-base absolute bottom-2">
                  {quote.id}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuotesPage;
