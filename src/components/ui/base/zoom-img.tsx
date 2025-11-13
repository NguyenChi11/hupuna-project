import React, { useState, useRef, useEffect } from "react";

interface ZoomImageViewerProps {
  src: string;
  alt?: string;
  className?: string;
}

const ZoomImageViewer: React.FC<ZoomImageViewerProps> = ({ src, alt = "", className }) => {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleOpen = () => {
    setOpen(true);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => Math.min(5, Math.max(0.5, prev - e.deltaY * 0.001)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (open) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, open]);

  if (!open) {
    return (
      <img
        width={"100%"}
        height={"100%"}
        src={src}
        alt={alt}
        className={className ?? "cursor-pointer"}
        onClick={handleOpen}
        style={{ cursor: "zoom-in" }}
      />
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.9)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setOpen(false)}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "white",
          border: "none",
          padding: "8px 12px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        ✕
      </button>
      {/* Zoom controls */}
      <div style={{ position: "absolute", top: 20, left: 20, display: "flex", gap: "10px" }}>
        <button
          onClick={() => setScale((s) => Math.min(5, s + 0.1))}
          style={{ padding: "6px 10px", cursor: "pointer" }}
          className="hover:bg-white text-white hover:text-black border font-bold border-gray-300 rounded-full"
        >
          ＋
        </button>
        <button
          onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
          style={{ padding: "6px 10px", cursor: "pointer" }}
          className="hover:bg-white text-white hover:text-black border font-bold border-gray-300 rounded-full"
        >
          －
        </button>
      </div>
      <div
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        style={{
          cursor: dragging ? "grabbing" : "grab",
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: dragging ? "none" : "transform 0.2s ease",
        }}
      >
        <img
          width={"100%"}
          height={"100%"}
          src={src}
          alt={alt}
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ZoomImageViewer;
