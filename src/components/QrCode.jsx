import React, { useState } from "react";
import "./QrCode.css";
export default function QrCode() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("150");

  const generate = async () => {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const download = async () => {
    try {
      const response = await fetch(img);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "QRCode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("There was an error with the download operation:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>QR Code Generator </h1>
      {loading && <p> Please wait....</p>}
      {img && <img src={img} alt="QR code" className="qr-code-image" />}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Date for QR code :
        </label>

        <input
          type="text"
          id="dataInput"
          value={qrData}
          onChange={(e) => {
            setQrData(e.target.value);
          }}
          placeholder="Enter data QR code"
        />

        <label htmlFor="sizeInput" className="input-label">
          Image size (e.g ,150):
        </label>
        <input
          type="text"
          id="sizeInput"
          value={qrSize}
          onChange={(e) => {
            setQrSize(e.target.value);
          }}
          placeholder="Enter image size"
        />
        <button
          className="generate-button"
          onClick={generate}
          disabled={loading}
        >
          {" "}
          Generate QR Code
        </button>
        <button className="download-button" onClick={download}>
          {" "}
          Download
        </button>
      </div>
      <p className="footer">
        {" "}
        Designed by <a href="#karthi">Karthikeyan</a>
      </p>
    </div>
  );
}
