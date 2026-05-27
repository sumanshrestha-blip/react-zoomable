import { createContext, useContext } from "react";

export type Transform = { scale: number; x: number; y: number };

export type ZoomableContextProps = {
  transform: Transform;
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

export default function ZoomProvider({
  contextValue,
  children,
}: {
  contextValue: ZoomableContextProps;
  children: React.ReactNode;
}) {
  return (
    <ZoomContext.Provider value={contextValue}>{children}</ZoomContext.Provider>
  );
}
