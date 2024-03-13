import React from "react";
import { Doc } from "../../convex/_generated/dataModel";
import Image from "next/image";

export default function EventCard({
  _id,
  _creationTime,
  date,
  title,
  userId,
  image,
}: Doc<"events">) {
  return (
    <article className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        <Image
          width={400}
          height={400}
          src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${image}`}
          alt=""
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time className="text-gray-500">{date}</time>
          <a className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            category
          </a>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a>
              <span className="absolute inset-0" />
              {title}
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            description
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img
            src={image}
            alt=""
            className="h-10 w-10 rounded-full bg-gray-100"
          />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <a>
                <span className="absolute inset-0" />
                author name
              </a>
            </p>
            <p className="text-gray-600">role</p>
          </div>
        </div>
      </div>
    </article>
  );
}
