// ================= MUNICÍPIOS REAL =================

const dados = getDados();

const tabela = document.getElementById("tabelaDados");
const filtroPrograma = document.getElementById("filtroPrograma");
const filtroMunicipio = document.getElementById("filtroMunicipio");

function init() {
    carregarFiltros();
    renderTabela(dados);
}

function carregarFiltros() {
    const programas = [...new Set(dados.map(d => d.programa))];
    const municipios = [...new Set(dados.map(d => d.municipio))];

    programas.forEach(p => {
        filtroPrograma.innerHTML += `<option value="${p}">${p}</option>`;
    });

    municipios.forEach(m => {
        filtroMunicipio.innerHTML += `<option value="${m}">${m}</option>`;
    });
}

function renderTabela(lista) {
    tabela.innerHTML = "";

    lista.forEach(item => {
        tabela.innerHTML += `
            <tr>
                <td>${item.municipio}</td>
                <td>${item.programa}</td>
                <td>${item.unidades}</td>
            </tr>
        `;
    });
}

function filtrar() {
    let resultado = dados;

    if (filtroPrograma.value) {
        resultado = resultado.filter(
            d => d.programa === filtroPrograma.value
        );
    }

    if (filtroMunicipio.value) {
        resultado = resultado.filter(
            d => d.municipio === filtroMunicipio.value
        );
    }

    renderTabela(resultado);
}

init();
