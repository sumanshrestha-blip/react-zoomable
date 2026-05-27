type GetZoomTransformationProps = {
  scale: number;
  translateX?: number;
  translateY?: number;
};

export function getZoomTransformation({
  scale,
  translateX = 0,
  translateY = 0,
}: GetZoomTransformationProps) {
  return `scale(${scale}) translateX(${translateX}) translateY(${translateY})`;
}
