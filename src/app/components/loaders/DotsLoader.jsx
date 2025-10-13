export default function DotsLoader() {
  return (
    <div className="flex justify-center items-center space-x-2">
      <span className="w-8 h-8 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-8 h-8 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></span>
    </div>
  );
}
