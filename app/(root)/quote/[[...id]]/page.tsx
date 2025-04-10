"use client";
import { fetchQuoteById } from "@/api/api";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Hash, QuoteIcon } from "lucide-react";
import { ArrowLeft } from "lucide-react";

const Quote = () => {
  const router = useRouter();
  const params = useParams();
  const [quote, setQuote] = useState<Quote>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const func = async () => {
      const response = await fetchQuoteById(params.id as string);
      setQuote(response);
    };
    func();
  }, []);

  return (
    <section className="h-screen text-white flex justify-center items-center relative">
      {quote && (
        <div className="relative w-full h-full flex justify-center items-center flex-col p-8">
          <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 min-h-36 h-auto rounded-xl p-6 shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-500 ease-in-out">
            <h1 className="text-2xl text-center mb-4 text-[#f2f2f2]">
              <QuoteIcon className="float-left mb-2"/>{quote.content}<QuoteIcon className="float-right mt-2"/>
            </h1>
            <p className="text-lg text-right text-[#a2a6b1] mt-4">
              - {quote.author}
            </p>
          </div>

          <div className="flex flex-col text-gray-300 gap-4 mt-6">
            <div className="flex justify-center gap-4 text-sm text-gray-400">
              {quote.tags.map((tag: string) => (
                <div
                  key={tag}
                  className="flex items-center px-4 py-2 bg-white rounded-full text-xs transition-all duration-300 ease-in-out hover:opacity-70"
                >
                  <Hash className="mr-2" size={16} />
                  {tag}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="text-xl font-semibold text-gray-200 mt-6 hover:underline"
            >
              Extra Information
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => router.back()}
        className="fixed bottom-4 w-full max-w-xs left-1/2 transform -translate-x-1/2 bg-white text-xl font-semibold py-3 px-8 rounded-full shadow-md text-gray-400 hover:shadow-lg transition-all duration-300 ease-in-out ml-2 mr-4"
      >
        <ArrowLeft className="mr-2 inline-block" />
        Cool, Go Back
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-11/12 sm:w-3/4 md:w-1/2 bg-[#1a1f24] text-white p-6 rounded-xl shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4">Information</h2>
            <p>ID: {quote?._id}</p>
            <p>Author: {quote?.authorSlug}</p>
            <p>Characters: {quote?.length} characters</p>
            <p>Date Added: {quote?.dateAdded}</p>
            <p>Date Modified: {quote?.dateModified}</p>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white text-2xl font-bold"
            >
              X
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Quote;
