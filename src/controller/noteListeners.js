import { createNoteView, enableEditMode, disableEditMode, updateNoteStateView, shrinkProjectTable } from "../view/render.js";
import * as dom from "../utils/domHelpers.js";
import { saveProjectToStorage, removeNoteById} from "../model/storage.js";
import { Note } from "../model/note.js";


export function editButtonListener(editButton, note) {

    editButton.addEventListener('click', (e) => {
    
        if(note.expanded) {
            enableEditMode(editButton, note);
        } else {
            disableEditMode(editButton, note);
        }
        e.stopPropagation();
    });
}

export function addShowButtonListener(showButton, note, updateNoteStateView) {

    showButton.addEventListener("click", () => {

        note.toggleExpanded();
        updateNoteStateView(note);
        
    });
}

export function createNewNoteButtonListener(createNewButton, currentProject) {

    createNewButton.addEventListener('click', () => {

        const newNote = new Note();

        if (currentProject) {
            currentProject.addNote(newNote);
            saveProjectToStorage(currentProject);
            
        } else {
            console.error("Error: currentProject is not a valid Project instance or addNote method is missing.", currentProject);
            return;
        }

        const {
            noteContainer,
            showButton,
            editButton,
            saveButton,
            deleteButton,
            titleInput,
            descriptionInput,
            dueDateInput,
            priorityInput,
            completedInput
        } = createNoteView(newNote);

        const projectTable = dom.getProjectTable();
        projectTable.appendChild(noteContainer);


        addShowButtonListener(showButton, newNote, updateNoteStateView);
        editButtonListener(editButton, newNote, updateNoteStateView);
        addSaveButtonListener(saveButton, newNote, titleInput, descriptionInput, dueDateInput, priorityInput, currentProject);
        addDeleteButtonListener(deleteButton, noteContainer, newNote, currentProject);        


    });
}

export function addSaveButtonListener(saveButton, newNote, titleInput, descriptionInput, dueDateInput, priorityInput, currentProject) {

    saveButton.addEventListener('click', () => {

        const noteId = newNote.id;

        currentProject.editNote( {
            noteId: noteId,
            title: titleInput.innerHTML,
            description: descriptionInput.innerHTML,
            dueDate: dueDateInput.innerHTML,
            priority: priorityInput.inerHTML
        });

        saveProjectToStorage(currentProject);

    });
}

export function addDeleteButtonListener(deleteButton, noteContainer, note, currentProject) {

    const noteId = note.id;

    deleteButton.addEventListener('click', () => {

        shrinkProjectTable();

        removeNoteById(noteId, currentProject);

        noteContainer.remove();

        saveProjectToStorage(currentProject);

    });
}