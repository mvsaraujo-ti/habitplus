// ======================================================
// ADMIN + AUDITORIA
// ------------------------------------------------------
// Este arquivo é responsável por:
// - Gerenciar os dados administrativos (CRUD)
// - Registrar auditoria de todas as alterações
// - Persistir dados no localStorage
// ------------------------------------------------------
// Arquitetura pensada para migração futura para API
// ======================================================


// =====================
// CARGA INICIAL DE DADOS
// =====================

// Dados principais (fonte única do sistema)
let dadosAdmin = JSON.parse(localStorage.getItem("habita_dados")) || [];

// Logs de auditoria (histórico de ações)
let auditoria = JSON.parse(localStorage.getItem("habita_auditoria")) || [];

// Referência da tabela HTML
const tabela = document.getElementById("tabelaAdmin");


// =====================
// FUNÇÃO: SALVAR (CRIAR / EDITAR)
// =====================
// Disparada ao submeter o formulário
// Decide automaticamente se é CRIAÇÃO ou EDIÇÃO
function salvar(event) {
    event.preventDefault(); // Evita reload da página

    // Captura valores do formulário
    const municipio = document.getElementById("municipio").value.trim();
    const programa  = document.getElementById("programa").value.trim();
    const unidades  = document.getElementById("unidades").value;
    const editIndex = document.getElementById("editIndex").value;

    // Usuário logado (controle de autoria)
    const user = JSON.parse(localStorage.getItem("habita_user"));

    // Registro padronizado
    const registro = {
        municipio,
        programa,
        unidades: Number(unidades), // garante valor numérico
        alteradoPor: user.user
    };

    // Tipo de ação para auditoria
    let acao = "CRIOU";

    // =====================
    // CRIAÇÃO ou EDIÇÃO
    // =====================
    if (editIndex === "") {
        // Novo registro
        dadosAdmin.push(registro);
    } else {
        // Edição de registro existente
        dadosAdmin[editIndex] = registro;
        acao = "EDITOU";

        // Limpa o índice de edição após salvar
        document.getElementById("editIndex").value = "";
    }

    // Registra auditoria da ação
    salvarAuditoria(acao, registro, user.user);

    // Persiste os dados
    localStorage.setItem("habita_dados", JSON.stringify(dadosAdmin));

    // Limpa formulário e atualiza tabela
    limparFormulario();
    renderTabela();
}


// =====================
// FUNÇÃO: EXCLUIR REGISTRO
// =====================
// Remove um registro específico e gera auditoria
function excluir(index) {
    if (!confirm("Deseja remover este registro?")) return;

    const user = JSON.parse(localStorage.getItem("habita_user"));
    const registro = dadosAdmin[index];

    // Auditoria de exclusão
    salvarAuditoria("EXCLUIU", registro, user.user);

    // Remove o item
    dadosAdmin.splice(index, 1);

    // Persiste alteração
    localStorage.setItem("habita_dados", JSON.stringify(dadosAdmin));

    // Atualiza tabela
    renderTabela();
}


// =====================
// FUNÇÃO: SALVAR AUDITORIA
// =====================
// Centraliza o formato de log de auditoria
function salvarAuditoria(acao, registro, usuario) {

    auditoria.unshift({
        data: new Date().toLocaleString("pt-BR"), // Data e hora
        usuario,                                 // Quem fez
        acao,                                    // CRIOU | EDITOU | EXCLUIU
        municipio: registro.municipio,
        programa: registro.programa,
        unidades: registro.unidades
    });

    // Persiste auditoria
    localStorage.setItem(
        "habita_auditoria",
        JSON.stringify(auditoria)
    );
}


// =====================
// FUNÇÃO: RENDERIZAR TABELA
// =====================
// Atualiza visualmente os dados do admin
function renderTabela() {
    tabela.innerHTML = "";

    if (dadosAdmin.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:20px; color:#64748b;">
                    Nenhum registro cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    dadosAdmin.forEach((d, i) => {
        tabela.innerHTML += `
            <tr>
                <td>${d.municipio}</td>
                <td>${d.programa}</td>
                <td style="text-align:right; font-weight:600;">
                    ${d.unidades}
                </td>
                <td>${d.alteradoPor}</td>
                <td>
                    <button class="btn-edit" onclick="editar(${i})">Editar</button>
                    <button class="btn-delete" onclick="excluir(${i})">Excluir</button>
                </td>
            </tr>
        `;
    });
}


// =====================
// FUNÇÃO: EDITAR REGISTRO
// =====================
// Preenche o formulário com dados existentes
function editar(index) {
    const d = dadosAdmin[index];

    document.getElementById("municipio").value = d.municipio;
    document.getElementById("programa").value  = d.programa;
    document.getElementById("unidades").value  = d.unidades;
    document.getElementById("editIndex").value = index;
}


// =====================
// FUNÇÃO: LIMPAR FORMULÁRIO
// =====================
function limparFormulario() {
    document.querySelector("form").reset();
}


// =====================
// INICIALIZAÇÃO
// =====================
// Renderiza tabela ao carregar a página
renderTabela();
