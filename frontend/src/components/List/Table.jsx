import { useEffect, useState } from 'react';
import { useApi } from '../../contexts/ApiContext';

const ITEMS_PER_PAGE = 10;

function Table( { categories, selectedCategories } ) {
    const api = useApi();
    const [page, setPage] = useState(1);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState({
        page: undefined,
        limit: undefined,
        totalItems: undefined,
        totalPages: undefined,
    });
    const [range, setRange] = useState({
        start: undefined,
        end: undefined,
    });

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: ITEMS_PER_PAGE,
            };
            if (selectedCategories) {
                params.categoryId = selectedCategories;
            }

            const result = await api.get('/tasks', params);
            
            setTasks(result.data);
            setMeta(result.meta);
            
            const start = (result.meta.page - 1) * result.meta.limit + 1;
            const end = Math.min(start + result.meta.limit - 1, result.meta.totalItems);
            setRange({ start, end });
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [selectedCategories, page]);

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < meta.totalPages) {
            setPage(page + 1);
        }
    };

    const handleGoToPage = (pageNum) => {
        setPage(pageNum);
    };

    const renderPageNumbers = () => {
        const pages = [];
        const totalPages = meta.totalPages || 0;
        const currentPage = meta.page || 1;

        if (totalPages <= 5) {
            // Show all pages if 5 or fewer
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <span
                        key={i}
                        onClick={() => handleGoToPage(i)}
                        className={`cursor-pointer px-3 py-2 rounded-lg ${
                            i === currentPage
                                ? 'bg-blue-600 text-white font-bold'
                                : 'bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {i}
                    </span>
                );
            }
        } else {
            // Show first page
            pages.push(
                <span
                    key={1}
                    onClick={() => handleGoToPage(1)}
                    className={`cursor-pointer px-3 py-2 rounded-lg ${
                        1 === currentPage
                            ? 'bg-blue-600 text-white font-bold'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    1
                </span>
            );

            // Show ellipsis if needed
            if (currentPage > 3) {
                pages.push(<span key="ellipsis1" className="text-gray-500">...</span>);
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(
                    <span
                        key={i}
                        onClick={() => handleGoToPage(i)}
                        className={`cursor-pointer px-3 py-2 rounded-lg ${
                            i === currentPage
                                ? 'bg-blue-600 text-white font-bold'
                                : 'bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {i}
                    </span>
                );
            }

            // Show ellipsis if needed
            if (currentPage < totalPages - 2) {
                pages.push(<span key="ellipsis2" className="text-gray-500">...</span>);
            }

            // Show last page
            pages.push(
                <span
                    key={totalPages}
                    onClick={() => handleGoToPage(totalPages)}
                    className={`cursor-pointer px-3 py-2 rounded-lg ${
                        totalPages === currentPage
                            ? 'bg-blue-600 text-white font-bold'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    {totalPages}
                </span>
            );
        }

        return pages;
    };

    return (
        <div id="tasksTable" className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ưu tiên</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody id="tasksBody" className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                                        <p className="text-gray-500">Đang tải dữ liệu...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : tasks.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                    Không có task nào
                                </td>
                            </tr>
                        ) : (
                            tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={task.title}>{task.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {task.completed ? '✅ Hoàn thành' : '⭕ Chưa hoàn thành'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-green-100 text-green-800'
                                    }`}>
                                        {task.priority === 'high' ? '🔴 Cao' : task.priority === 'medium' ? '🟡 Trung bình' : '🟢 Thấp'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                        {categories.find(category => category.id === task.categoryId)?.name || 'Không xác định'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(task.createdAt).toLocaleString('vi-VN')}
                                </td>
                            </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
                <div className="text-sm text-gray-700">Hiển thị {range.start}-{range.end} của {meta.totalItems} tasks (Trang {meta.page}/{meta.totalPages})</div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className={`px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm ${
                            page === 1
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-gray-50 cursor-pointer'
                        }`}
                    >
                        ← Trước
                    </button>
                    <span className="flex space-x-1 px-3 py-2 text-sm font-medium">
                        {renderPageNumbers()}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={page === meta.totalPages}
                        className={`px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm ${
                            page === meta.totalPages
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-gray-50 cursor-pointer'
                        }`}
                    >
                        Sau →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Table;