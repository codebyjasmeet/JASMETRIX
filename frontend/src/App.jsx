import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import FeatureCard from "./components/FeatureCard";

function App() {
  const [fileName, setFileName] = useState("No file selected");
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);

  const [showResult, setShowResult] = useState(false);
  const [selectedMode, setSelectedMode] = useState("image");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [confidence, setConfidence] = useState(0);

  const [realScore, setRealScore] = useState(0);
  const [fakeScore, setFakeScore] = useState(0);

  const [videoFile, setVideoFile] = useState(null);
const [videoName, setVideoName] = useState("No video selected");
const [videoPreview, setVideoPreview] = useState(null);

  async function analyzeImage() {
    console.log("Analyze function started");

    if (!selectedFile) {
      alert("Please choose an image first!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("Sending request...");

      const response = await fetch(
        "http://127.0.0.1:8000/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("Response:", response);

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();

      console.log("Response Data:", data);

      setStatus(data.status);
      setConfidence(data.confidence);
      setRealScore(data.real_score ?? 0);
      setFakeScore(data.fake_score ?? 0);

      setShowResult(true);
    } catch (error) {
      console.log("Analysis Error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileChange(e) {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];

    const fileBuffer = await file.arrayBuffer();

    const fileCopy = new File(
      [fileBuffer],
      file.name,
      { type: file.type }
    );

    setSelectedFile(fileCopy);
    setFileName(file.name);

    setImage(URL.createObjectURL(file));

    setShowResult(false);
    setStatus("");
    setConfidence(0);
    setRealScore(0);
    setFakeScore(0);
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
            onClick={analyzeImage}
          >
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
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
      Status:{" "}
      <span className={status === "FAKE" ? "fake" : "real"}>
        {status}
      </span>
    </h3>

    <div className="confidence-section">
      <p>
        Confidence: <strong>{confidence}%</strong>
      </p>

      <div className="score-row">
        <span>REAL</span>
        <div className="score-bar">
          <div
            className="score-fill real-fill"
            style={{ width: `${realScore}%` }}
          ></div>
        </div>
        <span>{realScore}%</span>
      </div>

      <div className="score-row">
        <span>FAKE</span>
        <div className="score-bar">
          <div
            className="score-fill fake-fill"
            style={{ width: `${fakeScore}%` }}
          ></div>
        </div>
        <span>{fakeScore}%</span>
      </div>
    </div>

   <p>
  {status === "FAKE"
    ? "⚠️ The AI model detected patterns that may indicate AI-generated or manipulated content."
    : "✅ The AI model found patterns that are more consistent with authentic content."}
</p>

  </div>
)}
        </>
      )}

      {selectedMode === "video" && (
  <>
    <input
      type="file"
      accept="video/*"
      onChange={(e) => {
        if (e.target.files.length > 0) {
          const file = e.target.files[0];

          setVideoFile(file);
          setVideoName(file.name);

          if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
          }

          setVideoPreview(URL.createObjectURL(file));
        }
      }}
    />

    <p>{videoName}</p>

    {videoPreview && (
      <video
        src={videoPreview}
        controls
        className="video-preview"
      />
    )}

    {videoFile && (
      <button
       onClick={async () => {
  if (!videoFile) {
    alert("Please choose a video first!");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", videoFile);

    const response = await fetch(
      "http://127.0.0.1:8000/analyze-video",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Video upload failed");
    }

    const data = await response.json();

    console.log("Video Response:", data);

    alert(data.message);

  } catch (error) {
    console.log("Video Error:", error);
    alert("Video upload failed!");
  }
}} 
      >
        Upload & Analyze Video
      </button>
    )}

    <div className="result-card">
      <h2>🎥 Video Detection</h2>
      <p>Video upload and preview are ready.</p>
    </div>
  </>
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