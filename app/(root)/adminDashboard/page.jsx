import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="h-[60px] w-[95%] sm:w-[80%] md:w-[70%] bg-gray-300 bottom-2 fixed rounded-3xl hover:bg-gray-400 transition-all duration-300">
          <Link
            href={`/events/create`}
            aria-label="Go to Edit Event Page"
          >
            <div className="flex justify-center items-center h-full w-full text-2xl font-bold text-white">
              CREATE EVENT
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
