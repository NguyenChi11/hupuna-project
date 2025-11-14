export default function ActionButtons({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="flex gap-3 border-t border-gray-200 pt-6">
      <button
        onClick={onEdit}
        className="flex-1 h-10 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all"
      >
        Chỉnh sửa
      </button>
      <button className="flex-1 h-10 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
        Xóa
      </button>
    </div>
  );
}
