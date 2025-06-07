import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBarComponent from "@components/navbar";
import Bottom from "@components/footer";
import Flipbook from "@components/flipbook";

import "@styles/embla.css";

export default function Yearbook() {
  const router = useRouter();
  const { year = "2k20" } = router.query;

  const [authenticated, setAuthenticated] = useState(false);
  // const [iframeHeight, setIframeHeight] = useState("100vh");

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const isAuthorized = cookies.some((cookie) =>
      cookie.trim().includes("Authorization_YearBook")
    );
    setAuthenticated(isAuthorized);
  }, []);

  // useEffect(() => {
  //   if (!authenticated) return;

  //   const handleResize = () => {
  //     const iframe = document.querySelector("iframe");
  //     if (iframe) {
  //       try {
  //         const contentHeight = iframe.contentWindow.document.body.scrollHeight;
  //         setIframeHeight(`${contentHeight}px`);
  //       } catch (error) {
  //         console.error("Could not access iframe content:", error);
  //       }
  //     }
  //   };

  //   const timer = setTimeout(handleResize, 1000);

  //   return () => clearTimeout(timer);
  // }, [authenticated, year]);

  return (
    <section>
      <NavBarComponent isSticky={true} />
      <section>
        {authenticated ? (
          <section>
            <Flipbook />
          </section>
        ) : (
          <section
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h1>You are not authenticated to view this page.</h1>
            </div>
            <div
              style={{
                textAlign: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <h2>
                <a href="/api/login" className="btn">
                  Login CAS
                </a>
              </h2>
            </div>
          </section>
        )}
      </section>
      <Bottom />
    </section>
  );
}
