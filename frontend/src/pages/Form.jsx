import Nav from '../components/Nav'
import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { useForm } from 'react-hook-form';
import { taskSchema } from '../../utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { successModal, errorModal } from '../components/Form/submitModals';

function List() {
    const api = useApi();

    // Fetch categories for the category select dropdown
    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        try {
            const data = await api.get('/categories');
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    // Form handling with react-hook-form and zod
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(taskSchema),
    });
    const onSubmit = (data) => {
        api.post('/tasks', data)
            .then((response) => {
                successModal(response);
            })
            .catch((error) => {
                errorModal(error);
            });
    };

    return (
        <>
            <Nav />
            <div className="pt-20 pb-12 max-w-2xl mx-auto px-4">
                <div className="bg-white shadow-sm rounded-lg p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">➕ Tạo Task mới</h2>
                    <form id="taskForm" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề * (3-50 ký tự)</label>
                            <input id="title" type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Nhập tiêu đề task" {...register('title')} />
                            <p id="titleError" className="mt-1 text-sm text-red-600">{errors.title?.message}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ưu tiên *</label>
                            <select id="priority" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 cursor-pointer" {...register('priority')}>
                                <option value="">Chọn mức ưu tiên</option>
                                <option value="low">🟢 Thấp</option>
                                <option value="medium">🟡 Trung bình</option>
                                <option value="high">🔴 Cao</option>
                            </select>
                            <p id="priorityError" className="mt-1 text-sm text-red-600">{errors.priority?.message}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục *</label>
                            <select id="categoryId" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 cursor-pointer" {...register('categoryId')}>
                                <option value="">Chọn danh mục</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <p id="categoryIdError" className="mt-1 text-sm text-red-600">{errors.categoryId?.message}</p>
                        </div>
                        <button type="submit" id="submitBtn" className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 disabled:opacity-50 cursor-pointer">
                            ✅ Tạo Task mới
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default List;