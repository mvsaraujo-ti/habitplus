// ================= AUDITORIA =================

const tabela = document.getElementById("tabelaAuditoria");
const logs = JSON.parse(localStorage.getItem("habita_auditoria")) || [];
const user = JSON.parse(localStorage.getItem("habita_user"));
if (!user || user.role !== "admin") {
    alert("Acesso restrito");
    window.location.href = "index.html";
}


logs.forEach(log => {
    tabela.innerHTML += `
        <tr>
    <td class="col-data">${log.data}</td>
    <td>${log.usuario}</td>
    <td>
        <span class="badge ${log.acao}">
            ${log.acao}
        </span>
    </td>
    <td>${log.municipio}</td>
    <td>${log.programa}</td>
    <td class="col-unidades">${log.unidades}</td>
</tr>
   
`;
});
