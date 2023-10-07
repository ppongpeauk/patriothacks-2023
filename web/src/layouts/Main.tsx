import Footer from "@/components/footer/Footer";
import Nav from "@/components/nav/Nav";
import dynamic from "next/dynamic";

const DynamicNav = dynamic(() => import("@/components/nav/Nav"), {
  ssr: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DynamicNav type="front" />
      {children}
      <Footer />
    </>
  );
}
