import { Calendar, Timer } from 'lucide-react';
import React from 'react'

export const CardElement = ({event}) => {
  return (
    <div className="mx-auto overflow-hidden rounded-lg bg-background shadow-md p-2">
      <img
        src="sampleEventPhoto.jpg"
        className="aspect-video w-full object-cover rounded-md mb-2"
        alt=""
      />
      <div>
        <h3 className="text-[13px] font-semibold text-gray-900">
          {event.eventName}
        </h3>
        <p className="mb-1 text-[11px] text-primary-500 flex items-center mt-1">
          <Calendar className="h-[11px] w-[11px] mr-2" />
          {event.eventDate}
        </p>
        <p className="mb-1 text-[11px] text-primary-500 flex items-center">
          <Timer className="h-[11px] w-[11px] mr-2" />
          {event.eventTime}
        </p>
        <p className="mt-1 text-gray-500 text-[9px] line-clamp-3">
          {event.eventDescription}
        </p>
      </div>
    </div>
  );
}
