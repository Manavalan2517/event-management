

import Image from "next/image";
import Link from "next/link";
import { CardElement } from "@/components/cardElement";
import { events } from "@/data/data";


export default function Dashboard() {
  return (
    <div>
      <div className="w-screen h-[100px] bg-[#4A43EC] flex justify-between p-4 pt-6 rounded-b-3xl z-[-1] relative mb-10">
        <div>
          <Image src="/Menu.svg" alt="menu" width={40} height={40} />
        </div>
        <div>
          <div className="w-[40px] h-[40px] border border-black rounded-full bg-yellow-500"></div>
        </div>
        <div className="z-[0] absolute bottom-[-20px] max-md:left-[32%] text-center bg-white px-4 py-3 shadow-lg rounded-2xl">
          <h1 className="font-semibold">Explore Events</h1>
        </div>
      </div>
      <div className="flex justify-center m-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {events.map((event, index) => (
            <Link href={`/events/${event.eventId}`} key={index}>
              <CardElement event={event} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
