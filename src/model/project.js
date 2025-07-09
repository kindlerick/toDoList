    import { Note } from "./note.js"

    export class Project {

        constructor({ id, title } = {}) { 
            this.id = id || crypto.randomUUID();   
            this.title = title || "My Default Project";
            this.notes = [];
        }

        addNote(note) {
            this.notes.push(note);
        }

        editNote({ noteId, title, description, dueDate, priority }) {
            const note = this.notes.find(note => note.id === noteId);
            if (!note) {
                console.warn(`Note with ID ${noteId} not found.`);
                return null;
            }
            Object.assign(note, { title, description, dueDate, priority });
            return note;
    }

        /**
         * Creates a Project instance from a plain JavaScript object (e.g., loaded from localStorage)
         * @param {Object} plainObject - The plain object representing a project.
         * @returns {Project} A new Project instance.
         */
        
        static fromPlainObject(plainObject) {

            const project = new Project({
                id: plainObject.id,
                title: plainObject.title
            });
            
            project.notes = plainObject.notes.map(noteData => Note.fromPlainObject(noteData));
            return project;
        }
    }