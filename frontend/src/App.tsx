import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import Note from './components/Note';
import styles from "./styles/NotesPage.module.css";
import { Note as NoteModel } from './models/note';
import logo from './logo.svg';
import './App.css';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  useEffect(() => {
    async function loadNotes() {
        try {
            setShowNotesLoadingError(false);
            setNotesLoading(true);
            const res = await fetch("/api/notes", { method: "GET" })
            const notes = await res.json()            
            setNotes(notes);
        } catch (error) {
            console.error(error);
            setShowNotesLoadingError(true);
        } finally {
            setNotesLoading(false);
        }
    }
    loadNotes();
  }, []);

  {/*onNoteClicked={setNoteToEdit}
                    onDeleteNoteClicked={deleteNote}*/}
  const notesGrid =
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
        {notes.map(note => (
            <Col key={note._id}>
                <Note
                    note={note}
                    className={styles.note}
                    
                />
            </Col>
        ))}
    </Row>

  return (
    <div className="App">
      {!notesLoading && !showNotesLoadingError &&
          <>
              {notes.length > 0
                  ? notesGrid
                  : <p>You don't have any notes yet</p>
              }
          </>
      }
    </div>
  );
}

export default App;
