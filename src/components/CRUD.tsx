import { useState, useEffect } from 'react'

interface Notes {
    id: string;
    content: string;
}

export default function CRUD() {
    const [notes, setNotes] = useState<Notes[]>([]);
    const [content, setContent] = useState('');

    const AddNote = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
            fetch('http://localhost:7070/notes', {
                method: 'POST',
                body: JSON.stringify({
                    content: content,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then((note) => {
                    setNotes((notes) => [note, ...notes]);
                    setContent('');
                });
        };

    const deleteNote = (id) => {
        fetch('http://localhost:7070/notes/:id', {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(() => {
                setNotes(notes => {
                    return notes.filter(item => item.id !== id)
                })
            })
    }

    useEffect(() => {
        fetch('http://localhost:7070/notes')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setNotes(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const ListNotes = notes.map((post) => {
        return (
            <div key={post.id}>
                <p>{post.content}</p>
                <button onChange={() => deleteNote(post.id)}>
                    x
                </button>
            </div>
        );
    })

    return (
        <>
            <div>
                <h2>NOTES</h2>
                <button >Обновить</button>
                {ListNotes}
                    <form onSubmit={AddNote} className='NewNote'>
                            <textarea cols={10} rows={8} onChange={event => setContent(event.target.value)}></textarea>
                            <button type="submit" className='AddNote' >
                                <div className='arrow'></div>
                            </button>
                    </form>
            </div>
        </>
    );
};

