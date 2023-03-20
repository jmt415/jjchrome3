// Wait for the Summarize button to be clicked
document.getElementById("summarizeButton").addEventListener("click", async () => {
  // Get the current tab's URL
  chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
    const url = tabs[0].url;
    // Call the OpenAI API to summarize the article at the given URL
    const response = await fetch("https://api.openai.com/v1/engines/davinci-002/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        prompt: `Summarize the following article: ${url}`,
        max_tokens: 60,
        temperature: 0.7,
        n: 1,
        stop: "."
      })
    });
    const data = await response.json();
    const summary = data.choices[0].text;
    // Display the summary in a popup window
    alert(summary);
  });
});
