import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "../styles/flipbook.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Page component using React.forwardRef as required by react-pageflip
const FlipBookPage = React.forwardRef((props, ref) => {
  const { children, pageWidth, pageHeight } = props;
  return (
    <div
      className="page"
      ref={ref}
      style={{
        width: pageWidth,
        height: pageHeight,
        backgroundColor: "#2D1B2E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
});
FlipBookPage.displayName = "FlipBookPage";

const pageStyles = {
  width: 600,
  height: 850,
  backgroundColor: "#2D1B2E",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #444",
  fontSize: "14px",
  color: "#EAEAEA",
};

function Flipbook(props) {
  const { yearbookPath, page } = props;
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInput, setPageInput] = useState("1");
  const [isEditingPage, setIsEditingPage] = useState(false);
  const flipBookRef = useRef();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (page && numPages) {
      const pageNum = parseInt(page, 10);

      if (pageNum >= 1 && pageNum <= numPages) {
        const intervalId = setInterval(() => {
          if (
            flipBookRef.current &&
            typeof flipBookRef.current.pageFlip === 'function' &&
            flipBookRef.current.pageFlip()
          ) {
            flipBookRef.current.pageFlip().turnToPage(pageNum - 1);
            clearInterval(intervalId);
          }
        }, 100);

        return () => clearInterval(intervalId);
      }
    }
  }, [page, numPages]);

  // Navigation functions
  const goToPreviousPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  }, []);

  const goToNextPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goToPreviousPage();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goToNextPage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goToPreviousPage, goToNextPage]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const onFlip = useCallback((e) => {
    setCurrentPage(e.data);
    setPageInput(String(e.data + 1));
  }, []);

  const goToPage = useCallback(
    (pageNum) => {
      if (flipBookRef.current && pageNum >= 1 && pageNum <= numPages) {
        // react-pageflip uses 0-based indexing, so subtract 1
        flipBookRef.current.pageFlip().turnToPage(pageNum - 1);
        setPageInput(String(pageNum));
      }
    },
    [numPages]
  );

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput);
    if (pageNum >= 1 && pageNum <= numPages) {
      goToPage(pageNum);
    } else {
      setPageInput(String(currentPage + 1));
    }
    setIsEditingPage(false);
  };

  const handlePageDisplayClick = () => {
    setIsEditingPage(true);
    setPageInput(String(currentPage + 1));
  };

  const handlePageInputBlur = () => {
    setIsEditingPage(false);
    setPageInput(String(currentPage + 1));
  };

  const handlePageInputKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsEditingPage(false);
      setPageInput(String(currentPage + 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handlePageInputSubmit(e);
    }
  };

  const downloadCurrentPage = () => {
    try {
      // Find all canvas elements within page containers
      const flipBookContainer = document.querySelector(".stf__parent");
      if (!flipBookContainer) {
        alert("Unable to find flipbook container. Please try again.");
        return;
      }

      // Get all page elements that are currently visible
      const allCanvasParentElements = flipBookContainer.querySelectorAll(
        ".stf__item.--active, .stf__item.--left, .stf__item.--right"
      );

      // Filter out any elements with display:none
      const visiblePageParents = Array.from(allCanvasParentElements).filter(
        (parent) => window.getComputedStyle(parent).display !== "none"
      );

      // Get the canvas elements from these visible parents
      const visiblePages = visiblePageParents
        .map((parent) => parent.querySelector("canvas"))
        .filter((canvas) => canvas && canvas instanceof HTMLCanvasElement);

      if (visiblePages.length === 0) {
        // Fallback: try to find canvas elements in a different way
        const allCanvases = flipBookContainer.querySelectorAll("canvas");
        if (allCanvases.length > 0) {
          // For desktop, try to find the canvas that corresponds to the current page
          let targetCanvas;
          if (isMobile) {
            // On mobile, find the canvas closest to the current page
            targetCanvas =
              allCanvases[Math.min(currentPage, allCanvases.length - 1)];
          } else {
            // On desktop, we might have multiple visible canvases
            // Try to get the one that's currently in focus
            const currentCanvasIndex = Math.min(
              currentPage,
              allCanvases.length - 1
            );
            targetCanvas = allCanvases[currentCanvasIndex];
          }

          if (targetCanvas) {
            const link = document.createElement("a");
            link.download = `yearbook-page-${currentPage + 1}.png`;
            link.href = targetCanvas.toDataURL("image/png");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
          }
        }
        alert("Unable to find the current page. Please try again.");
        return;
      }

      // If we found visible pages, download both for desktop with appropriate numbering
      // only one canvas is visible at a time in mobile

      for (let i = 0; i < visiblePages.length; i++) {
        const canvas = visiblePages[i];
        const link = document.createElement("a");
        var pageNumber = currentPage + 1 + i;
        // For multi-page, ensure index addition happens correctly - parity
        pageNumber -= visiblePages.length > 1 ? (currentPage + 1) % 2 : 0;
        link.download = `yearbook-page-${pageNumber}.png`;
        link.href = canvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Add a small delay
        if (i < visiblePages.length - 1) {
          // Avoid delay on the last page
          new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
    } catch (error) {
      console.error("Error downloading page:", error);
      alert("Unable to download the current page. Please try again.");
    }
  };

  // Memoize canvas props to avoid recreation
  const canvasProps = useMemo(
    () => ({
      style: {
        maxWidth: "100%",
        height: "auto",
      },
    }),
    []
  );

  // Only render pages that are visible or nearby for performance
  const shouldRenderPage = useCallback(
    (pageIndex) => {
      if (!numPages) return false;
      // Render only a few neighboring pages for better performance
      const range = 5;
      return Math.abs(pageIndex - currentPage) <= range;
    },
    [currentPage, numPages]
  );

  function pagesList() {
    if (!numPages) return [];

    const pageWidth = isMobile ? 375 : 600;
    const pageHeight = isMobile ? 530 : 850;

    var pages = [];
    for (var i = 1; i <= numPages; i++) {
      pages.push(
        <FlipBookPage key={i} pageWidth={pageWidth} pageHeight={pageHeight}>
          {shouldRenderPage(i - 1) ? (
            <Page
              width={pageWidth}
              pageNumber={i}
              renderMode="canvas"
              loading={
                <div
                  style={{
                    ...pageStyles,
                    width: pageWidth,
                    height: pageHeight,
                  }}
                >
                  Loading page {i}...
                </div>
              }
              error={
                <div
                  style={{
                    ...pageStyles,
                    width: pageWidth,
                    height: pageHeight,
                  }}
                >
                  Failed to load page {i}
                </div>
              }
              canvasProps={canvasProps}
            />
          ) : (
            <div
              style={{
                ...pageStyles,
                width: pageWidth,
                height: pageHeight,
              }}
            >
              Page {i}
            </div>
          )}
        </FlipBookPage>
      );
    }
    return pages;
  }

  return (
    <Box
      className="flipbook-container"
      sx={{
        backgroundColor: "#1D141A",
        minHeight: "100vh",
        padding: isMobile ? "20px 10px" : "69px 20px",
        marginTop: "37px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Document
        file={yearbookPath}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <Box
            sx={{ color: "#EAEAEA", textAlign: "center", paddingTop: "50vh"}}
          >
            <Typography variant="h6">Loading PDF...</Typography>
          </Box>
        }
      >
        {/* Desktop Layout */}
        {!isMobile && (
          <div
            style={{
              position: "relative",
              width: "100%",
              margin: "0 auto",
              height: "calc(100vh - 40px)",
            }}
          >
            {/* Left Navigation Button */}
            <IconButton
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              sx={{
                position: "absolute",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                color: "#dbc8d5",
                backgroundColor: "#52424d",
                border: "2px solid #b9a6b2",
                width: 60,
                height: 60,
                "&:hover": {
                  backgroundColor: "#40383e",
                  transform: "translateY(-50%) scale(1.05)",
                },
                "&:disabled": {
                  color: "#52424d",
                  backgroundColor: "#2e262c",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ChevronLeft sx={{ fontSize: 32 }} />
            </IconButton>
            <div
              style={{
                position: "relative",
                height: "100%",
                paddingTop: "calc(50vh - 530px)",
              }}
            >
              <HTMLFlipBook
                ref={flipBookRef}
                width={600}
                height={850}
                minWidth={300}
                maxWidth={600}
                size="fixed"
                flippingTime={600}
                usePortrait={true}
                showCover={true}
                onFlip={onFlip}
                style={{
                  borderRadius: "10px",
                  margin: "0 auto",
                }}
              >
                {pagesList()}
              </HTMLFlipBook>

              {/* Page Number Display */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 6,
                  gap: 2,
                }}
              >
                <Box
                  onClick={handlePageDisplayClick}
                  sx={{
                    backgroundColor: "#52424d11",
                    backdropFilter: "blur(20px)",
                    borderRadius: "20px",
                    padding: "12px 24px",
                    border: "1px solid #40383e",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      backgroundColor: "rgba(40, 30, 35, 0.95)",
                      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5)",
                      border: "1px solid #83727f",
                    },
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {isEditingPage ? (
                    <Box
                      component="form"
                      onSubmit={handlePageInputSubmit}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <TextField
                        value={pageInput}
                        onChange={handlePageInputChange}
                        onBlur={handlePageInputBlur}
                        onKeyDown={handlePageInputKeyDown}
                        type="number"
                        size="small"
                        autoFocus
                        inputProps={{
                          min: 1,
                          max: numPages || 1,
                          style: {
                            color: "#EAEAEA",
                            textAlign: "center",
                            width: "60px",
                            fontWeight: 700,
                            fontSize: "16px",
                            padding: "4px 8px",
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "32px",
                            backgroundColor: "transparent",
                            borderRadius: "8px",
                            "& fieldset": {
                              borderColor: "rgba(255, 255, 255, 0.3)",
                              borderWidth: "1px",
                            },
                            "&:hover fieldset": {
                              borderColor: "rgba(255, 255, 255, 0.5)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#EAEAEA",
                              borderWidth: "2px",
                            },
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          color: "#EAEAEA",
                          fontWeight: 700,
                          fontSize: "16px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        of {numPages || 0}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#EAEAEA",
                        fontWeight: 700,
                        textAlign: "center",
                        fontSize: "16px",
                        letterSpacing: "0.5px",
                        textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                        userSelect: "none",
                      }}
                    >
                      {currentPage === 0
                        ? `Page 1 of ${numPages || 0}`
                        : `Pages ${currentPage + 1}-${Math.min(
                          currentPage + 2,
                          numPages || 0
                        )} of ${numPages || 0}`}
                    </Typography>
                  )}
                </Box>
                {/* Download Button */}
                <button className="button" onClick={downloadCurrentPage}>
                  <span className="svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="20"
                      viewBox="0 0 38 15"
                      fill="none"
                    >
                      <path
                        fill="white"
                        d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </Box>
            </div>
            {/* </div> */}

            {/* Right Navigation Button */}
            <IconButton
              onClick={goToNextPage}
              disabled={!numPages || currentPage >= numPages - 1}
              sx={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                color: "#dbc8d5",
                backgroundColor: "#52424d",
                border: "2px solid #b9a6b2",
                width: 60,
                height: 60,
                "&:hover": {
                  backgroundColor: "#40383e",
                  transform: "translateY(-50%) scale(1.05)",
                },
                "&:disabled": {
                  color: "#52424d",
                  backgroundColor: "#2e262c",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ChevronRight sx={{ fontSize: 32 }} />
            </IconButton>
          </div>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              paddingTop: "calc(50vh - 375px)",
            }}
          >
            <div style={{ display: "inline-block" }}>
              <HTMLFlipBook
                ref={flipBookRef}
                width={375}
                height={530}
                minWidth={250}
                maxWidth={350}
                size="fixed"
                flippingTime={600}
                usePortrait={true}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={onFlip}
                style={{
                  borderRadius: "8px",
                }}
              >
                {pagesList()}
              </HTMLFlipBook>
            </div>

            {/* Mobile Navigation and Page Number */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                mt: 3,
                width: "100%",
              }}
            >
              <IconButton
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                sx={{
                  color: "#dbc8d5",
                  backgroundColor: "#52424d",
                  border: "2px solid #b9a6b2",
                  width: 50,
                  height: 50,
                  "&:hover": {
                    backgroundColor: "#40383e",
                  },
                  "&:disabled": {
                    color: "#52424d",
                    backgroundColor: "#2e262c",
                  },
                }}
              >
                <NavigateBefore />
              </IconButton>

              <Box
                onClick={handlePageDisplayClick}
                sx={{
                  backgroundColor: "#52424d11",
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  padding: "12px 24px",
                  border: "1px solid #40383e",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    backgroundColor: "rgba(40, 30, 35, 0.95)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5)",
                    border: "1px solid #83727f",
                  },
                }}
              >
                {isEditingPage ? (
                  <Box
                    component="form"
                    onSubmit={handlePageInputSubmit}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <TextField
                      value={pageInput}
                      onChange={handlePageInputChange}
                      onBlur={handlePageInputBlur}
                      onKeyDown={handlePageInputKeyDown}
                      type="number"
                      size="small"
                      autoFocus
                      inputProps={{
                        min: 1,
                        max: numPages || 1,
                        style: {
                          color: "#EAEAEA",
                          textAlign: "center",
                          width: "40px",
                          fontWeight: 700,
                          fontSize: "16px",
                          padding: "4px 8px",
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "32px",
                          backgroundColor: "transparent",
                          borderRadius: "8px",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.3)",
                            borderWidth: "1px",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#EAEAEA",
                            borderWidth: "2px",
                          },
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        color: "#EAEAEA",
                        fontWeight: 700,
                        fontSize: "16px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      / {numPages || 0}
                    </Typography>
                  </Box>
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#EAEAEA",
                      fontWeight: 700,
                      textAlign: "center",
                      fontSize: "16px",
                      letterSpacing: "0.5px",
                      textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                      userSelect: "none",
                    }}
                  >
                    {currentPage + 1} / {numPages || 0}
                  </Typography>
                )}
              </Box>

              <IconButton
                onClick={goToNextPage}
                disabled={!numPages || currentPage >= numPages - 1}
                sx={{
                  color: "#dbc8d5",
                  backgroundColor: "#52424d",
                  border: "2px solid #b9a6b2",
                  width: 50,
                  height: 50,
                  "&:hover": {
                    backgroundColor: "#40383e",
                  },
                  "&:disabled": {
                    color: "#52424d",
                    backgroundColor: "#2e262c",
                  },
                }}
              >
                <NavigateNext />
              </IconButton>
            </Box>

            {/* Download Button for Mobile */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "24px",
              }}
            >
              {/* Download Button */}
              <button className="button" onClick={downloadCurrentPage}>
                <span className="text">Download Page(s)</span>
                <span className="svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="20"
                    viewBox="0 0 38 15"
                    fill="none"
                  >
                    <path
                      fill="white"
                      d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
                    ></path>
                  </svg>
                </span>
              </button>
            </Box>
          </div>
        )}
      </Document>
    </Box>
  );
}
export default Flipbook;
