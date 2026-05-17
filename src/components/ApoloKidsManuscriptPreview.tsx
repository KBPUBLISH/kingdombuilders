import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";

export const APOLO_KIDS_MANUSCRIPT_PDF = "/documents/apolo-kids-interior.pdf";

const MAX_PREVIEW_PAGES = 28;
/** Fallback until page 1 viewport is read from the PDF. */
const DEFAULT_PAGE_ASPECT = 520 / 720;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ApoloKidsManuscriptPreview({ open, onClose }: Props) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageAspect, setPageAspect] = useState(DEFAULT_PAGE_ASPECT);
  const [renderWidth, setRenderWidth] = useState(480);
  const stageRef = useRef<HTMLDivElement>(null);

  const previewTotal =
    numPages !== null ? Math.min(numPages, MAX_PREVIEW_PAGES) : 0;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const goPrev = useCallback(() => {
    setCurrentPage((p) => Math.max(1, p - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentPage((p) => Math.min(previewTotal || 1, p + 1));
  }, [previewTotal]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    },
    [onClose, goPrev, goNext],
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  /** Fit one page to the stage below the header (width × height, no clipping). */
  useEffect(() => {
    if (!open) return;
    const el = stageRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      const pad = 12;
      const availW = Math.max(200, width - pad * 2);
      const availH = Math.max(280, height - pad * 2);
      let w = availW;
      let h = w / pageAspect;
      if (h > availH) {
        h = availH;
        w = h * pageAspect;
      }
      setRenderWidth(Math.floor(w));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [open, pageAspect]);

  const onDocumentLoad = useCallback(async (pdf: pdfjs.PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
    try {
      const first = await pdf.getPage(1);
      const vp = first.getViewport({ scale: 1 });
      setPageAspect(vp.width / vp.height);
    } catch {
      setPageAspect(DEFAULT_PAGE_ASPECT);
    }
  }, []);

  if (!open) return null;

  const caption =
    numPages === null
      ? ""
      : numPages > MAX_PREVIEW_PAGES
        ? `Sample preview: first ${previewTotal} of ${numPages} pages`
        : `${previewTotal} page${previewTotal === 1 ? "" : "s"}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex max-h-[100dvh] min-h-0 w-full flex-col overflow-hidden bg-ink-950"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apolo-manuscript-title"
    >
      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 bg-ink-950 px-3 py-2 text-parchment sm:px-4">
        <div className="min-w-0 flex-1">
          <p
            id="apolo-manuscript-title"
            className="truncate font-serif text-base font-semibold sm:text-lg"
          >
            Apolo-Kids — interior preview
          </p>
          <p className="truncate text-[11px] text-parchment/75 sm:text-xs">
            Arrow keys or buttons to turn
            {caption ? ` · ${caption}` : ""}
            {previewTotal > 0 ? ` · ${currentPage} / ${previewTotal}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentPage <= 1 || previewTotal === 0}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-parchment transition hover:bg-white/20 disabled:opacity-30 sm:h-10 sm:w-10"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={currentPage >= previewTotal || previewTotal === 0}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-parchment transition hover:bg-white/20 disabled:opacity-30 sm:h-10 sm:w-10"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-parchment transition hover:bg-white/20 sm:h-10 sm:w-10"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div
        ref={stageRef}
        className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#f4f1e8]"
      >
        <Document
          file={APOLO_KIDS_MANUSCRIPT_PDF}
          className="flex h-full w-full min-h-0 items-center justify-center"
          loading={
            <div className="flex flex-col items-center justify-center gap-3 text-ink-700">
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
          onLoadSuccess={onDocumentLoad}
        >
          {numPages !== null && previewTotal > 0 && (
            <div className="flex h-full w-full items-center justify-center p-2 sm:p-3">
              <div className="shadow-[0_8px_40px_-8px_rgba(24,20,40,0.35)]">
                <Page
                  key={currentPage}
                  pageNumber={currentPage}
                  width={renderWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            </div>
          )}
        </Document>

        {previewTotal > 0 && (
          <>
            <button
              type="button"
              aria-label="Previous page"
              className="absolute inset-y-0 left-0 z-10 w-[min(28%,120px)] cursor-w-resize bg-transparent"
              onClick={goPrev}
            />
            <button
              type="button"
              aria-label="Next page"
              className="absolute inset-y-0 right-0 z-10 w-[min(28%,120px)] cursor-e-resize bg-transparent"
              onClick={goNext}
            />
          </>
        )}
      </div>
    </div>
  );
}