const users = [
  { user: "admin", password: "admin123", role: "admin" },
  { user: "viewer", password: "viewer123", role: "viewer" }
];

function login(e) {
  e.preventDefault();
  const u = user.value;
  const p = password.value;

  const found = users.find(x => x.user === u && x.password === p);
  if (!found) return alert("Credenciais inválidas");

  localStorage.setItem("habita_user", JSON.stringify(found));
  location.href = "index.html";
}

function logout() {
  localStorage.removeItem("habita_user");
  location.href = "login.html";
}

(function protect() {
  if (!location.pathname.includes("login")) {
    if (!localStorage.getItem("habita_user")) {
      location.href = "login.html";
    }
  }
})();
// ================= PROTEÇÃO ADMIN =================
if (window.location.pathname.includes("admin.html")) {
    const user = JSON.parse(localStorage.getItem("habita_user"));

    if (!user || user.role !== "admin") {
        alert("Acesso restrito");
        window.location.href = "index.html";
    }
}
