# 📦 ORDER MANAGEMENT SYSTEM - BACKEND

Hệ thống quản lý đơn hàng được cải thiện với đầy đủ tính năng cho việc xem và chuyển trạng thái đơn hàng.

## 🚀 Tính năng mới đã thêm

### 1. 📊 **Quản lý trạng thái đơn hàng**

-   ✅ Chuyển trạng thái theo luồng logic
-   ✅ Validation chuyển trạng thái hợp lệ
-   ✅ Tự động hoàn lại số lượng sản phẩm khi hủy đơn
-   ✅ Logging mọi thay đổi trạng thái

### 2. 🔍 **Xem và tìm kiếm đơn hàng**

-   ✅ Lấy đơn hàng theo ID, mã đơn hàng
-   ✅ Tìm kiếm đơn hàng theo từ khóa
-   ✅ Lọc đơn hàng theo trạng thái, ngày tháng
-   ✅ Phân trang kết quả

### 3. 📈 **Thống kê và báo cáo**

-   ✅ Thống kê đơn hàng theo trạng thái
-   ✅ Doanh thu theo ngày/tháng
-   ✅ Top sản phẩm bán chạy
-   ✅ Xuất báo cáo CSV/JSON

### 4. 🔄 **Cập nhật hàng loạt**

-   ✅ Cập nhật trạng thái nhiều đơn hàng cùng lúc
-   ✅ Cập nhật thông tin giao hàng
-   ✅ Cập nhật thông tin thanh toán

### 5. 📝 **Logging và tracking**

-   ✅ Log tất cả hoạt động đơn hàng
-   ✅ Lịch sử thay đổi trạng thái
-   ✅ Tracking user actions

## 🛠 API Endpoints

### 🔐 Public Endpoints

```
GET /api/v1/orders/code/:orderCode    # Lấy đơn hàng theo mã
```

### 🔑 User Endpoints (Cần authentication)

```
GET /api/v1/orders/my-orders          # Đơn hàng của tôi
GET /api/v1/orders/search             # Tìm kiếm đơn hàng
GET /api/v1/orders/stats              # Thống kê đơn hàng
GET /api/v1/orders/:orderId           # Chi tiết đơn hàng
GET /api/v1/orders/:orderId/history   # Lịch sử trạng thái
POST /api/v1/orders                   # Tạo đơn hàng mới
```

### 👑 Admin Endpoints (Cần quyền admin)

```
GET /api/v1/orders                    # Tất cả đơn hàng
GET /api/v1/orders/export             # Xuất dữ liệu
GET /api/v1/orders/report             # Tạo báo cáo
PUT /api/v1/orders/:orderId/status    # Cập nhật trạng thái
PUT /api/v1/orders/:orderId/delivery  # Cập nhật giao hàng
PUT /api/v1/orders/:orderId/payment   # Cập nhật thanh toán
PUT /api/v1/orders/bulk/status        # Cập nhật hàng loạt
GET /api/v1/orders/user/:userId       # Đơn hàng theo user
```

## 📋 Luồng trạng thái đơn hàng

```
pending → confirmed → processing → shipped → delivered
    ↓         ↓           ↓
cancelled  cancelled  cancelled

delivered → refunded
```

### Ý nghĩa các trạng thái:

-   **pending**: Chờ xác nhận
-   **confirmed**: Đã xác nhận
-   **processing**: Đang xử lý
-   **shipped**: Đã gửi hàng
-   **delivered**: Đã giao hàng
-   **cancelled**: Đã hủy
-   **refunded**: Đã hoàn tiền

## 📝 Ví dụ sử dụng

### 1. Cập nhật trạng thái đơn hàng

```javascript
PUT /api/v1/orders/507f1f77bcf86cd799439013/status
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "status": "confirmed",
  "note": "Đơn hàng đã được xác nhận bởi admin"
}
```

### 2. Tìm kiếm đơn hàng

```javascript
GET /api/v1/orders/search?q=ORD-20250803&limit=10&skip=0
Authorization: Bearer {token}
```

### 3. Cập nhật thông tin giao hàng

```javascript
PUT /api/v1/orders/507f1f77bcf86cd799439013/delivery
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "tracking_number": "VN123456789",
  "estimated_delivery_date": "2025-08-06T10:00:00.000Z",
  "delivery_fee": 30000,
  "notes": "Giao hàng trong 3 ngày"
}
```

### 4. Cập nhật hàng loạt

```javascript
PUT /api/v1/orders/bulk/status
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "order_ids": ["507f1f77bcf86cd799439013", "507f1f77bcf86cd799439014"],
  "status": "processing",
  "note": "Xử lý hàng loạt"
}
```

### 5. Xuất báo cáo

```javascript
GET /api/v1/orders/export?format=csv&start_date=2025-08-01&end_date=2025-08-31&status=delivered
Authorization: Bearer {admin_token}
```

## 🔧 Test API

Chạy script test để kiểm tra các endpoint:

```bash
# Xem documentation
node test_order_apis.js docs

# Chạy test (cần cập nhật token và IDs)
node test_order_apis.js test
```

## 📁 Cấu trúc thêm mới

```
backend/src/
├── controllers/order.controller.js      # ✨ Cải thiện với nhiều method mới
├── services/order.service.js            # ✨ Logic business mở rộng
├── middlewares/orderLogger.js           # 🆕 Logging middleware
├── utils/orderExport.js                 # 🆕 Export utility
├── routers/order/index.js               # ✨ Routes mở rộng
└── logs/                                # 🆕 Log files
    ├── order-status-YYYY-MM-DD.log
    ├── order-creation-YYYY-MM-DD.log
    └── order-activity-YYYY-MM-DD.log
```

## 🚀 Deployment Notes

1. **Environment Variables**:

    ```
    NODE_ENV=production
    ```

2. **Log Rotation**: Setup log rotation cho production

    ```bash
    # Crontab example - clean logs older than 30 days
    0 0 * * * find /path/to/logs -name "*.log" -mtime +30 -delete
    ```

3. **Backup**: Đảm bảo backup logs và exports folder

## 🔒 Security

-   ✅ Authentication required cho user endpoints
-   ✅ Admin role required cho sensitive operations
-   ✅ Input validation và sanitization
-   ✅ Rate limiting recommended
-   ✅ Request logging để audit

## 📊 Performance

-   ✅ Database indexes đã optimize
-   ✅ Aggregation queries cho reports
-   ✅ Pagination cho large datasets
-   ✅ Lean queries để giảm memory usage

## 🐛 Troubleshooting

### Common Issues:

1. **"Không thể chuyển trạng thái"**

    - Kiểm tra luồng trạng thái hợp lệ
    - Đảm bảo đơn hàng tồn tại

2. **"Export file không tạo được"**

    - Kiểm tra quyền write cho exports folder
    - Đảm bảo có đủ disk space

3. **"Logging không hoạt động"**
    - Kiểm tra logs folder permissions
    - Verify middleware order trong router

## 📞 Support

Nếu có vấn đề, kiểm tra:

1. API documentation trong `test_order_apis.js`
2. Log files trong `/logs` folder
3. Database indexes và performance
4. Authentication và authorization

---

🎉 **Hệ thống order management đã sẵn sàng với đầy đủ tính năng xem và chuyển trạng thái!**
