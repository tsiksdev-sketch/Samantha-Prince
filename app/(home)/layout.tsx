import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";




export default async function RootLayout({
  children,
}: {  

  children: React.ReactNode;
}) {
  return (
    <div>
      
      <Header/>
      <main> {children}</main> 
       <Footer/>
    </div>
  );
}