export const imgSrcUrl = (imgSrc?: string) =>
  `${
    import.meta.env.VITE_APP_UPLOADS_URL && !imgSrc?.includes("http")
      ? import.meta.env.VITE_APP_UPLOADS_URL
      : ""
  }${imgSrc}`;
