import { decode } from 'blurhash';
import {component$, QwikIntrinsicElements, useSignal, useVisibleTask$, VisibleTaskStrategy} from "@builder.io/qwik";

type CanvasAttributes = QwikIntrinsicElements['canvas'];

export type Props = CanvasAttributes & {
  hash: string;
  height?: number;
  punch?: number;
  width?: number;
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

export default component$<Props>(({hash, height = 128, width = 128, punch, strategy, ...rest}) => {
  const canvasRef = useSignal<HTMLCanvasElement>();

  useVisibleTask$(ctx => {
    ctx.track(() => hash && width && height && punch);

    const canvasEl = ctx.track(() => canvasRef.value);
    if (!canvasEl) return;

    const canvasCtx = canvasEl.getContext('2d');
    if (!canvasCtx) return;

    const pixels = decode(hash, width, height, punch);
    const imageData = canvasCtx.createImageData(width, height);
    imageData.data.set(pixels);
    canvasCtx.putImageData(imageData, 0, 0);
  }, {strategy: strategy});

  return <canvas {...rest} height={height} width={width} ref={canvasRef} />;
});
