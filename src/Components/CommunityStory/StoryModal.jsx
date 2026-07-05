import React from "react";
import { IoClose } from "react-icons/io5";
import Button from "../../Pages/Shared/Button/Button";

const StoryModal = ({ story, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-red-500 hover:text-white"
        >
          <IoClose size={20} />
        </button>

        {/* Image */}
        <img
          src={story.image}
          alt={story.title}
          className="h-48 w-full object-cover"
        />

        {/* Content */}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold text-primary">
            {story.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-7">
            {story.content}
          </p>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={onClose}
              label="close"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;