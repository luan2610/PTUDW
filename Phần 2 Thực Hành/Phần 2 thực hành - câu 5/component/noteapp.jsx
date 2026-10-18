import { useState, useEffect } from 'react';

function NoteApp() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Lấy danh sách ghi chú khi component render lần đầu
    useEffect(() => {
        fetch('/api/notes')
            .then(res => res.json())
            .then(data => setNotes(data))
            .catch(err => console.log(err));
    }, []);

    // Thêm ghi chú mới
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });

            if (!res.ok) throw new Error('Không thể thêm ghi chú');

            const newNote = await res.json();

            // Cập nhật giao diện ngay, không reload trang
            setNotes(prevNotes => [newNote, ...prevNotes]);

            setTitle('');
            setContent('');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Quản lý ghi chú</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tiêu đề"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Nội dung"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />

                <button type="submit">Thêm Ghi Chú</button>
            </form>

            <ul>
                {notes.map(note => (
                    <li key={note._id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NoteApp;