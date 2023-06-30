import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SciChartSurface } from "scichart";

SciChartSurface.setRuntimeLicenseKey(
  "Vbv2mCZGTlqmbqc1jVrdm/r9wByktN9Xfusi3tjHI/ZddCfyomNadwUwG+WCxh/JGPZPZxkjCBByGaL5QD4eZyoxFVbI7SLqSBv91gVbfSCSmmrokr6/ZTUWJzqP2UfNxX15EVRpoyit4lwNxkrJjgt4farcpghNBMXGaV+sh+wRBfjCAjZQj/W4yeB9bDaHeYBWWd6D9CtuMFSpFYCD2bVZ+l1ZwnF+4Rzy0Lmv8oNN8z32wHKTR4qkCRM24pXo5U29jKU1whzGGaz71QqdnFYhInkL4bFbHGyUH5UgZV2GcGuxq2jxfE+53FLX8qMdGNNSz/NkXP/qN/GD8ACS/SVnLkU3+I1aVw/hYF9R+4a9ifos0/eGgH0cSmhgN3XpeocMsoBMl0uzAV0HjaLh/zEb+a8w1aVHTTFRUfT/EuaMwICsZ9Fd9hfTs7U3swypvU78yyIdqCOobfA46R3LnWqABIGsYa26R5kxxhKRtlsz1cUfLUXToBTeq0YdAP33UWIE7GddL0EFbyMLnn3fV42mDqAnUqaLxgaqoRSYzmSIsRP+MmUFkSI="
);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
