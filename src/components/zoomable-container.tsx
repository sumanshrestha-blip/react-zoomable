import { Minus, Plus, RotateCcw } from "lucide-react";
import { createContext, useContext, useMemo, useState } from "react";

type ZoomableContextProps = {
  scale: number;
  maxZoom: number;
  minZoom: number;

  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
};

const ZoomContext = createContext<ZoomableContextProps | null>(null);

export function useZoom() {
  const context = useContext(ZoomContext);

  if (!context)
    throw new Error("useZoom should be used within the ZoomWrapper");

  return context;
}

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
  const [scale, setScale] = useState<number>(1);

  const zoomIn = () => {
    setScale((scale) => Math.min(scale + 0.25, maxZoom));
  };

  const zoomOut = () => {
    setScale((scale) => Math.max(scale - 0.25, minZoom));
  };

  const resetZoom = () => {
    setScale(1);
  };

  const contextValue = useMemo<ZoomableContextProps>(() => {
    return { maxZoom, minZoom, zoomIn, zoomOut, resetZoom, scale };
  }, [scale, minZoom, maxZoom]);

  return (
    <ZoomContext.Provider value={contextValue}>
      <div className="w-full h-full overflow-hidden relative">
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
            <button onClick={resetZoom} className="rounded-full p-2 bg-gray-400">
              <RotateCcw />
            </button>
          </div>
        )}
      </div>
    </ZoomContext.Provider>
  );
}
