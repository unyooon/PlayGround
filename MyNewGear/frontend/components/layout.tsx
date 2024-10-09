import React from "react";
import Header from "~/components/ui/header";
import Footer from "~/components/ui/footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
