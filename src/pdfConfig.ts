import { pdfjs } from "react-pdf";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

/**
 * Bundled worker via Vite — must match the `pdfjs-dist` version used by
 * `react-pdf` (avoid a root-level pdfjs dependency that hoists a mismatched
 * major/minor and breaks page rasterization).
 */
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
