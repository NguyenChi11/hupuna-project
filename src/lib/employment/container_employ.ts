export const ALL_AVAILABLE_COLUMNS = {
  checkbox: "Tích chọn",
  stt: "STT",
  employeeId: "Mã nhân viên",
  fullName: "Tên nhân viên",
  address: "Địa chỉ",
  phone: "Số điện thoại",
  department: "Phòng ban",
  position: "Chức vụ",
  manager: "Quản lý trực tiếp",
  employeeSegment: "Phân loại nhân viên",
  employeeStatus: "Tình trạng nhân viên",
  avatar: "Ảnh đại diện",
  email: "Email",
  hireDate: "Ngày vào làm",
  lastReview: "Đánh giá gần nhất",
  birthday: "Ngày sinh",
} as const;


export const DEFAULT_VISIBLE_COLUMNS = {
  checkbox: true,
  stt: true,
  employeeId: true,
  fullName: true,
  address: true,
  phone: true,
  department: true,
  position: true,
  manager: true,
  employeeSegment: true,
  employeeStatus: true,
  avatar: false,
  email: false,
  hireDate: false,
  lastReview: false,
  birthday: false,
} as const;

export const FILTER_OPTIONS = {
  department: ["Kinh doanh", "Kế toán", "Nhân sự", "Kỹ thuật", "Marketing"],
  position: ["Trưởng phòng", "Nhân viên", "Thực tập sinh", "Phó phòng", "Cộng tác viên"],
  employeeSegment: ["Intern", "Fresher", "Junior", "Middle", "Senior"],
  manager: ["Nguyễn Văn A", "Trần Thị B", "Phạm Văn C", "Hoàng Thị D"],
} as const;


export const DEPARTMENTS = FILTER_OPTIONS.department;
export const POSITIONS = FILTER_OPTIONS.position;
export const EMPLOYEE_SEGMENTS = FILTER_OPTIONS.employeeSegment;
export const MANAGERS = FILTER_OPTIONS.manager;

