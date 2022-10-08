const addNote = document.querySelector(".add");
const popoutBox = document.querySelector(".popout");
const closeIcon = popoutBox.querySelector("header a");
const titleTag = popoutBox.querySelector("input");
const descTag = popoutBox.querySelector("textarea");
const addBtn = popoutBox.querySelector(".add-btn");

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

addNote.addEventListener("click", () => {
  popoutBox.classList.add("showw");
});

closeIcon.addEventListener("click", () => {
  titleTag.value = "";
  descTag.value = "";
  popoutBox.classList.remove("showw");
});

function showMenu(el) {
  el.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != el) {
      el.parentElement.classList.remove("show");
    }
  });
}

function showNotes() {
  //document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let liTag = `<article class="note">
    <header class="note__title">
        <h1>${note.title}</h1>
    </header>
    <div class="note__content">
        <p>${note.description}</p>
    </div>
    <div class="note__date">
        <p>${note.date}</p>
        
        <div class="settings">
        <i class="fa fa-ellipsis-h" onclick="showMenu(this)" aria-hidden="true"></i>
            <ul class="lista">
                <li><i onclick="edit()" class="fa fa-pencil" aria-hidden="true"></i></li>
                <li><i onclick="deleteNote(${index})" class="fa fa-trash-o" aria-hidden="true"></i>
                </li>
            </ul>
        </div>
    </div>
</article>`;

    addNote.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function deleteNote(id) {
  console.log(id);
  notes.splice(id, 1);
  localStorage.removeItem("notes", JSON.stringify(notes));
  showNotes();
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value,
    noteDesc = descTag.value;

  if (noteTitle || noteDesc) {
    let dateObj = new Date();
    month = dateObj.getMonth();
    day = dateObj.getDate();
    year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`,
    };

    notes.push(noteInfo); // add new note to notes
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  }
});
