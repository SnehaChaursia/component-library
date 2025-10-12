export default function AnimatedTooltip({ text, children }) {
  return (
    <div className="relative flex items-center group">
      {children}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
        bg-gray-900 text-white text-sm rounded px-2 py-1 whitespace-nowrap
        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {text}
      </span>
    </div>
  );
}
