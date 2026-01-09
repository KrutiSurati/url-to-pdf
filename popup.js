function isValidHttpUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

let pageTitle = "output";

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

document.getElementById("convertBtn").addEventListener("click", async () => {
  const urlInput = document.getElementById("urlInput");
  const button = document.getElementById("convertBtn");
  const status = document.getElementById("status");

  const url = urlInput.value.trim();

if (!url) {
  alert("Please enter a URL");
  return;
}

if (!isValidHttpUrl(url)) {
  alert("Please enter a valid URL starting with http:// or https://");
  return;
}


  // Loading state
  button.disabled = true;
  button.textContent = "Converting...";
  status.textContent = "Please wait...";

  try {
    const pageSize = document.getElementById("pageSize").value;
const orientation = document.getElementById("orientation").value;
    const response = await fetch("http://localhost:3000/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url,
        pageSize,
        orientation

       })
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${pageTitle}.pdf`;
    a.click();

    URL.revokeObjectURL(downloadUrl);
    status.textContent = "Download started";

  } catch {
    alert("Failed to convert URL to PDF");
    status.textContent = "";
  } finally {
    button.disabled = false;
    button.textContent = "Convert";
  }
});







