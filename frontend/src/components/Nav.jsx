import { useNavigate } from "react-router-dom";

function Nav() {
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-2xl font-bold text-gray-900">📝 TODO Management</h1>
                    <div className="flex space-x-3">
                        <a onClick={() => navigate('/')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm cursor-pointer">
                            📋 Danh sách Tasks
                        </a>
                        <a onClick={() => navigate('/form')} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-sm cursor-pointer">
                            ➕ Tạo Task mới
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;