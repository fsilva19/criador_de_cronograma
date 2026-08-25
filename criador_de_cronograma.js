var form = document.getElementById("form-envio");

// Dias que virarão as colunas
const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

// Estrutura dos turnos com seus respectivos blocos de horário
const turnos = [
  {
    nome: '🌅 Matutino',
    horarios: ['07:00 - 08:40', '08:50 - 10:30', '10:40 - 12:20']
  },
  {
    nome: '☀️ Vespertino',
    horarios: ['13:00 - 14:40', '14:50 - 16:30', '16:40 - 18:20']
  },
  {
    nome: '🌙 Noturno',
    horarios: ['18:40 - 20:20', '20:30 - 22:10']
  }
];



function gerar_tabela (){
    const cabecalho = document.getElementById("cabecalho-dias");
    const corpo = document.getElementById("corpo-tabela");

    
    const thHorario = document.createElement("th");
    thHorario.textContent = "HORÁRIOS";
    cabecalho.appendChild(thHorario);
    diasDaSemana.forEach(dia =>{
        const th = document.createElement("th");
        th.textContent = dia;
        cabecalho.appendChild(th);
    });

    turnos.forEach(turno => {
        // Insere uma linha de título para o turno (ex: Matutino)
        const linhaDivisoria = document.createElement('tr');
        linhaDivisoria.className = 'linha-turno';
        const tdDivisoria = document.createElement('td');
        tdDivisoria.colSpan = diasDaSemana.length + 1; // Ocupa todas as colunas
        tdDivisoria.textContent = turno.nome;
        linhaDivisoria.appendChild(tdDivisoria);
        corpo.appendChild(linhaDivisoria);

        turno.horarios.forEach(horario => {
            const linha = document.createElement('tr');

            // Coluna 1: O texto do horário
            const tdHorario = document.createElement('td');
            tdHorario.textContent = horario;
            linha.appendChild(tdHorario);

            // Colunas 2 em diante: As células para cada dia da semana
            // (pulamos o índice 0 pois é a coluna de rótulo 'Horário')
            for (let i = 0; i < diasDaSemana.length; i++) {
                const dia = diasDaSemana[i];
                const td = document.createElement('td');

                // Mapeamento invisível para pintar depois:
                td.dataset.turno = turno.nome.toLowerCase();
                td.dataset.horario = horario;
                td.dataset.dia = dia.toLowerCase();

                linha.appendChild(td);
            }
            corpo.appendChild(linha);
        });
    });
}

gerar_tabela();

// Evento que recebe os dados
form.addEventListener("submit", function(e){
    e.preventDefault();

    const horario = document.getElementById("horario-aula").value;
    const nome = document.getElementById("nome-disciplina").value;
    const abreviacao = document.getElementById("abreviacao-disciplina").value;

    const checkboxesMarcados = document.querySelectorAll('.seletor-dias input[name="dias"]:checked');
    
    // Converte a NodeList em um Array com os valores (ex: ["segunda", "quarta"])
    const diasSelecionados = Array.from(checkboxesMarcados).map(cb => cb.value);

    // Validação: Garante que o usuário marcou pelo menos 1 dia
    if (diasSelecionados.length === 0) {
      alert("Por favor, selecione pelo menos um dia da semana!");
      return;
    }

    diasSelecionados.forEach(dia => {
    // Busca a célula correspondente ao dia atual do loop e ao horário selecionado
    const celulaAlvo = document.querySelector(`td[data-dia="${dia}"][data-horario="${horario}"]`);

    if (celulaAlvo) {
      celulaAlvo.textContent = abreviacao;
      celulaAlvo.title = nome;
    } else {
      console.warn(`Não foi possível encontrar a célula para: ${dia} no horário ${horario}`);
    }
    });
    form.reset();
    document.querySelector('.dropdown-dias').classList.remove('ativo');
});

// -----------------------------------
// Funções para estilizar o seletor dos dias da semana
const dropdown = document.querySelector('.dropdown-dias');
const btnDias = document.getElementById('btn-dias');

// Alterna a exibição ao clicar no botão
btnDias.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdown.classList.toggle('ativo');
});

// Impede que clicar dentro do menu feche o dropdown
document.getElementById('menu-dias').addEventListener('click', (e) => {
  e.stopPropagation();
});

// Fecha a caixinha flutuante se clicar em qualquer outro lugar da página
document.addEventListener('click', () => {
  dropdown.classList.remove('ativo');
});