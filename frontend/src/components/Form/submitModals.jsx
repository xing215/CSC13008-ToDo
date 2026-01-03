import Swal from 'sweetalert2'

export const successModal = (task) => {
    const priorityMap = {
        high: '🔴 Cao',
        medium: '🟡 Trung bình',
        low: '🟢 Thấp'
    };

    const formattedDate = new Date(task.createdAt).toLocaleString('vi-VN');

    Swal.fire({
        icon: 'success',
        title: 'Tạo task thành công',
        html: `
            <div class="text-left">
                <p class="mb-2"><strong>Task đã được tạo thành công!</strong></p>
                <ul class="mt-4 space-y-2 text-sm">
                    <li><strong>ID:</strong> ${task.id}</li>
                    <li><strong>Tiêu đề:</strong> ${task.title}</li>
                    <li><strong>Trạng thái:</strong> ${task.completed ? '✅ Hoàn thành' : '⭕ Chưa hoàn thành'}</li>
                    <li><strong>Ưu tiên:</strong> ${priorityMap[task.priority]}</li>
                    <li><strong>Danh mục ID:</strong> ${task.categoryId}</li>
                    <li><strong>Ngày tạo:</strong> ${formattedDate}</li>
                </ul>
            </div>
        `,
        confirmButtonColor: '#22c55e',
    })
}

export const errorModal = (error) => {
    let content;

    if (error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
        const errorList = error.errors
            .map(err => `<li class="mb-1"><strong>${err.field}:</strong> ${err.message}</li>`)
            .join('');
        
        content = `
            <div class="text-left">
                <ul class="list-disc list-inside text-sm space-y-1">
                    ${errorList}
                </ul>
            </div>
        `;
    } else {
        // Handle other types of errors (network errors, server errors, etc.)
        const message = error.message || error.toString() || 'Đã xảy ra lỗi không xác định';
        content = message;
    }

    Swal.fire({
        icon: 'error',
        title: 'Lỗi khi tạo task',
        html: content,
        confirmButtonColor: '#ef4444',
    })
}