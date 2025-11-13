export const ALL_AVAILABLE_COLUMNS = {
  checkbox: "Tích chọn",
  stt: "STT",
  customerId: "Mã khách hàng",
  name: "Tên khách hàng",
  address: "Địa chỉ cụ thể",
  phone: "Điện thoại",
  consultant: "Nhân viên tư vấn",
  zaloConsultant: "Zalo tư vấn",
  advisor: "Người tư vấn",
  customerSegment: "Phân khúc khách hàng",
  customerStatus: "Tình trạng khách hàng",
  logo: "Logo",
  email: "Email",
  createdDate: "Ngày tạo",
  lastContact: "Liên hệ lần cuối",
  birthday: "Sinh nhật",
} as const;

export const DEFAULT_VISIBLE_COLUMNS = {
  checkbox: true,
  stt: true,
  customerId: true,
  name: true,
  address: true,
  phone: true,
  consultant: true,
  zaloConsultant: true,
  advisor: true,
  customerSegment: true,
  customerStatus: true,
  logo: false,
  email: false,
  createdDate: false,
  lastContact: false,
  birthday: false,
} as const;

export const FILTER_OPTIONS = {
  region: ["TP.HCM", "Hà Nội", "Hải Phòng", "Đà Nẵng", "Khác"],
  productGroup: [
    "Điện tử",
    "Thời trang",
    "Thực phẩm",
    "Nội thất",
    "Công nghệ",
    "Khác",
  ],
  customerSegment: ["VIP", "Thường xuyên", "Tiềm năng", "Mới"],
  consultant: ["Nguyễn Văn A", "Trần Thị B", "Phạm Văn C", "Hoàng Thị D"],
} as const;

export const REGIONS = FILTER_OPTIONS.region;
export const PRODUCT_GROUPS = FILTER_OPTIONS.productGroup;
export const CUSTOMER_SEGMENTS = FILTER_OPTIONS.customerSegment;
export const CONSULTANTS = FILTER_OPTIONS.consultant;
