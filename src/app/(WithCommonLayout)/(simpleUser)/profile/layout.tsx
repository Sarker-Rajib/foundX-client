import { ReactNode } from "react";

import Sidebar from "@/src/components/UI/Sidebar";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1280px] mx-auto p-2 grid grid-cols-4">
      <div>
        {/* sidebar */}
        <Sidebar />
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default UserLayout;
