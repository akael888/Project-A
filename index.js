const localStorageNotesData = JSON.parse(
  localStorage.getItem("WEB_DIARY_NOTES"),
);

let defaultNotes = localStorageNotesData
  ? localStorageNotesData
  : [
      { notesID: 0, notesMsg: "ABC", notesTimeStamp: 1776085680 },
      { notesID: 1, notesMsg: "yes", notesTimeStamp: 1776085680 },
      { notesID: 2, notesMsg: "Test 1234", notesTimeStamp: 1776085680 },
    ];

const mainBoard = document.getElementById("main-board");

function updateDefaultNotes(e) {
  const newDiv = document.createElement("div");
  newDiv.className = "sticky-notes";
  newDiv.id = `${e.notesID}`;
  newDiv.textContent = e.notesMsg;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "deleteNote";
  deleteButton.style.display = "none";

  deleteButton.addEventListener("click", (e) => {
    parentDiv = deleteButton.closest("div");
    parentId = parentDiv.id;
    parentDiv.remove();

    const updatedData = defaultNotes.filter((data) => data.notesID != parentId);
    defaultNotes = updatedData;
    localStorage.setItem("WEB_DIARY_NOTES", JSON.stringify(updatedData));
  });

  newDiv.append(deleteButton);
  localStorage.setItem("WEB_DIARY_NOTES", JSON.stringify(defaultNotes));
  mainBoard.append(newDiv);
}

function addNewStickyNote() {
  if (postText.value) {
    const newStickyNote = {
      notesID: defaultNotes.length,
      notesMsg: postText.value,
      notesTimeStamp: 1776085680,
    };
    defaultNotes.push(newStickyNote);
    updateDefaultNotes(newStickyNote);
  }
}

defaultNotes.map((e) => {
  const newDiv = document.createElement("div");
  const newText = document.createElement("text");
  const newInput = document.createElement("input");
  const newNoteDiv = document.getElementById("new-note");

  newText.innerText = e.notesMsg;
  newInput.defaultValue = e.notesMsg;
  newInput.className = "sticky-input";
  newInput.style.display = "none";

  newDiv.appendChild(newInput);
  newDiv.appendChild(newText);

  newDiv.className = "sticky-notes";
  newDiv.id = `${e.notesID}`;

  newDiv.addEventListener("mouseenter", (e) => {
    newInput.style.display = "flex";
    newText.style.display = "none";
  });

  newDiv.addEventListener("mouseleave", (e) => {
    newInput.style.display = "none";
    newText.style.display = "flex";
  });

  newInput.addEventListener("input", (e) => {
    let inputValue = e.target.value;
    const changedNote = defaultNotes.find(
      (note) => note.notesID === Number(newDiv.id),
    );
    // alert(changedNote);
    if (changedNote) {
      changedNote.notesMsg = newInput.value;
      newText.innerText = changedNote.notesMsg;
      // alert(defaultNotes[newDiv.id].notesMsg);
      // localStorage.setItem("");
      localStorage.setItem("WEB_DIARY_NOTES", JSON.stringify(defaultNotes));

      // alert(changedNote.notesMsg);
      // updateDefaultNotes(changedNote);
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "deleteNote";
  deleteButton.style.display = "none";

  deleteButton.addEventListener("click", (e) => {
    parentDiv = deleteButton.closest("div");
    parentId = parentDiv.id;
    parentDiv.remove();

    const updatedData = defaultNotes.filter((data) => data.notesID != parentId);
    defaultNotes = updatedData;
    localStorage.setItem("WEB_DIARY_NOTES", JSON.stringify(updatedData));
  });

  newDiv.append(deleteButton);

  mainBoard.insertBefore(newDiv, newNoteDiv);
});

const newDiv = document.createElement("div");

// defaultElement.textContent = defaultNotes[0].notesMsg;

const form = document.getElementById("newNoteForm");
const postButton = document.getElementById("post-button");
const postText = document.getElementById("post-text");
const stickyNotes = document.querySelectorAll(".sticky-notes");

postButton.addEventListener("click", () => {
  // alert(postText.value);

  addNewStickyNote();
  // alert("clicked dalam");

  // alert("clicked");
});

postText.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    addNewStickyNote();
    form.requestSubmit();
  }
});

stickyNotes.forEach((note) => {
  note.addEventListener("mouseenter", (event) => {
    const delButtonInside = note.querySelector(".deleteNote");
    delButtonInside.style.display = "flex";
  });

  note.addEventListener("mouseleave", (event) => {
    const delButtonInside = note.querySelector(".deleteNote");
    delButtonInside.style.display = "none";
  });
});
