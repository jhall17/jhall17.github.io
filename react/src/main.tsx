import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SciChartSurface } from "scichart";

SciChartSurface.setRuntimeLicenseKey(
  "QBdyNPymat5wN1ARRx3tSbSD8rGKiyflfHgtjUIsNuSnM2ONvyY2o0aFQ5RleabThQ/QgZC5SZvskoWhc+r1F9tQp8rwFpq/QNimappKKHJ4AHO0dhCSzC1zdyX205SxhYxxN/q6CMkC5zNub9TAAkGOOzLl60udW9cw6OwcRYRVXfgxFqFyJljVoLKhNgUr00b3FXTRwCGup5+Y9onBWOxwLxapxcoa8bwimOhO9fOMGNcZxC+1zfOiHbsYS+KlXr0TtxSimRm4eKtJknLSxmf3DqROuokRA5iV5XV1rdIrEjP9cbQJ3ZlgPKgkFwGAfug7Sviqr5TmZqSTK4tzEVtsXsZycEmRdEkoRhzQge+POSfcxPvahvWTfxnY8Fkc28hJ1W3nid+OFIGy6SDdIqj1wdMgfl+MGjl01nn8uIoADDrJGFpPpVsw0oDUiGLb5dj+4uLXZu8FNzycSNPXm/UYOlnjj7hEyTdsiqe22liFeBI4W1MA4VhUpv/pRtnSEURqkZJJqbnRKpYjZ44JhdAv888J8XijaI5jP9F+PF9+r8N+rAcCVySuYLeXJIXU"
);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
