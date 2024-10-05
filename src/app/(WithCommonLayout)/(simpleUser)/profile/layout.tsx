import Sidebar from "@/src/components/UI/Sidebar";
import { ReactNode } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1280px] mx-auto p-2 grid grid-cols-4">
      <div>
        <Sidebar />
      </div>
      <div className="col-span-3">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;