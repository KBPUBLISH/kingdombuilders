import { useNavigate } from "react-router-dom";
import { ApoloKidsManuscriptPreview } from "../components/ApoloKidsManuscriptPreview";
import { APOLO_KIDS_PAGE_PATH } from "../data/apoloKidsShop";

export function ApoloKidsPreview() {
  const navigate = useNavigate();
  return (
    <ApoloKidsManuscriptPreview
      open
      onClose={() => navigate(APOLO_KIDS_PAGE_PATH)}
    />
  );
}
