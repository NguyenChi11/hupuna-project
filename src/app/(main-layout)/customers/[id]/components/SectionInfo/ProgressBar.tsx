export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Hoàn thiện hồ sơ</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
