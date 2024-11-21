import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import Note from './components/Note';
import * as NotesApi from "./network/notes.api"
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import { Note as NoteModel } from './models/note';
import AddEditNoteDialog from './components/AddEditNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
        try {
            setShowNotesLoadingError(false);
            setNotesLoading(true);
            
            const notes = await NotesApi.fetchNotes()
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
      <Button
          className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
          onClick={() => setShowAddNoteDialog(true)}>
          <FaPlus />
          Add new note
      </Button>
      {!notesLoading && !showNotesLoadingError &&
          <>
              {notes.length > 0
                  ? notesGrid
                  : <p>You don't have any notes yet</p>
              }
          </>
      }
      {
        showAddNoteDialog &&
          <AddEditNoteDialog
              onDismiss={() => setShowAddNoteDialog(false)}
              onNoteSaved={(newNote) => {
                  setNotes([...notes, newNote]);
                  setShowAddNoteDialog(false);
              }}
          />
      }
    </div>
  );
}

export default App;
