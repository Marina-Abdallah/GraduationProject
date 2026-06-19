import React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function JobDetailsModal({ job, open, onClose }) {
  if (!job) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '24px',
          overflow: 'hidden',
          maxHeight: '90vh',
        }
      }}
    >
      <div className="relative flex flex-col w-full bg-white overflow-y-auto max-h-[90vh]">
        {/* Banner Section */}
        <div className="relative h-64 w-full shrink-0">
          <ImageWithFallback 
            src={job.bannerImage} 
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Close Button */}
          <IconButton 
            onClick={onClose}
            className="!absolute top-4 right-4 !bg-red-500 !text-white hover:!bg-red-600 transition-colors"
            size="small"
          >
            <CloseIcon />
          </IconButton>

          {/* Logo & Company */}
          <div className="absolute bottom-6 left-6 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white bg-white shrink-0">
              <ImageWithFallback 
                src={job.logoImage} 
                alt={job.company}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white drop-shadow-md">
              <h2 className="text-4xl font-bold">{job.company}</h2>
              <p className="text-xl opacity-90">{job.location}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-[#13206d] text-center mb-2">
            {job.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[#13206d] text-lg font-medium">
            <div><span className="font-bold">Job Title:</span> {job.title}</div>
            <div><span className="font-bold">Location Mode:</span> {job.jobMode}</div>
            <div className="w-full text-center mt-2"><span className="font-bold">City & Office:</span> {job.cityOffice}</div>
          </div>

          {/* Divider */}
          <div className="w-full max-w-2xl mx-auto h-[2px] bg-[#84fba2] my-4"></div>

          <div className="text-[#13206d]">
            <h3 className="text-2xl font-bold mb-3">Job Description:</h3>
            <p className="text-lg leading-relaxed">{job.jobDescription}</p>
          </div>

          <div className="flex flex-col items-center mt-4">
            <h3 className="text-2xl font-bold text-[#13206d] mb-4">Required Skills:</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {(job.jobSkills ?? []).map((skill, index) => (
                <div 
                  key={index}
                  className="bg-[#84fba2] text-[#13206d] px-6 py-2 rounded-xl text-lg font-medium shadow-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
          
          {/* Status info at bottom */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: job.statusColor }}
              ></div>
              <span className="font-bold text-xl text-[#13206d]">{job.status}</span>
            </div>
            <span className="text-gray-500 font-medium text-lg">Applied {job.applied}</span>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
