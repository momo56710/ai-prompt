import "@styles/globals.css";
import { Children } from "react";
import Provider from "@app/component/Provider";
import { Nav } from "@app/component/Nav";
export const metadata = {
  title: "promotopia",
  description: "Discover & Share Ai Prompts",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gtadient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
