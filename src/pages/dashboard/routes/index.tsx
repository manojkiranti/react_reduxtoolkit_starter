import { Navigate, Route, Routes } from "react-router-dom";
import { ContainerWrapper } from "@/components/Layout";
import Dashboard from "./Dashboard";

export const DashboardRoutes = () => {
  return (
    <ContainerWrapper>
      <Routes>
        <Route path="" element={<Dashboard />} />
        {/* <Route path="*" element={<Navigate to="." />} /> */}
      </Routes>
    </ContainerWrapper>
  );
};
