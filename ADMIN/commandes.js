document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("commandesTable");

  // Lire les commandes depuis localStorage
  const commandes = JSON.parse(localStorage.getItem("commandes")) || [];

  // Aucune commande
  if (commandes.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding:20px;">
          Aucune commande pour le moment
        </td>
      </tr>
    `;
    return;
  }

  // Affichage des commandes
  commandes.forEach((cmd, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${cmd.nom}</td>
      <td>${cmd.service}</td>
      <td>${cmd.produits}</td>
      <td>${cmd.localisation}</td>
      <td>
        <span class="status ${getStatusClass(cmd.statut)}">
          ${cmd.statut}
        </span>
      </td>
      <td>
        ${getActionButtons(cmd.statut, index)}
      </td>
    `;

    tableBody.appendChild(tr);
  });
});

// Boutons selon statut
function getActionButtons(statut, index) {
  if (statut === "En attente") {
    return `
      <button class="btn validate" onclick="updateStatus(${index}, 'En cours')">
        Valider
      </button>
      <button class="btn reject" onclick="updateStatus(${index}, 'Refusée')">
        Refuser
      </button>
    `;
  }

  if (statut === "En cours") {
    return `
      <button class="btn done" onclick="updateStatus(${index}, 'Terminée')">
        Terminer
      </button>
    `;
  }

  return "—";
}

// Classe CSS statut
function getStatusClass(statut) {
  if (statut === "En attente") return "pending";
  if (statut === "En cours") return "progress";
  if (statut === "Terminée") return "done";
  return "";
}

// Mise à jour statut
function updateStatus(index, newStatus) {
  const commandes = JSON.parse(localStorage.getItem("commandes")) || [];
  commandes[index].statut = newStatus;
  localStorage.setItem("commandes", JSON.stringify(commandes));
  location.reload();
}
