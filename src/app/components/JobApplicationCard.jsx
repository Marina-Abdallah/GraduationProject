import React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import api from "../../api/axios";

export function JobApplicationCard({ job, onClick }) {
  return (
    <div
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col h-auto"
      onClick={() => onClick(job)}
    >
      {/* Banner */}
      <div className="relative h-40 w-full shrink-0">
        <ImageWithFallback
          src={job.bannerImage}
          alt={`${job.company} banner`}
          className="w-full h-full object-cover"
        />
        {/* Overlay for banner */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Logo and Company Details overlapping banner */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white bg-white shrink-0">
            <ImageWithFallback
              src={job.logoImage}
              alt={job.company}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-white">
            <h3 className="font-bold text-xl leading-tight drop-shadow-md">{job.company}</h3>
            <p className="text-sm opacity-90 drop-shadow-md">{job.location}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col">
        <h2 className="text-[#13206d] text-xl font-bold mb-2 text-center">{job.title}</h2>
        <p className="text-gray-600 text-center mb-4 line-clamp-2 leading-relaxed text-[14px]">
          A <span className="font-bold text-[#13206d]">{job.type}</span> {job.jobDescription.replace(`A ${job.type} `, "")}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 mb-4 shrink-0"></div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-auto shrink-0">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: job.statusColor }}
            ></div>
            <span className="font-bold text-[#13206d]">{job.status}</span>
          </div>
          <span className="text-gray-500 text-sm">Applied {job.applied}</span>
        </div>
      </div>
    </div>
  );
}
