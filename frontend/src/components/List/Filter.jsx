function Filter({ categories, setSelectedCategories }) {
    function handleFilterClick() {
        const select = document.getElementById('categoryFilter');
        const selectedCategoryId = Number(select.value);
        setSelectedCategories(selectedCategoryId ? selectedCategoryId : null);
    }

    return (
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🔍 Bộ lọc Tasks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                    <select id="categoryFilter" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Tất cả danh mục (3)</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-end">
                    <button id="filterBtn" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium" onClick={handleFilterClick}>
                        🔍 Lọc kết quả
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filter;