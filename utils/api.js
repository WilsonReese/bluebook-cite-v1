// TRY 2 -- works for sending PDFs correctly.

import axios from "axios";
import * as FileSystem from "expo-file-system";
import FormData from "form-data";

async function uploadFile(uri, fileType) {
  try {
    const formData = new FormData();

    if (typeof uri === "object" && uri.uri && uri.name && uri.type) {
      // Fetch the Blob for the web `blob:` URI
      const response = await fetch(uri.uri);
      const blob = await response.blob();

      formData.append("file", blob, uri.name);
    } else if (typeof uri === "string") {
      formData.append("file", {
        uri,
        name: fileType === "pdf" ? "document.pdf" : "image.jpg",
        type: fileType === "pdf" ? "application/pdf" : "image/jpeg",
      });
    } else {
      throw new Error("Invalid file input");
    }

    formData.append("purpose", "assistants"); // Purpose specific to Assistant API

    console.log("FormData before upload:", formData);

    const uploadRes = await axios.post(
      "https://api.openai.com/v1/files",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_SECRET_KEY}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Uploaded File Response:", uploadRes.data);
    return uploadRes.data.id; // Return the file_id
  } catch (error) {
    console.error("Error uploading file:", error.response?.data || error.message);
    throw new Error("Failed to upload file.");
  }
}

export async function handleGenerateCitation(input, setResponse, isFile = false, isPDF = false) {
  if (!isFile && (typeof input !== "string" || input.trim() === "")) {
    setResponse("Please enter text or upload a file to generate a citation.");
    return;
  }

  try {
    let file_id;

    if (isFile) {
      const fileType = isPDF ? "pdf" : "image";
      console.log(fileType === "pdf" ? "PDF File URI:" : "Image URI:", input);

      // Upload the file and get the file_id
      file_id = await uploadFile(input, fileType);
      console.log("Uploaded File ID:", file_id);
    }

    const threadPayload = {
      messages: [
        isFile
          ? isPDF
            ? {
                role: "user",
                content: [
                  {
                    type: "text", // Use 'text' type for PDFs
                    text: file_id, // Directly use the uploaded file_id as the text
                  },
                ],
              }
            : {
                role: "user",
                content: [
                  {
                    type: "image_file",
                    image_file: {
                      file_id, // Use the uploaded file ID
                    },
                  },
                ],
              }
          : { role: "user", content: input }, // Text input remains a string
      ],
    };

    console.log("Thread Payload:", JSON.stringify(threadPayload, null, 2));

    // Step 1: Create the thread
    const threadRes = await axios.post(
      "https://api.openai.com/v1/threads",
      threadPayload,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_SECRET_KEY}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    const threadId = threadRes.data.id;
    console.log("Thread ID:", threadId);

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
      // console.log("Messages", messages);
      console.log("Polling Response:", messagesRes.data);

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
    console.error("Error generating citation:", error.response?.data || error.message);
    setResponse("Failed to generate citation. Please try again.");
  }
}

// // Try 1 - Only works or images - no PDF support

// import axios from "axios";
// import * as FileSystem from "expo-file-system";
// import FormData from "form-data";

// async function uploadImage(base64Content) {
//   try {
//     const formData = new FormData();
//     formData.append("file", {
//       uri: base64Content,
//       name: "image.jpg", // File name
//       type: "image/jpeg", // File type
//     });
//     formData.append("purpose", "assistants"); // Use 'assistants' for image upload to be used with Assistant API

//     const uploadRes = await axios.post(
//       "https://api.openai.com/v1/files",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_SECRET_KEY}`,
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     console.log("Uploaded File Response:", uploadRes.data);
//     return uploadRes.data.id; // Return the `file_id`
//   } catch (error) {
//     console.error("Error uploading file:", error.response?.data || error.message);
//     throw new Error("Failed to upload image.");
//   }
// }

// export async function handleGenerateCitation(input, setResponse, isImage = false) {
//   if (!input.trim() && !isImage) {
//     setResponse("Please enter text or upload an image to generate a citation.");
//     return;
//   }

//   try {
//     let file_id;

//     if (isImage) {
//       const base64Content = `data:image/jpeg;base64,${await FileSystem.readAsStringAsync(input, {
//         encoding: FileSystem.EncodingType.Base64,
//       })}`;

//       console.log("Base64 Image Content:", base64Content.substring(0, 100)); // Log first 100 characters of base64

//       // Upload the image and get the file_id
//       file_id = await uploadImage(base64Content);
//       console.log("Uploaded File ID:", file_id);
//     }

//     const threadPayload = {
//       messages: [
//         isImage
//           ? {
//               role: "user",
//               content: [
//                 {
//                   type: "image_file",
//                   image_file: {
//                     file_id, // Use the uploaded file ID
//                   },
//                 },
//               ],
//             }
//           : { role: "user", content: input }, // Text input remains a string
//       ],
//     };

//     console.log("Thread Payload:", threadPayload);

//     // Step 1: Create the thread
//     const threadRes = await axios.post(
//       "https://api.openai.com/v1/threads",
//       threadPayload,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_SECRET_KEY}`,
//           "Content-Type": "application/json",
//           "OpenAI-Beta": "assistants=v2",
//         },
//       }
//     );

//     const threadId = threadRes.data.id;
//     console.log("Thread ID:", threadId);

//     // Step 2: Engage Assistant API (start the run)
//     const runRes = await axios.post(
//       `https://api.openai.com/v1/threads/${threadId}/runs`,
//       { assistant_id: `${process.env.EXPO_PUBLIC_ASSISTANT_ID}` },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_SECRET_KEY}`,
//           "Content-Type": "application/json",
//           "OpenAI-Beta": "assistants=v2",
//         },
//       }
//     );

//     console.log("Step 2 complete");

//     // Step 3: Poll for the response
//     let assistantMessage;
//     while (true) {
//       const messagesRes = await axios.get(
//         `https://api.openai.com/v1/threads/${threadId}/messages`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_SECRET_KEY}`,
//             "OpenAI-Beta": "assistants=v2",
//           },
//         }
//       );

//       const messages = messagesRes.data.data;
//       console.log("Messages", messages);

//       assistantMessage = messages.find(
//         (msg) => msg.role === "assistant" && msg.content?.length > 0
//       );

//       if (assistantMessage) break;

//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Poll every second
//     }

//     console.log("Step 3 complete");

//     // Step 4: Extract the assistant's response
//     const contentText = assistantMessage.content.find(
//       (item) => item.type === "text"
//     );

//     const citation = contentText?.text?.value || "No citation found.";
//     console.log("Citation:", citation);
//     setResponse(citation);
//   } catch (error) {
//     console.error("Error generating citation:", error.response?.data || error.message);
//     setResponse("Failed to generate citation. Please try again.");
//   }
// }
