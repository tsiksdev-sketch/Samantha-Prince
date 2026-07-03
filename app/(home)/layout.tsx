import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

import { SiteFooter } from "@/components/shared/footer/foot";
import { SiteHeader } from "@/components/shared/header/navbar";


export default async function RootLayout({
  children,
}: {  

  children: React.ReactNode;
}) {
  return (
    <div>
      
      <SiteHeader/>
      <main> {children}</main> 
       <SiteFooter/>
    </div>
  );
}