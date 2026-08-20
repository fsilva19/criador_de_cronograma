var form = document.getElementById("form-envio");

// Dias que virarão as colunas
const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

// Estrutura dos turnos com seus respectivos blocos de horário
const turnos = [
  {
    nome: '🌅 Matutino',
    horarios: ['07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00']
  },
  {
    nome: '☀️ Vespertino',
    horarios: ['13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00']
  },
  {
    nome: '🌙 Noturno',
    horarios: ['19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00']
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
    const dia = document.getElementById("dia-semana").value;
    const nome = document.getElementById("nome-disciplina").value;
    const abreviacao = document.getElementById("abreviacao-disciplina").value;

    const nova_aula = {horario, dia, nome, abreviacao};

    const celulaAlvo = document.querySelector(`td[data-dia="${dia}"][data-horario="${horario}"]`);

    if(celulaAlvo){
      celulaAlvo.textContent = abreviacao;
      celulaAlvo.title = nome;
    }else{
      alert("Não foi possível encontrar essa célula!")
    }
    form.reset();
});