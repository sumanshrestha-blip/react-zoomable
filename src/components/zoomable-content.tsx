import { getZoomTransformation } from "../utils/getZoomTransformation";
import { useZoom } from "./zoomable-container";

type ZoomableContentProps = {
  children: React.ReactNode;
};

export function ZoomableContent({ children }: ZoomableContentProps) {
  const { scale } = useZoom();

  const transformationValue = getZoomTransformation({ scale });

  return (
    <div
      style={{
        transform: transformationValue,
      }}

      className="border"
    >
      {children}
    </div>
  );
}
