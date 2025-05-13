export const SUCCESS = 'success';
export const ERROR = 'error';
export const WARNING = 'warning';
export const INFO = 'INFO ';

export const STATUS_ACTION = {
  create: 1,
  detail: 2,
  edit: 3,
  dky: 4,
  role: 5,
  import: 6,
  extends: 7,
  records: 8,
  attachment: 9,
  print: 10,
  phieuDoiChieu: 11,
  trichLuc: 12,
  view: 13,
  move: 14,
  delete: 99,
};

export const WIDTH_DIALOG = '100%';
export const HEIGHT_DIALOG = '100%';
export const PAGE_SIZE = 10;
export const SEARCH_LABEL = 'Tìm';
export const REFRESH_LABEL = 'Làm mới';
export const ADDNEW_LABEL = 'Thêm mới';
export const EDIT_LABEL = 'Sửa';
export const DETAIL_LABEL = 'Xem';
export const DELETE_LABEL = 'Xóa';

export const LBL_DISPLAY = {
  syncNgsp: 'Đồng bộ NGSP',
  add: 'Thêm mới',
  edit: 'Sửa',
  update: 'Cập nhập',
  delete: 'Xóa',
  view: 'Xem',
  search: 'Tìm kiếm',
  save: 'Lưu',
  print: 'In',
  close: 'Đóng',
  back: 'Quay lại',
  refresh: 'Làm mới',
  file: 'Chọn file',
  confirm: 'Xác nhận',
  cancel: 'Hủy',
  importFile: 'Import',
  downloadTemplate: 'Tải template',
  sync: 'Đồng bộ',
  download: 'Tải xuống',
  chooseImportFile: 'Chọn File Import',
};

export const TRANGTHAI_SUDUNG = {
    SUDUNG: {
      name: 'Sử dụng',
      value: '1',
    },
    KHONG_SUDUNG: {
      name: 'Không sử dụng',
      value: '0',
    },
  };

  export const Roles = [
    {
      name: 'Quản trị hệ thống',
      value: '1',
    },
    {
      name: 'Quản trị vận hành',
      value: '2',
    },
    {
      name: 'Quản trị liên thông văn bản',
      value: '3',
    },
  ];

export const accept_file_img = '.jpg, .png, .jpeg';
export const allowedExtensionsImg = ['.jpg', '.png', '.jpeg'];
export const accept_file_ncc = '.pdf, .jpg, .png, .jpeg';
export const allowedExtensionsNcc = ['.jpg', '.png', '.jpeg', '.pdf', '.docx', '.xlsx', '.doc', '.xls', '.txt'];
export const allowedExtensionsPdf = ['.pdf'];

export const INPUT_TYPE = {
    number: 'number',
    list: 'list',
    text: 'text',
    date: 'date',
    boolean: 'boolean',
  };
  
  export const LST_INPUT_TYPE = [
    {
      value: 'number',
    },
    {
      value: 'list',
    },
    {
      value: 'text',
    },
    {
      value: 'date',
    },
    {
      value: 'boolean',
    },
  ];

  export const actionBtn: { text: string; icon: string; type: number }[] = [
    {
      text: 'Chi tiết',
      icon: 'fas fa-info',
      type: STATUS_ACTION.detail,
    },
    {
      text: 'Sửa',
      icon: 'fas fa-pen',
      type: STATUS_ACTION.edit,
    },
    {
      text: 'Xóa',
      icon: 'fas fa-trash-alt',
      type: STATUS_ACTION.delete,
    },
  ];
