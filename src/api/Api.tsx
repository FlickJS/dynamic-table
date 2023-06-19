import axios from 'axios';

export const fetchData = async () => {
    try {
        const response = await axios.get(
            'https://www.googleapis.com/books/v1/volumes?q=react'
        );

        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText} - Status: ${response.status}`);
        }

        return response.data.items.map((bookData: any) => ({
            id: bookData.id,
            title: bookData.volumeInfo.title,
            authors: bookData.volumeInfo.authors.join(', '),
        }));
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};