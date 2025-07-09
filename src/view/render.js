import * as dom from "../utils/domHelpers.js";

export const elementsMap = new Map();

export function disableButton(button) {

    button.disabled = true;
    button.style.color = "#cecece";
}

export function enableButton(button) {

    button.disabled = false;
    button.style.color = "white";
}

export function getIsNoteExpanded(note) {
    return note.expanded;
}

export function enableEditMode(editButton, note) {

    const noteId = note.id;
    console.log("edit Mode is enabled");

    const elements = elementsMap.get(noteId);
    if(!elements) {
        console.warn(`No elements found for note ${noteId} in enableEditMode`);
        return;
    }

    elements.titleInput.contentEditable = true;
    elements.descriptionInput.contentEditable = true;
    elements.dueDateInput.contentEditable = true;
    elements.priorityInput.contentEditable = true;

    disableButton(editButton);

}

export function disableEditMode(editButton, note) {

    const noteId = note.id;
    console.log("edit Mode is disabled");

    const elements = elementsMap.get(noteId);
    if (!elements) {
        console.warn(`No elements found for note ${noteId} in disableEditMode`);
        return;
    }

    elements.titleInput.contentEditable = false;
    elements.descriptionInput.contentEditable = false;
    elements.dueDateInput.contentEditable = false;
    elements.priorityInput.contentEditable = false;

    enableButton(editButton);
}

export function updateNoteStateView(note) {

    const isNoteExpanded = note.expanded;
    const currentNoteId = note.id;
    const elements = elementsMap.get(currentNoteId);

    if (!elements) {
        console.warn(`No elements found for note ${currentNoteId}`);
        return;
    }

    const { saveButton, editButton } = elements;

    if (isNoteExpanded) {
        enableButton(saveButton);
        enableButton(editButton);
        renderExpandedNoteView(elements);
    } else {
        disableButton(editButton);
        disableButton(saveButton);
        renderHiddenNoteView(elements);
    }
}


export function createProjectTitleElement() {

    const projectTitle = document.createElement('div');
    projectTitle.classList.add("projectInput");
    projectTitle.id = "projectInput";
    projectTitle.contentEditable = true;

    return projectTitle;
}
    
export const createNewNoteButtonElement = () => {

    const button = document.createElement('button');
    button.id = "createNote";
    button.textContent = "Add New Note";

    return button;
}

export const createButtonStripElement = () => {

    const buttonStrip = document.createElement('div');
    buttonStrip.id = "buttonStrip";

    return buttonStrip;
}

export const createNewProjectButtonElement = () => {

    const button = document.createElement('button');
    button.classList.add("createProject");
    button.textContent = "Create New Project";
    button.id = "createNewProjectButton";

    return button;
}

const createSaveAllButtonElement = () => {

    const button = document.createElement('button');
    button.id = "projectSaveButton";
    button.classList.add("projectSaveButton");
    button.textContent = "Save Title";

    return button;
}


export const expandProjectTable = () => {
    
    let currentHeight = parseInt(projectTable.style.height) || 20;

    let additionalHeight = 30;

    projectTable.style.height = `${currentHeight + additionalHeight}vh`;

}

export const shrinkProjectTable = () => {

    let currentHeight = parseInt(projectTable.style.height) || 20;

    let additionalHeight = 30;

    projectTable.style.height = `${currentHeight - additionalHeight}vh`;
}



export function generateInitialProjectView() {
    
    const projectTable = dom.createProjectTable();

    const projectTitleElt = createProjectTitleElement();
    const buttonStripEl = createButtonStripElement(); 
    const createNewNoteBtnEl = createNewNoteButtonElement(); 
    const saveAllBtnEl = createSaveAllButtonElement();

    projectTable.appendChild(projectTitleElt);

    buttonStripEl.appendChild(createNewNoteBtnEl);
    buttonStripEl.appendChild(saveAllBtnEl);

    projectTable.appendChild(buttonStripEl);


    return {
        projectTable: projectTable,
        projectTitleElement: projectTitleElt,
        createNewNoteButton: createNewNoteBtnEl,
        saveAllButton: saveAllBtnEl
    }
};


function renderExpandedNoteView(elements) {

    const {
        note, noteTable, noteTableTop, noteTableContent, noteTableBottom, buttonContainer,
        titleInput, deleteButton, showButton, editButton, saveButton,
        descriptionInput, dueDateInput, priorityInput,
        noteContainer, projectTable
    } = elements;

    noteTable.innerHTML = "";

    noteTableTop.append(titleInput, deleteButton);
    buttonContainer.append(showButton, editButton, saveButton );
    noteTableContent.appendChild(descriptionInput);
    noteTableBottom.append(dueDateInput, priorityInput);

    noteTable.append(noteTableTop, noteTableContent, noteTableBottom);
    noteContainer.appendChild(noteTable);
    noteContainer.appendChild(buttonContainer);

    const currentProjectTable = dom.getProjectTable();

    const existing = document.getElementById(`noteContainer-${note.id}`);
    if (existing) {
        currentProjectTable.replaceChild(noteContainer, existing);
    } else {
        currentProjectTable.appendChild(noteContainer);
    }

    noteTable.style.height = '25vh';
    showButton.textContent = 'Hide';
}

function renderHiddenNoteView(elements) {

    const {
        note, noteTable, noteTableTop, noteTableContent, buttonContainer,
        titleInput, deleteButton, showButton, editButton, saveButton,
        descriptionInput, noteContainer, projectTable
    } = elements;

    noteTable.innerHTML = "";
    
    noteTableTop.append(titleInput, deleteButton);
    buttonContainer.append(showButton, editButton, saveButton);
    noteTableContent.appendChild(descriptionInput);

    noteTable.append(noteTableTop, noteTableContent);
    noteContainer.appendChild(noteTable);
    noteContainer.appendChild(buttonContainer);

    const currentProjectTable = dom.getProjectTable(); // Get the global project table

    const existing = document.getElementById(`noteContainer-${note.id}`);
    if (existing) {
        currentProjectTable.replaceChild(noteContainer, existing);
    } else {
        currentProjectTable.appendChild(noteContainer);
    }

    noteTable.style.height = '15vh';
    showButton.textContent = 'Show';
}


function createNoteElements(note) {

    expandProjectTable();

    const noteId = note.id;

    const elements = {
        noteId,
        note,
        noteTable: dom.createDivElement(),
        noteTableTop: dom.createDivElement(),
        noteTableContent: dom.createDivElement(),
        noteTableBottom: dom.createDivElement(),
        titleInput: dom.createDivElement(),
        descriptionInput: dom.createDivElement(),
        dueDateInput: dom.createDivElement(),
        priorityInput: dom.createDivElement(),
        showButton: document.createElement("button"),
        editButton: document.createElement("button"),
        completed: document.createElement("input"),
        saveButton: document.createElement("button"),
        deleteButton: document.createElement("button"),
        buttonContainer: document.createElement("div"),
        noteContainer: document.createElement("div"),
    };

       elements.noteTable.id = `noteTable-${noteId}`;
       elements.noteTable.classList.add("noteTable");
   
       elements.noteTableTop.id = `noteTableTop-${noteId}`;
       elements.noteTableTop.classList.add("noteTableTop");
   
       elements.noteTableContent.id = `noteTableContent-${noteId}`;
       elements.noteTableContent.classList.add("noteTableContent");
   
       elements.noteTableBottom.id = `noteTableBottom-${noteId}`;
       elements.noteTableBottom.classList.add("noteTableBottom");
   
       elements.titleInput.id = `titleInput-${noteId}`;
       elements.titleInput.textContent = note.title;
       elements.titleInput.classList.add("titleInput");
       elements.titleInput.contentEditable = false; // Default to not editable

       elements.descriptionInput.id = `descriptionInput-${noteId}`;
       elements.descriptionInput.textContent = note.description;
       elements.descriptionInput.classList.add("descriptionInput");
       elements.descriptionInput.contentEditable = false; // Default to not editable

       elements.dueDateInput.id = `duedateInput-${noteId}`;
       elements.dueDateInput.textContent = note.dueDate;
       elements.dueDateInput.classList.add("dueDateInput");
       elements.dueDateInput.contentEditable = false; // Default to not editable

       elements.priorityInput.id = `priorityInput-${noteId}`;
       elements.priorityInput.textContent = note.priority;
       elements.priorityInput.classList.add("priorityInput");
       elements.priorityInput.contentEditable = false; // Default to not editable

       elements.showButton.id = `showButton-${noteId}`;
       elements.showButton.textContent = "Hide";
       elements.showButton.classList.add("showButton");
   
       elements.editButton.id = `editButton-${noteId}`;
       elements.editButton.textContent = "Edit";
       elements.editButton.classList.add("editButton");
   
       elements.completed.type = "checkbox";
       elements.completed.id = `completedInput-${noteId}`;
       elements.completed.classList.add("completedInput");
       elements.completed.checked = note.completed;
   
       elements.saveButton.id = `saveButton-${noteId}`;
       elements.saveButton.textContent = "Save";
       elements.saveButton.classList.add("saveButton");
   
       elements.deleteButton.id = `deleteButton-${noteId}`;
       elements.deleteButton.textContent = "Delete";
       elements.deleteButton.classList.add("deleteButton");
   
       elements.buttonContainer.id = `buttonContainer-${noteId}`;
       elements.buttonContainer.classList.add("buttonContainer");
   
       elements.noteContainer.id = `noteContainer-${noteId}`;
       elements.noteContainer.classList.add("noteContainer");
   
       return elements;
}

export function createNoteView(note) {

    const elements = createNoteElements(note);
    elementsMap.set(note.id, elements); // Store by note.id

    updateNoteStateView(note);

    return {
        noteContainer: elements.noteContainer,
        showButton: elements.showButton,
        editButton: elements.editButton,
        saveButton: elements.saveButton,
        deleteButton: elements.deleteButton,
        titleInput: elements.titleInput,
        descriptionInput: elements.descriptionInput,
        dueDateInput: elements.dueDateInput,
        priorityInput: elements.priorityInput
    }
}

