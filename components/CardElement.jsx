import React from 'react'

export const CardElement = ({event}) => {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md">
      <img
        src="sampleEventPhoto.jpg"
        className="aspect-video w-full object-cover"
        alt=""
      />
      <div className="p-4">
        <p className="mb-1 text-sm text-primary-500">
          Andrea Felsted • <time>{event.eventDate}</time>
        </p>
        <h3 className="text-xl font-medium text-gray-900">
          {event.eventName}
        </h3>
        <p className="mt-1 text-gray-500 line-clamp-4">
          {event.eventDescription}
        </p>
        <div className="mt-4 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            Design
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
            Product
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
            Develop
          </span>
        </div>
      </div>
    </div>
  );
}
