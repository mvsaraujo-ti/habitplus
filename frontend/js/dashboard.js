// ================= DASHBOARD + GRÁFICOS =================

const dados = getDados();
const totais = getTotais();

/* ===== CARDS ===== */
document.getElementById("totalUnidades").innerText =
    totais.totalUnidades.toLocaleString("pt-BR");

document.getElementById("totalMunicipios").innerText =
    totais.totalMunicipios;

document.getElementById("totalProgramas").innerText =
    totais.totalProgramas;

/* ===== AGRUPAMENTOS ===== */
function agrupar(chave) {
    const mapa = {};

    dados.forEach(d => {
        mapa[d[chave]] = (mapa[d[chave]] || 0) + Number(d.unidades);
    });

    return {
        labels: Object.keys(mapa),
        values: Object.values(mapa)
    };
}

const porPrograma = agrupar("programa");
const porMunicipio = agrupar("municipio");

/* ===== GRÁFICO POR PROGRAMA ===== */
new Chart(document.getElementById("chartPrograma"), {
    type: "bar",
    data: {
        labels: porPrograma.labels,
        datasets: [{
            data: porPrograma.values,
            backgroundColor: "#1e3a8a"
        }]
    },
    options: {
        plugins: { legend: { display: false } },
        responsive: true
    }
});

/* ===== GRÁFICO POR MUNICÍPIO ===== */
new Chart(document.getElementById("chartMunicipio"), {
    type: "bar",
    data: {
        labels: porMunicipio.labels,
        datasets: [{
            data: porMunicipio.values,
            backgroundColor: "#0f172a"
        }]
    },
    options: {
        plugins: { legend: { display: false } },
        responsive: true
    }
});
