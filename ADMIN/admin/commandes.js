document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("tbody");
  const commandes = JSON.parse(localStorage.getItem("commandes")) || [];

  tbody.innerHTML = "";

  commandes.forEach((cmd, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${cmd.nom}</td>
      <td>${cmd.service}</td>
      <td>${cmd.produits}</td>
      <td>${cmd.localisation}</td>
      <td><span class="status ${getStatusClass(cmd.statut)}">${cmd.statut}</span></td>
      <td>
        ${getActions(cmd, index)}
      </td>
    `;

    tbody.appendChild(tr);
  });
});

function getStatusClass(status) {
  if (status === "En attente") return "pending";
  if (status === "En cours") return "progress";
  return "done";
}

function getActions(cmd, index) {
  if (cmd.statut === "En attente") {
    return `
      <button class="btn validate" onclick="updateStatus(${index}, 'En cours')">Valider</button>
      <button class="btn reject" onclick="updateStatus(${index}, 'Refusée')">Refuser</button>
    `;
  }
  if (cmd.statut === "En cours") {
    return `<button class="btn done" onclick="updateStatus(${index}, 'Terminée')">Terminer</button>`;
  }
  return "—";
}

function updateStatus(index, newStatus) {
  const commandes = JSON.parse(localStorage.getItem("commandes")) || [];
  commandes[index].statut = newStatus;
  localStorage.setItem("commandes", JSON.stringify(commandes));
  location.reload();
}
