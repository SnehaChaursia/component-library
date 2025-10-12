export default function DualRingLoader() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-6 border-blue-100 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-900 rounded-full"></div>
      </div>
    </div>
  );
}
