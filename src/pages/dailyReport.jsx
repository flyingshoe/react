import { lazy } from "react";

const Gushi = lazy(() => import("gushi/App"));

export default function DailyReport() {
  return (
    <div>
      <Gushi />
    </div>
  );
}
