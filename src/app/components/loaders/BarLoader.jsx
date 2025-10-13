export default function BarLoader() {
  return (
    <div className="flex justify-center items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-2.5 h-8 bg-emerald-800 animate-ping"
          style={{ animationDelay: `${i * 0.1}s` }}
        ></div>
      ))}
    </div>
  );
}
