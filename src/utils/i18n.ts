/**
 * Vietnamese language support constants
 */

export const vi = {
  common: {
    home: 'Trang Chủ',
    settings: 'Cài Đặt',
    welcome: 'Chào mừng',
    back: 'Quay lại',
  },
  screens: {
    home: {
      title: 'Trang Chủ',
      subtitle: 'Chào mừng bạn đến với ứng dụng',
    },
    settings: {
      title: 'Cài Đặt',
      subtitle: 'Tùy chỉnh ứng dụng của bạn',
    },
  },
  errors: {
    generic: 'Đã xảy ra lỗi',
    network: 'Lỗi kết nối mạng',
  },
};

export type Language = typeof vi;

export default vi;
