function isValidHttpUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

let pageTitle = "output";

// Auto-fill current tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0]) {
    if (tabs[0].url && tabs[0].url.startsWith("http")) {
      document.getElementById("urlInput").value = tabs[0].url;
    }

    if (tabs[0].title) {
      pageTitle = tabs[0].title
        .replace(/[\\/:*?"<>|]/g, "")
        .replace(/\s+/g, "_")
        .slice(0, 60);
    }
  }
});

// Disable PDF options when EPUB selected
document.getElementById("format").addEventListener("change", (e) => {
  const isEpub = e.target.value === "epub";
  document.getElementById("pageSize").disabled = isEpub;
  document.getElementById("orientation").disabled = isEpub;
});

document.getElementById("convertBtn").addEventListener("click", async () => {
  const urlInput = document.getElementById("urlInput");
  const button = document.getElementById("convertBtn");
  const status = document.getElementById("status");

  const url = urlInput.value.trim();
  const format = document.getElementById("format").value;

  if (!url) {
    alert("Please enter a URL");
    return;
  }

  if (!isValidHttpUrl(url)) {
    alert("Please enter a valid URL starting with http:// or https://");
    return;
  }

  button.disabled = true;
  button.textContent = "Converting...";
  status.textContent = "Please wait...";

  try {
    const pageSize = document.getElementById("pageSize").value;
    const orientation = document.getElementById("orientation").value;

    const response = await fetch("http://localhost:3000/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        pageSize,
        orientation,
        format
      })
    });

    if (!response.ok) throw new Error("Server error");

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${pageTitle}.${format}`;
    a.click();

    URL.revokeObjectURL(downloadUrl);
    status.textContent = "Download started";

  } catch {
    alert("Failed to convert URL");
    status.textContent = "";
  } finally {
    button.disabled = false;
    button.textContent = "Convert";
  }
});








