import ZoomProvider, {
  type Transform,
  type ZoomableContextProps,
} from "../context/zoom-context";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type ZoomableContainerProps = {
  maxZoom?: number;
  minZoom?: number;
  showControls?: boolean;
  children: React.ReactNode;
};

export function ZoomableContainer({
  children,
  maxZoom = 5,
  minZoom = 1,
  showControls = true,
}: ZoomableContainerProps) {
  const [transform, setTransform] = useState<Transform>({
    scale: 1,
    x: 0,
    y: 0,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  const zoomIn = () => {
    setTransform((transform) => ({
      ...transform,
      scale: Math.min(transform.scale + 0.25, maxZoom),
    }));
  };

  const zoomOut = () => {
    setTransform((transform) => ({
      ...transform,
      scale: Math.max(transform.scale - 0.25, minZoom),
    }));
  };

  const resetZoom = () => {
    setTransform((transform) => ({
      ...transform,
      scale: 1,
    }));
  };

  const contextValue = useMemo<ZoomableContextProps>(() => {
    return { maxZoom, minZoom, zoomIn, zoomOut, resetZoom, transform };
  }, [transform, minZoom, maxZoom]);

  // prevent the ctrl + wheel event from zooming in the container
  useEffect(() => {
    const el = containerRef.current;

    if (!el) return;

    // handle wheel
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;

      e.preventDefault();

      const delta = -e.deltaY;
      const zoomFactor = 0.0001;

      // translation calculation
      const rect = el.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientX - rect.top;

      setTransform((transform) => {
        const newScale = Math.min(
          Math.max(transform.scale + zoomFactor * delta, minZoom),
          maxZoom,
        );

        const ratio = 1 - newScale / transform.scale;

        return {
          scale: newScale,
          x: transform.x + (mouseX - transform.x) * ratio,
          y: transform.y + (mouseY - transform.y) * ratio,
        };
      });
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => el.removeEventListener("wheel", handleWheel);
  }, [maxZoom, minZoom]);

  return (
    <ZoomProvider contextValue={contextValue}>
      <div
        className="w-full h-full overflow-hidden relative"
        ref={containerRef}
      >
        {children}

        {/* controls */}
        {showControls && (
          <div className="flex flex-col absolute bottom-0 right-0 gap-2">
            <button onClick={zoomIn} className="rounded-full p-2 bg-gray-400">
              <Plus />
            </button>
            <button onClick={zoomOut} className="rounded-full p-2 bg-gray-400">
              <Minus />
            </button>
            <button
              onClick={resetZoom}
              className="rounded-full p-2 bg-gray-400"
            >
              <RotateCcw />
            </button>
          </div>
        )}
      </div>
    </ZoomProvider>
  );
}
