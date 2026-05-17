import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Document, Page } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
} from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export const APOLO_KIDS_MANUSCRIPT_PDF = "/documents/apolo-kids-interior.pdf";

const MAX_PREVIEW_PAGES = 28;

/** Pixel width for react-pdf rasterization (should track flip-book page width). */
const ManuscriptPageWidthCtx = createContext(320);

type FlipBookApi = {
  pageFlip: () =>
    | {
        flipNext: (corner?: string) => void;
        flipPrev: (corner?: string) => void;
        getCurrentPageIndex: () => number;
        getPageCount: () => number;
      }
    | undefined;
};

const FlipPdfPage = forwardRef<HTMLDivElement, { pageNumber: number }>(
  function FlipPdfPage({ pageNumber }, ref) {
    const width = useContext(ManuscriptPageWidthCtx);
    return (
      <div
        ref={ref}
        className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#f7f4ec] [&_canvas]:pointer-events-none [&_canvas]:select-none"
      >
        <Page
          pageNumber={pageNumber}
          width={Math.max(180, width)}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </div>
    );
  },
);

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ApoloKidsManuscriptPreview({ open, onClose }: Props) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [flipReady, setFlipReady] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const [simplePage, setSimplePage] = useState(1);
  const [bookDims, setBookDims] = useState({ w: 520, h: 720 });
  const [pageRasterWidth, setPageRasterWidth] = useState(480);
  const stageRef = useRef<HTMLDivElement>(null);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flipBookRef = useRef<FlipBookApi | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const syncPageIndex = useCallback(() => {
    const api = flipBookRef.current?.pageFlip();
    if (!api) return;
    try {
      setPageIndex(api.getCurrentPageIndex());
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /** Defer flipbook mount one frame so layout + PDF worker settle (async setState avoids lint cascade warning). */
  useEffect(() => {
    if (!open || reduceMotion || numPages === null) {
      const id = requestAnimationFrame(() => setFlipReady(false));
      return () => cancelAnimationFrame(id);
    }
    const id = requestAnimationFrame(() => setFlipReady(true));
    return () => cancelAnimationFrame(id);
  }, [open, reduceMotion, numPages]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (reduceMotion || numPages === null) return;
      if (e.key === "ArrowRight") {
        flipBookRef.current?.pageFlip()?.flipNext("top");
        requestAnimationFrame(syncPageIndex);
      }
      if (e.key === "ArrowLeft") {
        flipBookRef.current?.pageFlip()?.flipPrev("top");
        requestAnimationFrame(syncPageIndex);
      }
    },
    [onClose, reduceMotion, numPages, syncPageIndex],
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  /** Size flip-book to fill the stage — PageFlip reads numeric width/height only once; bump key when bucket changes. */
  useEffect(() => {
    if (!open || reduceMotion) return;
    const el = stageRef.current;
    if (!el) return;

    const computeDims = () => {
      const r = el.getBoundingClientRect();
      /** Minimal gutter so the spread uses nearly the full stage below the header. */
      const pad = 4;
      const availW = Math.max(280, r.width - pad * 2);
      const availH = Math.max(320, r.height - pad * 2);
      /** StPageFlip: landscape uses one page width = blockWidth/2; portrait uses full block width. */
      const minPageFromFlipBook = 260;
      const portrait = availW < minPageFromFlipBook * 2;
      const singlePageW = portrait ? availW : availW / 2;
      const targetAspect = 520 / 720;
      let pageW = singlePageW;
      let pageH = pageW / targetAspect;
      if (pageH > availH) {
        pageH = availH;
        pageW = pageH * targetAspect;
      }
      /** Allow large displays — only cap at absurd sizes for perf (fits ~4K spread). */
      pageW = Math.floor(Math.min(pageW, 2160));
      pageH = Math.floor(Math.min(pageH, 3072));
      const bucketW = Math.round(pageW / 16) * 16;
      const bucketH = Math.round(pageH / 16) * 16;
      setBookDims((prev) =>
        prev.w === bucketW && prev.h === bucketH ? prev : { w: bucketW, h: bucketH },
      );
      /** Rasterize PDF at single-page slot width (not spread width) so canvas is not clipped. */
      const raster = Math.max(180, Math.floor(bucketW * 0.995));
      setPageRasterWidth((prev) => (prev === raster ? prev : raster));
    };

    const debouncedMeasure = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        resizeTimerRef.current = null;
        computeDims();
      }, 160);
    };

    computeDims();
    const ro = new ResizeObserver(debouncedMeasure);
    ro.observe(el);
    window.addEventListener("resize", debouncedMeasure);
    return () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      ro.disconnect();
      window.removeEventListener("resize", debouncedMeasure);
    };
  }, [open, reduceMotion, numPages]);

  const handleFlipNext = useCallback(() => {
    flipBookRef.current?.pageFlip()?.flipNext("top");
    requestAnimationFrame(syncPageIndex);
  }, [syncPageIndex]);

  const handleFlipPrev = useCallback(() => {
    flipBookRef.current?.pageFlip()?.flipPrev("top");
    requestAnimationFrame(syncPageIndex);
  }, [syncPageIndex]);

  if (!open) return null;

  const previewTotal =
    numPages !== null ? Math.min(numPages, MAX_PREVIEW_PAGES) : 0;

  const caption =
    numPages === null
      ? ""
      : numPages > MAX_PREVIEW_PAGES
        ? `Sample preview: first ${previewTotal} of ${numPages} pages`
        : `${previewTotal} page${previewTotal === 1 ? "" : "s"}`;

  const flipBookKey = `bk-${bookDims.w}x${bookDims.h}-${previewTotal}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex h-[100dvh] w-full flex-col bg-ink-950/85 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apolo-manuscript-title"
    >
      <header className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 bg-ink-950/95 px-4 py-3 text-parchment sm:px-5">
        <div className="min-w-0 flex-1">
          <p
            id="apolo-manuscript-title"
            className="font-serif text-lg font-semibold leading-tight sm:text-xl"
          >
            Apolo-Kids — interior preview
          </p>
          <p className="mt-1 text-xs text-parchment/75 sm:text-sm">
            {reduceMotion
              ? "Reduced motion: use Previous / Next."
              : "Drag from a corner or edge to turn · Arrow keys · or use the buttons."}
            {caption ? ` · ${caption}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {!reduceMotion && previewTotal > 0 && (
            <>
              <button
                type="button"
                onClick={handleFlipPrev}
                disabled={pageIndex <= 0}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-parchment transition hover:bg-white/20 disabled:opacity-30"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleFlipNext}
                disabled={pageIndex >= previewTotal - 1}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-parchment transition hover:bg-white/20 disabled:opacity-30"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-parchment transition hover:bg-white/20"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div
        ref={stageRef}
        className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-gradient-to-b from-ink-800/40 via-parchment to-parchment"
      >
        <Document
          file={APOLO_KIDS_MANUSCRIPT_PDF}
          loading={
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink-700">
              <Loader2 className="h-10 w-10 animate-spin text-gold-700" />
              <p className="text-sm">Loading manuscript…</p>
            </div>
          }
          error={
            <p className="max-w-md px-6 text-center text-sm text-red-900">
              We couldn&apos;t load this preview. Try again later or use the
              pre-order link for a full copy.
            </p>
          }
          onLoadSuccess={({ numPages: n }) => setNumPages(n)}
        >
          <ManuscriptPageWidthCtx.Provider value={pageRasterWidth}>
            {numPages !== null && previewTotal > 0 && reduceMotion && (
              <div className="flex max-h-full min-h-0 w-full flex-col items-center gap-3 overflow-auto px-2 py-3 sm:px-3">
                <div className="w-full max-w-none rounded-lg border border-ink-900/10 bg-white p-1 shadow-inner sm:rounded-2xl sm:p-2">
                  <Page
                    pageNumber={simplePage}
                    width={Math.min(
                      Math.floor(
                        typeof globalThis.window !== "undefined"
                          ? globalThis.window.innerWidth - 24
                          : 520,
                      ),
                      900,
                    )}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    className="btn-ghost px-4 py-2 text-sm disabled:opacity-40"
                    disabled={simplePage <= 1}
                    onClick={() =>
                      setSimplePage((p) => Math.max(1, p - 1))
                    }
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                  <span className="text-sm tabular-nums text-ink-700">
                    {simplePage} / {previewTotal}
                  </span>
                  <button
                    type="button"
                    className="btn-ghost px-4 py-2 text-sm disabled:opacity-40"
                    disabled={simplePage >= previewTotal}
                    onClick={() =>
                      setSimplePage((p) => Math.min(previewTotal, p + 1))
                    }
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
            {numPages !== null &&
              previewTotal > 0 &&
              !reduceMotion &&
              flipReady && (
              <div className="flex h-full min-h-0 w-full items-center justify-center p-1 sm:p-2">
                <HTMLFlipBook
                  key={flipBookKey}
                  ref={flipBookRef}
                  width={bookDims.w}
                  height={bookDims.h}
                  size="stretch"
                  minWidth={260}
                  maxWidth={9999}
                  minHeight={380}
                  maxHeight={9999}
                  drawShadow
                  maxShadowOpacity={0.5}
                  showCover={false}
                  mobileScrollSupport={false}
                  className="godly-manuscript-flipbook"
                  style={{}}
                  startPage={0}
                  flippingTime={850}
                  usePortrait
                  startZIndex={0}
                  autoSize
                  clickEventForward={false}
                  useMouseEvents
                  swipeDistance={24}
                  showPageCorners
                  disableFlipByClick={false}
                  onFlip={() => requestAnimationFrame(syncPageIndex)}
                  onInit={() => requestAnimationFrame(syncPageIndex)}
                >
                  {Array.from({ length: previewTotal }, (_, i) => (
                    <FlipPdfPage key={i + 1} pageNumber={i + 1} />
                  ))}
                </HTMLFlipBook>
              </div>
            )}
          </ManuscriptPageWidthCtx.Provider>
        </Document>
      </div>

      {/* Click-catcher removed from stacking above flipbook — fullscreen chrome uses header only */}
    </div>
  );
}
