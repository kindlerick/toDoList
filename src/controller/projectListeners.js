import { saveProjectToStorage, loadProjectFromStorage } from "../model/storage.js";
import * as dom from "../utils/domHelpers.js";


export function projectEditTitleListener(projectInput) {

    projectInput.addEventListener('click', (e) => {

        e.stopPropagation();
    });

    projectInput.addEventListener('keydown', (e) => {

        if (e.key == "Enter") {
            e.preventDefault();
            projectInput.blur();
        }
    });

    const projectTitleElement = dom.getProjectTitle();

    const project = loadProjectFromStorage();

    if (project) {
        projectTitleElement.textContent = project.title;
        console.log("The project title is" + project.title);
    }
    
}

export function createSaveAllButtonListener(saveAllButton, currentProject) {

    const projectInput = document.getElementById("projectInput");

    saveAllButton.addEventListener('click', () => {

        const newTitle = projectInput.innerText.trim();
        currentProject.title = newTitle;

        saveProjectToStorage(currentProject);
    });
}
