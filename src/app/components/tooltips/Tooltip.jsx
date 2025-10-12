// Tooltip.jsx
export default function Tooltip({ text, children }) {
  return (
    <div className="relative flex items-center group">
      {children}
      <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded px-2 py-1 whitespace-nowrap">
        {text}
      </span>
    </div>
  );
}
