import Nav from '../components/Nav'
import Filter from '../components/List/Filter';
import Table from '../components/List/Table';
import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';

function List() {
    const api = useApi();
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(null);

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

    useEffect(() => {
        console.log('Selected categories changed:', selectedCategories);
    }, [selectedCategories]);

    return (
        <>
            <Nav />
            <div className  ="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Filter categories={categories} setSelectedCategories={setSelectedCategories} />
                <Table categories={categories} selectedCategories={selectedCategories} />
            </div>
        </>
    );
}

export default List;