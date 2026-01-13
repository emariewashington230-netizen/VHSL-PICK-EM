let user = null;
let picks = JSON.parse(localStorage.getItem("picks")) || [];
let locked = JSON.parse(localStorage.getItem("locked")) || false;

const list = document.getElementById("pickList");

netlifyIdentity.on("login", u => {
  user = u;
  document.getElementById("auth").style.display = "none";
  document.getElementById("userArea").style.display = "block";
  document.getElementById("userInfo").innerText = `Logged in as ${u.email}`;

  // ADMIN CHECK
  if (u.app_metadata && u.app_metadata.roles?.includes("admin")) {
    document.getElementById("adminPanel").style.display = "block";
  }

  netlifyIdentity.close();
  render();
});

netlifyIdentity.on("logout", () => location.reload());

function addPick() {
  if (locked) return alert("Picks are locked");

  const input = document.getElementById("pickInput");
  if (!input.value) return;

  picks.push(input.value);
  save();
  input.value = "";
}

function render() {
  list.innerHTML = "";
  picks.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    list.appendChild(li);
  });
}

function toggleLock() {
  locked = !locked;
  save();
}

function resetAll() {
  if (!confirm("RESET EVERYTHING?")) return;
  picks = [];
  locked = false;
  save();
}

function save() {
  localStorage.setItem("picks", JSON.stringify(picks));
  localStorage.setItem("locked", locked);
  render();
}
