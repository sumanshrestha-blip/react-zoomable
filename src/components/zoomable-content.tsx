import { useZoom } from "../context/zoom-context";
import { getZoomTransformation } from "../utils/getZoomTransformation";

type ZoomableContentProps = {
  children: React.ReactNode;
};

export function ZoomableContent({ children }: ZoomableContentProps) {
  const {
    transform: { scale, x, y },
  } = useZoom();

  const transformationValue = getZoomTransformation({
    scale,
    translateX: x,
    translateY: y,
  });

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
