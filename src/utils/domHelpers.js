export function getContainer() {
    return document.getElementById('container');
}

export function getProjectTable() {
    return document.getElementById('projectTable');
}

export function getProjectTitle() {
    return document.getElementById("projectInput");
}

export function getButtonStrip() {
    return document.getElementById("buttonStrip");
}

export function getNewNoteButton() {
    return document.getElementById("createNote");
}

export function getNoteTableTop() {
    return document.getElementById('noteTabletop');
}

export function getNoteTableBottom() {
    return document.getElementById('noteTableBottom');
}

export function getNoteTableContent() {
    return document.getElementById('noteTableContent');
}

export function getNoteTable() {
    return document.getElementById('noteTable');
}

export function createProjectTable() {
    const projectTable = createDivElement();
    projectTable.id = "projectTable";
    return projectTable;
}

export function createNoteTable() {
    const noteTable = createDivElement();
    noteTable.id = "noteTable";
    return noteTable;
}

export function createDivElement() {
    return document.createElement('div');

}