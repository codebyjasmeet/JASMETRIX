import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import FeatureCard from "./components/FeatureCard";

function App() {
  const [fileName, setFileName] = useState("No file selected");
  const[selectedFile, setSelectedFile]=useState(null);
  const [image, setImage] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedMode, setSelectedMode] = useState("image");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
const [confidence, setConfidence] = useState(0);
async function analyzeImage() {
console.log("Analyze function started");
  if (!selectedFile) {
    alert("Please choose an image first!");
    return;
  }

  try {
    setLoading(true);
    setShowResult(false);

    const formData = new FormData();
    formData.append("file", selectedFile);
console.log("sending request.....");
    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });
    console.log(response);

    const data = await response.json();
    
console.log("Response Data:", data);

if (!data) {
  alert("Backend returned null!");
  setLoading(false);
  return;
}

    setStatus(data.status);
    setConfidence(data.confidence);

    setLoading(false);
    setShowResult(true);

  } catch (error) {
    console.log(error);
    setLoading(false);
  }

}

  return (
    <div className="hero">
      <Navbar />

      <h1>JASMETRIX</h1>

      <h2>Detect Deepfakes. Protect Reality.</h2>

      <p>
        Analyze AI-generated images, videos and audio with intelligent
        deepfake detection technology.
      </p>

      <div className="features">
        <FeatureCard
          icon="📸"
          title="Image Detection"
          description="Analyze AI-generated images."
          active={selectedMode === "image"}
          onClick={() => {
            setSelectedMode("image");
            setShowResult(false);
          }}
        />

        <FeatureCard
          icon="🎥"
          title="Video Detection"
          description="Detect manipulated videos."
          active={selectedMode === "video"}
          onClick={() => {
            setSelectedMode("video");
            setShowResult(false);
          }}
        />

        <FeatureCard
          icon="🎤"
          title="Audio Detection"
          description="Verify AI-generated voices."
          active={selectedMode === "audio"}
          onClick={() => {
            setSelectedMode("audio");
            setShowResult(false);
          }}
        />
      </div>


      {selectedMode === "image" && (
        <>
          <button
            onClick={() => {
              if (!image) {
                alert("Please choose an image first.");
                return;
              }

              analyzeImage();
            }}
            >
  Upload & Analyze
</button>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                const file = e.target.files[0];
                setSelectedFile(file);
                setFileName(file.name);
                setImage(URL.createObjectURL(file));
                setShowResult(false);
                setLoading(false);
              }
            }}
          />

          <p>{fileName}</p>

          {image && (
            <img
              src={image}
              alt="Preview"
              className="preview-image"
            />
          )}

          {loading && (
            <div className="result-card">
              <h2>🧠 AI is analyzing...</h2>
              <p>Please wait...</p>
            </div>
          )}

          {showResult && !loading && (
            <div className="result-card">
              <h2>🧠 AI Analysis</h2>

              <h3>
                Status: <span className="fake">{status}</span>
              </h3>

              <p>Confidence:{confidence}</p>

              <p>
                Possible AI-generated facial inconsistencies detected.
              </p>
            </div>
          )}
        </>
      )}
      {selectedMode === "video" && (
        <div className="result-card">
          <h2>🎥 Video Detection</h2>
          <p>🚧 Coming Soon</p>
        </div>
      )}
      {selectedMode === "audio" && (
        <div className="result-card">
          <h2>🎤 Audio Detection</h2>
          <p>🚧 Coming Soon</p>
        </div>
      )}
    </div>
  );
}

export default App;