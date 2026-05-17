import React, { useRef } from "react";
import { useCommunity } from "./CommunityContext";
import { useAppContext } from "./AppContext";
import defaultPhoto from "../../assets/defaultImg.png";

export function FunctionalWritePost() {
  const {
    newPostContent,
    setNewPostContent,
    newPostMedia,
    setNewPostMedia,
    newPostMediaUrl,
    onSubmitPost,
    onCloseWritePost,
  } = useCommunity();

  const { profile } = useAppContext();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setNewPostMedia(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCloseWritePost();
      }}
    >
      <div className="bg-white rounded-[24px] shadow-[0px_8px_4px_rgba(132,251,162,0.5)] w-full max-w-[680px] mx-4 flex flex-col gap-[14px] p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] pt-[24px] pb-0">
          <div className="flex-1" />
          <p
            className="font-['Inter:Bold',sans-serif] font-bold text-[#13206d] text-[32px] flex-1 text-center"
            style={{ lineHeight: "normal" }}
          >
            Create Post
          </p>
          <div className="flex-1 flex justify-end">
            <button
              onClick={onCloseWritePost}
              className="relative shrink-0 size-[32px] cursor-pointer hover:opacity-70 transition-opacity"
              title="Close"
            >
              {/* Close rectangle icon */}
              <svg
                className="absolute block inset-[12.5%]"
                fill="none"
                viewBox="0 0 26 26"
              >
                <path
                  d="M3 3C3 3 3 3 3 3L23 3C24.1 3 25 3.9 25 5L25 21C25 22.1 24.1 23 23 23L3 23C1.9 23 1 22.1 1 21L1 5C1 3.9 1.9 3 3 3Z"
                  stroke="#FF383C"
                  strokeWidth="2"
                />
              </svg>
              <svg
                className="absolute block inset-[37.5%]"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  d="M1 1L9 9M9 1L1 9"
                  stroke="#FF383C"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-[24px] h-[1px] bg-[#13206d]" />

        {/* Profile row */}
        <div className="flex gap-[16px] items-center px-[24px]">
          <div
            className="drop-shadow-[0px_1.408px_0.704px_rgba(132,251,162,0.5)] h-[82px] overflow-clip relative rounded-[52.655px] shrink-0 w-[80.24px]"
            style={{ minWidth: "80.24px" }}
          >
            <img
              alt=""
              className="absolute h-[94.83%] left-[-1.39%] max-w-none top-[1.11%] w-[105.37%]"
              src={profile.photo || defaultPhoto}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col items-start text-[#13206d]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[24px]" style={{ lineHeight: "normal" }}>
              Marina Abdallah
            </p>
            <p className="font-['Inter:Regular',sans-serif] opacity-80 text-[16px]" style={{ lineHeight: "normal" }}>
              UI/UX Designer
            </p>
          </div>
        </div>

        {/* Post text area */}
        <div className="px-[24px]">
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind, Mina?"
            className="w-full min-h-[150px] resize-none border-none outline-none text-[#13206d] font-['Inter:Regular',sans-serif] text-[18px] placeholder-[#13206d]/40 bg-transparent"
            style={{ lineHeight: "normal" }}
          />
        </div>

        {/* Media preview */}
        {newPostMediaUrl && (
          <div className="px-[24px] relative">
            <img
              src={newPostMediaUrl}
              alt="media preview"
              className="w-full max-h-[200px] object-cover rounded-[16px]"
            />
            <button
              onClick={() => setNewPostMedia(null)}
              className="absolute top-2 right-6 bg-black/50 text-white rounded-full size-[24px] flex items-center justify-center hover:bg-black/70 transition-colors text-[14px]"
            >
              ✕
            </button>
          </div>
        )}

        {/* Bottom toolbar */}
        <div className="bg-white shadow-[0px_8px_4px_rgba(132,251,162,0.5)] flex items-center justify-between px-[10px] py-[10px] mx-[14px] mb-[14px] rounded-[16px] border border-[rgba(132,251,162,0.3)]">
          <p className="font-['Inter:Regular',sans-serif] text-[#13206d] text-[18px]" style={{ lineHeight: "normal" }}>
            Add to your post
          </p>
          <div className="flex items-center gap-[8px]">
            {/* Image upload icon */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="relative shrink-0 size-[32px] cursor-pointer hover:opacity-70 transition-opacity"
              title="Upload media"
            >
              <svg className="absolute block inset-[8.33%]" fill="none" viewBox="0 0 26.6667 26.6667">
                <path
                  clipRule="evenodd"
                  d="M2.66667 0C1.19391 0 0 1.19391 0 2.66667V24C0 25.4728 1.19391 26.6667 2.66667 26.6667H24C25.4728 26.6667 26.6667 25.4728 26.6667 24V2.66667C26.6667 1.19391 25.4728 0 24 0H2.66667ZM24 24H2.66667L2.66667 2.66667H24V24Z M9.33333 8C9.33333 6.52724 8.13943 5.33333 6.66667 5.33333C5.19391 5.33333 4 6.52724 4 8C4 9.47276 5.19391 10.6667 6.66667 10.6667C8.13943 10.6667 9.33333 9.47276 9.33333 8Z M4 21.3333L10.6667 14.6667L14.6667 18.6667L18.6667 13.3333L24 21.3333H4Z"
                  fill="#13206D"
                  fillRule="evenodd"
                />
              </svg>
            </button>

            {/* Share icon */}
            {/* <button className="relative shrink-0 size-[32px] cursor-pointer hover:opacity-70 transition-opacity" title="Share">
              <svg className="absolute block inset-[4.17%_4.17%_6.25%_16.67%]" fill="none" viewBox="0 0 25.3333 28.6667">
                <path
                  d="M17.3333 6.66667L9.33333 10.6667M17.3333 22L9.33333 18M24 4C24 5.47276 22.8061 6.66667 21.3333 6.66667C19.8606 6.66667 18.6667 5.47276 18.6667 4C18.6667 2.52724 19.8606 1.33333 21.3333 1.33333C22.8061 1.33333 24 2.52724 24 4ZM24 24.6667C24 26.1394 22.8061 27.3333 21.3333 27.3333C19.8606 27.3333 18.6667 26.1394 18.6667 24.6667C18.6667 23.1939 19.8606 22 21.3333 22C22.8061 22 24 23.1939 24 24.6667ZM6.66667 14.3333C6.66667 15.8061 5.47276 17 4 17C2.52724 17 1.33333 15.8061 1.33333 14.3333C1.33333 12.8606 2.52724 11.6667 4 11.6667C5.47276 11.6667 6.66667 12.8606 6.66667 14.3333Z"
                  stroke="#13206D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button> */}

            {/* Post button */}
            <button
              onClick={onSubmitPost}
              disabled={!newPostContent.trim() && !newPostMedia}
              className="bg-[#84fba2] text-[#13206d] font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] px-[20px] py-[8px] rounded-[16px] cursor-pointer hover:bg-[#6ef094] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}