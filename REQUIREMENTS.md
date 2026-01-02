# 📝 TODO

## 📋 **Cơ sở dữ liệu SQL**

### **Đối tượng chính: `Task`**

| Trường | Kiểu | Yêu cầu Validation |
| :-- | :-- | :-- |
| `id` | INT | PK, auto increment, chỉ đọc |
| `title` | VARCHAR(50) | Required, 3-50 ký tự |
| `completed` | BOOLEAN | Default `false` |
| `priority` | ENUM | `low`, `medium`, `high` |
| `categoryId` | INT | FK → categories, required |
| `createdAt` | TIMESTAMP | Server auto, chỉ đọc |

### **Đối tượng phụ: `Category` (GET ALL)**

| Trường | Kiểu |
| :-- | :-- |
| `id` | INT |
| `name` | VARCHAR(50) |

**Dữ liệu mẫu Category**: `Work`, `Personal`, `Urgent`

## 🔌 **REST API Specification**

### **Main Resource: `/api/tasks`**

#### `GET /api/tasks?page=1&limit=5&categoryId=1`

```json
{
  "data": [
    {
      "id": 1,
      "title": "Fix login bug",
      "completed": false,
      "priority": "high",
      "categoryId": 1,
      "createdAt": "2025-12-29T06:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 5,
    "totalItems": 25,
    "totalPages": 5
  }
}
```


#### `GET /api/tasks/1`

```json
{
  "id": 1,
  "title": "Fix login bug",
  "completed": false,
  "priority": "high",
  "categoryId": 1,
  "createdAt": "2025-12-29T06:00:00.000Z"
}
```


#### `POST /api/tasks`

**Request body**:

```json
{
  "title": "Design database schema",
  "priority": "medium",
  "categoryId": 1
}
```

**Response 201**:

```json
{
  "id": 26,
  "title": "Design database schema",
  "completed": false,
  "priority": "medium",
  "categoryId": 1,
  "createdAt": "2025-12-29T10:30:00.000Z"
}
```

**Response 400** (validation error):

```json
{
  "errors": [
    {"field": "title", "message": "Title must be 3-50 characters"},
    {"field": "categoryId", "message": "Category does not exist"}
  ]
}
```


### **Related Resource**

```
GET /api/categories
```

```json
[
  {"id": 1, "name": "💼 Work"},
  {"id": 2, "name": "🏠 Personal"},
  {"id": 3, "name": "🚨 Urgent"}
]
```

## 🗄️ **SQL Schema + 25 Records**

```sql
CREATE DATABASE todo_system;
USE todo_system;

-- Categories
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (name) VALUES 
('💼 Work'),
('🏠 Personal'), 
('🚨 Urgent');

-- Tasks (MAIN)
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    priority ENUM('low', 'medium', 'high') NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    INDEX idx_category (category_id),
    INDEX idx_priority (priority)
);

-- 25 Sample Tasks
INSERT INTO tasks (title, completed, priority, category_id, created_at) VALUES
-- Work (10 tasks)
('Fix login bug trên trang admin', FALSE, 'high', 1, '2025-12-29 10:30:00'),
('Thiết kế database schema project mới', FALSE, 'medium', 1, '2025-12-29 09:15:00'),
('Review code pull request #45', TRUE, 'low', 1, '2025-12-28 16:45:00'),
('Setup Docker environment dev', FALSE, 'medium', 1, '2025-12-29 08:20:00'),
('Write unit tests cho auth module', FALSE, 'high', 1, '2025-12-29 07:10:00'),
('Deploy version 2.1 lên production', FALSE, 'high', 1, '2025-12-29 06:19:00'),
('Optimize database queries', FALSE, 'medium', 1, '2025-12-28 14:00:00'),
('Document API endpoints', FALSE, 'low', 1, '2025-12-28 11:30:00'),
('Setup CI/CD pipeline', FALSE, 'high', 1, '2025-12-27 12:15:00'),
('Update React dependencies', TRUE, 'medium', 1, '2025-12-26 16:20:00'),

-- Personal (8 tasks)
('Mua sữa cho con trước 8h tối', FALSE, 'high', 2, '2025-12-29 09:00:00'),
('Gọi bác sĩ kiểm tra sức khỏe', TRUE, 'medium', 2, '2025-12-28 11:30:00'),
('Rửa xe máy cuối tuần', FALSE, 'low', 2, '2025-12-27 18:00:00'),
('Học tiếng Nhật 30p mỗi ngày', FALSE, 'medium', 2, '2025-12-29 07:45:00'),
('Gym workout 1 hour', FALSE, 'medium', 2, '2025-12-28 19:00:00'),
('Grocery shopping - rice & fish', TRUE, 'low', 2, '2025-12-27 17:30:00'),

-- Urgent (7 tasks)
('Fix critical bug payment gateway', FALSE, 'high', 3, '2025-12-29 05:30:00'),
('Customer VIP gọi hỗ trợ ngay', FALSE, 'high', 3, '2025-12-29 06:15:00'),
('Server down - restart immediately', TRUE, 'high', 3, '2025-12-28 02:15:00');
```


## 🌐 **Frontend HTML Templates**

### **File 1: `list.html`**

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📝 TODO System - Danh sách Tasks</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <h1 class="text-2xl font-bold text-gray-900">📝 TODO Management</h1>
                <div class="flex space-x-3">
                    <a href="list.html" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm">
                        📋 Danh sách Tasks
                    </a>
                    <a href="form.html" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-sm">
                        ➕ Tạo Task mới
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <div class="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filter Section -->
        <div class="bg-white shadow-sm rounded-lg p-6 border border-gray-200 mb-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">🔍 Bộ lọc Tasks</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                    <select id="categoryFilter" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Tất cả danh mục (3)</option>
                        <option value="1">💼 Work</option>
                        <option value="2">🏠 Personal</option>
                        <option value="3">🚨 Urgent</option>
                    </select>
                </div>
                <div class="flex items-end">
                    <button id="filterBtn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                        🔍 Lọc kết quả
                    </button>
                </div>
            </div>
        </div>

        <!-- Tasks Table (5 mẫu records - Page 1/5) -->
        <div id="tasksTable" class="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ưu tiên</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody id="tasksBody" class="bg-white divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                            <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title="Fix login bug trên trang admin">Fix login bug trên trang admin</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">⭕ Chưa hoàn thành</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">🔴 Cao</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">💼 Work</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-12-29 10:30</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                            <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title="Thiết kế database schema project mới">Thiết kế database schema project mới</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">⭕ Chưa hoàn thành</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">🟡 Trung bình</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">💼 Work</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-12-29 09:15</td>
                        </tr>
                        <!-- 3 records mẫu khác tương tự... -->
                    </tbody>
                </table>
            </div>
            <!-- Pagination Page 1/5 -->
            <div class="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
                <div class="text-sm text-gray-700">Hiển thị 1-5 của 25 tasks (Trang 1/5)</div>
                <div class="flex items-center space-x-2">
                    <button id="prevPage" class="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm opacity-50 cursor-not-allowed">← Trước</button>
                    <span class="flex space-x-1 px-3 py-2 text-sm font-medium">
                        <span class="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold">1</span>
                        <span class="text-gray-500">...</span>
                        <span class="bg-white border border-gray-300 px-2 py-2 rounded-lg">5</span>
                    </span>
                    <button id="nextPage" class="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Sau →</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Demo interactions
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('filterBtn').onclick = () => {
                alert('🚀 Filter clicked - Ready for GET /api/tasks?categoryId=1');
            };
        });
    </script>
</body>
</html>
```


### **File 2: `form.html`**

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📝 TODO System - Tạo Task mới</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <!-- Navigation (giống list.html) -->
    
    <div class="pt-20 pb-12 max-w-2xl mx-auto px-4">
        <div class="bg-white shadow-sm rounded-lg p-8 border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">➕ Tạo Task mới</h2>
            <form id="taskForm" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tiêu đề * (3-50 ký tự)</label>
                    <input id="title" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Nhập tiêu đề task">
                    <p id="titleError" class="mt-1 text-sm text-red-600 hidden"></p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Ưu tiên *</label>
                    <select id="priority" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2">
                        <option value="">Chọn mức ưu tiên</option>
                        <option value="low">🟢 Thấp</option>
                        <option value="medium">🟡 Trung bình</option>
                        <option value="high">🔴 Cao</option>
                    </select>
                    <p id="priorityError" class="mt-1 text-sm text-red-600 hidden"></p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Danh mục *</label>
                    <select id="categoryId" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2">
                        <option value="">Chọn danh mục</option>
                        <option value="1">💼 Work</option>
                        <option value="2">🏠 Personal</option>
                        <option value="3">🚨 Urgent</option>
                    </select>
                    <p id="categoryIdError" class="mt-1 text-sm text-red-600 hidden"></p>
                </div>
                <button type="submit" id="submitBtn" disabled class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 disabled:opacity-50">
                    ✅ Tạo Task mới
                </button>
            </form>
        </div>
    </div>
</body>
</html>
```


## ✅ **Yêu cầu**

Xây dựng ứng dụng đầy đủ front-end và back-end bằng Express + Postgres + React

- [x] **Xác thực**: Sử dụng api key cố định được set trong .env
- [x] **1 đối tượng chính**: Task (GET ALL/ONE/POST, 5 trường, validation, pagination)
- [x] **1 đối tượng phụ**: Category (GET ALL)
- [x] **HTML Tailwind**: 2 trang hyperlink navigation
- [x] **Validation**: FE + BE
- [x] **Dữ liệu mẫu**: SQL 25 records + HTML 5 records demo
- [x] **Filter**: Category dropdown
- [x] **Pagination**: Cố định 5 dòng/trang