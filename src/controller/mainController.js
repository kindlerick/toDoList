import { loadProjectFromStorage, saveProjectToStorage } from '../model/storage.js';
import { Project } from '../model/project.js';

import {
    generateInitialProjectView, 
    createNoteView,             
    updateNoteStateView,        
} from '../view/render.js';

import {
    projectEditTitleListener,
    createSaveAllButtonListener
} from '../controller/projectListeners.js';

import {
    createNewNoteButtonListener,
    addShowButtonListener,
    editButtonListener,
    addSaveButtonListener,
    addDeleteButtonListener,
} from '../controller/noteListeners.js';


import * as dom from "../utils/domHelpers.js";


let currentProject = null; 


export function initializeApp() {

    const loadedProjectData = loadProjectFromStorage();

    if (loadedProjectData) {
        currentProject = Project.fromPlainObject(loadedProjectData); 
    } else {
        currentProject = new Project({ title: "My Default Project" });
        saveProjectToStorage(currentProject);
        console.log("No project found, created a default project:", currentProject);
    }

    const {
        projectTable,
        projectTitleElement,
        createNewNoteButton,
        saveAllButton
    } = generateInitialProjectView();


    dom.getContainer().appendChild(projectTable);

    if (projectTitleElement) {
        projectEditTitleListener(projectTitleElement, currentProject);
    }
    if (createNewNoteButton) {
        createNewNoteButtonListener(createNewNoteButton, currentProject);
    }
    if (saveAllButton) {
        createSaveAllButtonListener(saveAllButton, currentProject);
    }

    currentProject.notes.forEach(note => {
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
        } = createNoteView(note);

        dom.getProjectTable().appendChild(noteContainer);

        addShowButtonListener(showButton, note, updateNoteStateView);
        editButtonListener(editButton, note, updateNoteStateView);
        addSaveButtonListener(saveButton, note, titleInput, descriptionInput, dueDateInput, priorityInput, currentProject);
        addDeleteButtonListener(deleteButton, noteContainer, note, currentProject);
    });

}