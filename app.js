const addBtn = document.querySelector("#add-btn");
const cardContainer = document.querySelector("#card-container");

addBtn.addEventListener("click", function () {
  addNote();
});

const saveNotes = () => {
  const notes = document.querySelectorAll(".note-card textarea");
  const data = [];
  notes.forEach((note) => data.push(note.value));
  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

const addNote = (text = "") => {
  const newNote = document.createElement("div");
  newNote.classList.add("note-card");
  newNote.innerHTML = `
    
    <div class="toolbar">
        <i class="fa-regular fa-floppy-disk icons save"></i>
        <i class="fa-solid fa-trash-can icons delete"></i>
    </div>
    <textarea>
    ${text}
    </textarea>

`;
  newNote.querySelector(".delete").addEventListener("click", function () {
    newNote.remove();
    saveNotes();
  });

  newNote.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });

  newNote.querySelector("textarea").addEventListener("focusout", function () {
    saveNotes();
  });

  cardContainer.appendChild(newNote);
  saveNotes();
};

(function () {
  const lsnotes = JSON.parse(localStorage.getItem("notes"));

  if (lsnotes === null) {
    addNote();
  } else {
    lsnotes.forEach((lsnote) => {
      addNote(lsnote);
    });
  }
})();
