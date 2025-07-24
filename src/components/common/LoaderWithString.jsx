import { useMemo } from "react";

const LoaderWithString = ({ messages }) => {
  // Convert object to array if needed
  const messageArray = useMemo(() => {
    if (Array.isArray(messages)) return messages;
    return Object.values(messages);
  }, [messages]);

  // Pick a random message
  const randomMessage = useMemo(() => {
    if (messageArray.length === 0) return "Loading...";
    const index = Math.floor(Math.random() * messageArray.length);
    return messageArray[index];
  }, [messageArray]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-gray-700 py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
      <p className="text-lg font-medium">{randomMessage}</p>
    </div>
  );
};

export default LoaderWithString;
