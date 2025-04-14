"use client";
import { fetchQuote, fetchAllQuotes } from "@/api/api";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const QuotesPage = () => {
  // change to props
  const [quote, setQuote] = useState<
    { quote: string; author: string; id: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<Quotes[]>([]);
  const [maxLength, setMaxLength] = useState(250);
  const [minLength, setMinLength] = useState(100);
  const [limit, setLimit] = useState(67);

  useEffect(() => {
    const func = async () => {
      // const quote = await fetchQuote();
      // setQuote(quote);
      setLoading(true);
      const quotes = await fetchAllQuotes(limit, maxLength, minLength);
      setQuotes((prevQuotes) => [...prevQuotes, ...quotes]); // append quotes
    };
    setLoading(false);
    func();
  }, [limit]);

  useEffect(() => {
    const handleScroll = () => {
      setLoading(true);
      const maxScrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScrollHeight - 1000) {
        setLimit((prevLimit) => prevLimit + 50);
      }
    };
    setLoading(false);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // ✅ proper cleanup
    };
  }, []);

  // if (loading)
  //   return (
  //     <Loader size={32} className="w-full mt-8 text-gray-400 animate-spin" />
  //   );
  return (
    <div className="pt-16 mb-32">
      <h1 className="text-6xl text-center opacity-10 font-bold">
        Stay up to Quote :&#41;
      </h1>
      <div className="w-full h-2 rounded-full bg-gray-400 opacity-1 py-4 m-4"></div>
      <div className="flex justify-center items-center w-full h-screen flex-row flex-wrap gap-8 mt-8 px-2">
        {quotes.map((quote, index) => (
          <Link key={`${index}-${quote._id}`} href={`/quote/${quote._id}`}>
            <div
              className="
            md:w-96 w-full min-h-48 h-auto
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
            flex space-between flex-col justify-between
            "
            >
              <div className="flex justify-between w-full">
                <p className="font-light text-base">{quote.content}</p>
              </div>
              <div className="flex justify-between w-full text-gray-300 text-sm">
                <p>{quote.author}</p>
                <div className="flex flex-row gap-5">
                  {quote.tags.map((tag: string) => (
                    <p key={`${quote._id}-${Math.random()}`}>{tag}</p>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
        {loading && (
          <Loader
            size={32}
            className="w-full mt-8 text-gray-400 animate-spin"
          />
        )}
      </div>
    </div>
  );
};

export default QuotesPage;
