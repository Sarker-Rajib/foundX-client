import { Navbar } from "@/src/components/navbar";

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
