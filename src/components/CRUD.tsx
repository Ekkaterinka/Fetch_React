import { useState, useEffect } from 'react'

interface Notes {
    id: string;
    content: string;
}

export default function CRUD() {
    const [notes, setNotes] = useState<Notes[]>([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch('http://localhost:7070/notes')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setNotes(data);
            })
    }, []);

    const AddNote = () => {
        if (content) {
            fetch('http://localhost:7070/notes', {
                method: 'POST',
                body: JSON.stringify({
                    content: content,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setNotes((notes) => [...notes, data]);
                    setContent('');
                });
        };
    }

    const deleteNote = (id) => {
        fetch(`http://localhost:7070/notes/${id}`, {
            method: "DELETE",
        })
            .then(response => response.text())
            .then(() => {
                setNotes(notes => {
                    return notes.filter(item => item.id !== id)
                })
            })
    }

    const ListNotes = notes.map((post) => {
        return (
            <div key={post.id}>
                <p>{post.content}</p>
                <button onClick={() => deleteNote(post.id)}>
                    x
                </button>
            </div>
        );
    })
    const UpNote = () => {
        fetch('http://localhost:7070/notes')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setNotes(data);
            })}

        return (
            <>
                <div>
                    <h2>NOTES</h2>
                    <button onClick={UpNote}>Обновить</button>
                    {ListNotes}
                    <form className='NewNote'>
                        <textarea cols={10} rows={8} value={content} onChange={event => setContent(event.target.value)}></textarea>
                        <button className='AddNote' onClick={AddNote} >
                            <div className='arrow'></div>
                        </button>
                    </form>
                </div>
            </>
        );
    };

