import { Navbar } from "@/src/components/navbar";
import Sidebar from "@/src/components/UI/Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div>
        {children}
      </div>
    </div>
  );
};
