import { decodeHtml } from "./decodeHtml";

export const useXmlDownloader = () => {
  const downloadProcessedXml = (processedReplay: Document, filename: string = "processed_replay.xml") => {
    if (!processedReplay) {
      throw new Error("No processed replay document provided");
    }

    // Remove the IP addresses from the XML
    const ipAddresses = processedReplay.querySelectorAll("IpAddress");
    ipAddresses.forEach((ip) => ip.remove());

    const serialisedtoString = new XMLSerializer().serializeToString(processedReplay);
    const decodedHtml = decodeHtml(serialisedtoString);

    const blob = new Blob([decodedHtml], {
      type: "application/octet-stream",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    downloadProcessedXml,
  };
};
