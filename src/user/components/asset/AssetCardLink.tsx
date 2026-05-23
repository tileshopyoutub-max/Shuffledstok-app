import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { MediaItem } from "../../../components/admin/hooks/useAllMedia";
import { getListingPath } from "../../utils/assetUrl";

interface AssetCardLinkProps {
  item: MediaItem;
  className?: string;
  onNavigate?: () => void;
  children: ReactNode;
}

export function AssetCardLink({
  item,
  className,
  onNavigate,
  children,
}: AssetCardLinkProps) {
  const to = getListingPath(item);

  if (!to) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Link to={to} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}
