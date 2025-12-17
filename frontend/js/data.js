// ================= DATA SOURCE ÚNICA =================

function getDados() {
    return JSON.parse(localStorage.getItem("habita_dados")) || [];
}

function getTotais() {
    const dados = getDados();

    const totalUnidades = dados.reduce(
        (soma, d) => soma + Number(d.unidades), 0
    );

    const municipios = [...new Set(dados.map(d => d.municipio))];
    const programas = [...new Set(dados.map(d => d.programa))];

    return {
        totalUnidades,
        totalMunicipios: municipios.length,
        totalProgramas: programas.length
    };
}
