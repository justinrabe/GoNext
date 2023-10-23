// Helper function to convert a web-streams-polyfill ReadableStream to a string
const streamToString = async (stream: ReadableStream) => {
  const reader = stream.getReader();
  let result = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += new TextDecoder().decode(value);
  }
  return result;
};

export default streamToString;
