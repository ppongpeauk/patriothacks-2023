import Footer from "@/components/footer/Footer";
import Nav from "@/components/nav/Nav";


export default function Layout({ children }: { children: React.ReactNode }) {
    return <>
        <Nav type="front" />
        {children}
        <Footer />
    </>
}