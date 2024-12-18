import axios from "axios";
import * as FileSystem from "expo-file-system";

export async function handleGenerateCitation(input, setResponse, isImage = false) {
  if (!input.trim() && !isImage) {
    setResponse("Please enter text or upload an image to generate a citation.");
    return;
  }

  try {
    const content = isImage
      ? `data:image/jpeg;base64,${await FileSystem.readAsStringAsync(input, {
          encoding: FileSystem.EncodingType.Base64,
        })}`
      : input;

    console.log("Prepared Content:", content);

    // Step 1: Create the thread and send user message in a single call
    const threadRes = await axios.post(
      "https://api.openai.com/v1/threads",
      {
        messages: [
          {
            role: "user",
            content: isImage ? { type: "file", file: content } : content,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_SECRET_KEY}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    const threadId = threadRes.data.id;
    console.log("ThreadID", threadId);

    // Step 2: Engage Assistant API (start the run)
    const runRes = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/runs`,
      { assistant_id: `${process.env.EXPO_PUBLIC_ASSISTANT_ID}` },
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_SECRET_KEY}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    console.log("Step 2 complete");

    // Step 3: Poll for the response
    let assistantMessage;
    while (true) {
      const messagesRes = await axios.get(
        `https://api.openai.com/v1/threads/${threadId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_SECRET_KEY}`,
            "OpenAI-Beta": "assistants=v2",
          },
        }
      );

      const messages = messagesRes.data.data;
      console.log("Messages", messages);

      assistantMessage = messages.find(
        (msg) => msg.role === "assistant" && msg.content?.length > 0
      );

      if (assistantMessage) break;

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Poll every second
    }

    console.log("Step 3 complete");

    // Step 4: Extract the assistant's response
    const contentText = assistantMessage.content.find(
      (item) => item.type === "text"
    );

    const citation = contentText?.text?.value || "No citation found.";
    console.log("Citation:", citation);
    setResponse(citation);
  } catch (error) {
    console.error("Error generating citation:", error);
    setResponse("Failed to generate citation. Please try again.");
  }
}