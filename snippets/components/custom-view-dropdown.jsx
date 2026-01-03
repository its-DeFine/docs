"use client";
import React, { useState } from "react";

export const CustomViewDropdown = ({ views, position = "inline" }) => {
  const [selectedView, setSelectedView] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!views || views.length === 0) {
    return null;
  }

  return (
    <>
      {/* Custom Dropdown - Position controlled by 'position' prop */}
      <div className={`custom-view-dropdown-wrapper position-${position}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="custom-view-dropdown-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="custom-view-dropdown-label">
            {views[selectedView]?.icon && (
              <i
                className={`fa-${views[selectedView].iconType || "solid"} fa-${
                  views[selectedView].icon
                }`}
              />
            )}
            {views[selectedView]?.title || "Select View"}
          </span>
          <svg
            className={`custom-view-dropdown-arrow ${isOpen ? "rotate" : ""}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            <div
              className="custom-view-dropdown-overlay"
              onClick={() => setIsOpen(false)}
            />
            <div className="custom-view-dropdown-menu">
              {views.map((view, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedView(index);
                    setIsOpen(false);
                  }}
                  className={`custom-view-dropdown-item ${
                    selectedView === index ? "active" : ""
                  }`}
                >
                  {view.icon && (
                    <i
                      className={`fa-${view.iconType || "solid"} fa-${
                        view.icon
                      }`}
                    />
                  )}
                  {view.title}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content Display */}
      <div className="custom-view-content">{views[selectedView]?.content}</div>

      <style jsx>{`
        .custom-view-dropdown-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 1.5rem;
          z-index: 100;
        }

        /* Position variants */
        .custom-view-dropdown-wrapper.position-inline {
          position: relative;
        }

        .custom-view-dropdown-wrapper.position-top-right {
          position: absolute;
          top: 0;
          right: 0;
        }

        .custom-view-dropdown-wrapper.position-top-left {
          position: absolute;
          top: 0;
          left: 0;
        }

        .custom-view-dropdown-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: rgba(43, 154, 102, 0.1);
          border: 1px solid #2b9a66;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          color: #2b9a66;
          transition: all 0.2s ease;
        }

        .custom-view-dropdown-button:hover {
          background-color: rgba(43, 154, 102, 0.2);
          border-color: #18794e;
        }

        .custom-view-dropdown-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .custom-view-dropdown-arrow {
          transition: transform 0.2s ease;
        }

        .custom-view-dropdown-arrow.rotate {
          transform: rotate(180deg);
        }

        .custom-view-dropdown-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99;
        }

        .custom-view-dropdown-menu {
          position: absolute;
          top: calc(100% + 0.25rem);
          left: 0;
          min-width: 200px;
          background-color: var(--background-primary, white);
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
          z-index: 100;
          overflow: hidden;
        }

        .custom-view-dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          font-size: 0.875rem;
          color: var(--text-primary, #111827);
          transition: background-color 0.15s ease;
        }

        .custom-view-dropdown-item:hover {
          background-color: rgba(43, 154, 102, 0.1);
        }

        .custom-view-dropdown-item.active {
          background-color: rgba(43, 154, 102, 0.15);
          color: #18794e;
          font-weight: 600;
        }

        .custom-view-content {
          margin-top: 1rem;
        }

        @media (prefers-color-scheme: dark) {
          .custom-view-dropdown-menu {
            background-color: #1f2937;
            border-color: #374151;
          }

          .custom-view-dropdown-item {
            color: #f3f4f6;
          }
        }
      `}</style>
    </>
  );
};
