
export class Note {
    constructor(options = {} ) {
        this.id = options.id || crypto.randomUUID();
        this.title = options.title || "Default Title";
        this.description = options.description || "Default Description";
        this.dueDate = options.dueDate || "Default DueDate";
        this.priority = options.priority || "Default Priority";
        this.completed = false;
        this._expanded = options.expanded ?? true;
    }

    get expanded() {
        return this._expanded;
    }

    set expanded(value) {
        if (typeof value !== "boolean") {
            throw new TypeError("Expanded state must be a boolean.");
        }
        this._expanded = value;
    }

    toggleExpanded() {
        this._expanded = !this._expanded;
    }

    displayNote() {
        console.log(`${this.id}\n${this.title}\n${this.description}\n${this.dueDate}\n${this.priority}\n${this.completed}\n`);
    }

    // ⭐ THIS IS THE METHOD THAT Project.fromPlainObject IS LOOKING FOR ⭐
    /**
     * Creates a Note instance from a plain JavaScript object.
     * @param {Object} plainObject - The plain object representing a note.
     * @returns {Note} A new Note instance.
     */
    static fromPlainObject(plainObject) {
        
        return new Note(plainObject);
    }
}
