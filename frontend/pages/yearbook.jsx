import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBarComponent from "@components/navbar";
import Bottom from "@components/footer";
import Flipbook from "@components/flipbook";

import "@styles/embla.css";

// Mapping of year identifiers to PDF paths
const yearPdfMapping = {
  "2k21": "./assets/yearbooks/2k21.pdf",
  "2k20": "./assets/yearbooks/2k20.pdf",
  "2k19": "./assets/yearbooks/2k19.pdf",
  "2k15": "./assets/yearbooks/2k15.pdf",
  "2k14": "./assets/yearbooks/2k14.pdf",
};

// Get latest year (first in the mapping)
const latestYearKey = Object.keys(yearPdfMapping)[0];

export default function Yearbook() {
  const router = useRouter();
  const { year = latestYearKey, page } = router.query;

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const isAuthorized = cookies.some((cookie) =>
      cookie.trim().includes("Authorization_YearBook")
    );
    setAuthenticated(isAuthorized);
  }, []);

  // Get the appropriate yearbook path based on the year parameter
  const yearbookPath = yearPdfMapping[year] || yearPdfMapping[latestYearKey];

  return (
    <section style={{ paddingTop: "45px" }}>
      <NavBarComponent isSticky={true} />
      <section>
        {authenticated ? (
          <section>
            <Flipbook yearbookPath={yearbookPath} page={page} />
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
