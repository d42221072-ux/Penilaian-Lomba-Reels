let penilaianList = JSON.parse(localStorage.getItem("penilaianList")) || [];

function renderTable() {
  const tbody = document.querySelector("#hasil-table tbody");
  tbody.innerHTML = "";
  penilaianList.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.peserta}</td>
      <td>${item.kreativitas}</td>
      <td>${item.kualitas}</td>
      <td>${item.pesan}</td>
      <td><strong>${item.total}</strong></td>
    `;
    tbody.appendChild(row);
  });
}
renderTable();

document.querySelectorAll(".nilai-form").forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const peserta = form.dataset.peserta;
    const kreativitas = parseInt(data.get("kreativitas"));
    const kualitas = parseInt(data.get("kualitas"));
    const pesan = parseInt(data.get("pesan"));
    const total = kreativitas + kualitas + pesan;

    const existing = penilaianList.findIndex(p => p.peserta === peserta);
    if (existing >= 0) {
      penilaianList[existing] = { peserta, kreativitas, kualitas, pesan, total };
    } else {
      penilaianList.push({ peserta, kreativitas, kualitas, pesan, total });
    }

    localStorage.setItem("penilaianList", JSON.stringify(penilaianList));
    renderTable();
    form.reset();
  });
});

const clearBtn = document.createElement("button");
clearBtn.textContent = "🗑️ Hapus Semua Data";
clearBtn.style.marginTop = "20px";
clearBtn.onclick = () => {
  if (confirm("Yakin ingin hapus semua data?")) {
    localStorage.removeItem("penilaianList");
    penilaianList = [];
    renderTable();
  }
};
document.body.appendChild(clearBtn);
