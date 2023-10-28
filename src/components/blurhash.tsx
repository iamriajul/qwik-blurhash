import {component$, CSSProperties, QwikIntrinsicElements, VisibleTaskStrategy} from "@builder.io/qwik";
import BlurhashCanvas from "./blurhash-canvas";

type DivAttributes = QwikIntrinsicElements['div'];

type Props = DivAttributes & {
  hash: string;
  /** CSS height, default: 128 */
  height?: number | string | 'auto';
  punch?: number;
  resolutionX?: number;
  resolutionY?: number;
  /** Must be an object, not string */
  style?: CSSProperties;
  /** CSS width, default: 128 */
  width?: number | string | 'auto';
  /**
   * The strategy to use to determine when the "VisibleTask" should first execute.
   *
   * - `intersection-observer`: the task will first execute when the element is visible in the
   *   viewport, under the hood it uses the IntersectionObserver API.
   * - `document-ready`: the task will first execute when the document is ready, under the hood it
   *   uses the document `load` event.
   * - `document-idle`: the task will first execute when the document is idle, under the hood it uses
   *   the requestIdleCallback API.
   */
  strategy?: VisibleTaskStrategy;
};

const canvasStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
};

export default component$<Props>(({hash, width = 128, height = 128, punch, resolutionY = 32, resolutionX = 32, style, ...rest}) => {
  if (resolutionX <= 0) {
    throw new Error('resolutionX must be larger than zero');
  }

  if (resolutionY <= 0) {
    throw new Error('resolutionY must be larger than zero');
  }

  return (
    <div
      {...rest}
      style={{
        display: 'inline-block',
        width: typeof width as unknown === 'number' ? `${width}px` : width,
        height: typeof height as unknown === 'number' ? `${height}px` : height,
        ...style as any,
        position: 'relative'
    }}
    >
      <BlurhashCanvas
        hash={hash}
        height={resolutionY}
        width={resolutionX}
        punch={punch}
        style={canvasStyle}
      />
    </div>
  );
});