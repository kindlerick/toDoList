import { Project } from './project.js';
import { Note } from './note.js';

export function saveProjectToStorage(project) {

    if (!project) {
        console.error("Invalid project passed to saveProjectToStorage.");
        return;
    }

    const dataToSave = {
        id: project.id,
        title: project.title,
        notes: project.notes.map(note => ({
            id: note.id,
            title: note.title,
            description: note.description,
            dueDate: note.dueDate,
            priority: note.priority,
            completed: note.completed,
            expanded: note.expanded

        }))
    };

    localStorage.setItem('project', JSON.stringify(dataToSave));
}

export function loadProjectFromStorage() {
    const projectData = JSON.parse(localStorage.getItem('project'));
    
    if (!projectData) {
        console.error("No project data found in localStorage.");
        return null;
    }

    const project = new Project({ id: projectData.id, title: projectData.title });
    project.id = projectData.id;
    project.notes = projectData.notes.map(noteData => {
        const note = new Note(noteData);
        return note;
    });

    return project;
}


export function addNewNoteToProject(newNote) {

    const project = loadProjectFromStorage();

    if (!project || !project.notes) {
        console.error("No project found or project notes are missing.");
        return;
    }

    project.addNote(newNote);
}


export function removeNoteById(noteId, currentProject) {

    console.log("Loaded project:", currentProject);

    if (!currentProject || !currentProject.notes) {
        console.error("No project found or project notes are missing.");
        return;
    }

    const noteIndex = currentProject.notes.findIndex(note => note.id === noteId);

    if (noteIndex !== -1) {

        currentProject.notes.splice(noteIndex, 1);
        console.log(`Note with ID ${noteId} removed.`);

        saveProjectToStorage(currentProject);
    } else {
        console.error(`No note found with ID ${noteId}.`);
    }

} 
