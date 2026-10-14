document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.querySelector('.section-table__tbody'); // Pega todas as setas
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dialog = document.querySelector('.dialog-edit');
  const formEdit = document.querySelector('#form-edit');
  const btnCloseFormEdit = document.querySelector('.dialog-edit__button-close-form-edit');
  const btnSaveAlterationsFormEdit = document.querySelector('.dialog-edit__button-edit');
  const btnCancelFormEdit = document.querySelector('.dialog-edit__button-cancel');
  let currentPage = 1;
  let idStudentEdit = '';

  //#region Abre detalhes da tabela ou formulário de edição
  tbody.addEventListener('click', (event) => {
    // Closest faz o seguinte: suba na árvore do DOM a partir desse botão clicado até encontrar o primeiro tr
    const btnDetails = event.target.closest('.section-table__arrow-down');
    const btnEdit = event.target.closest('.section-table__button-edit');
    const btnDelete = event.target.closest('.section-table__button-delete');

    if (btnDetails !== null) {
      const mainRow = btnDetails.closest('tr');
      // Encontra a próxima linha, tr, do que foi clicado
      const detailRow = mainRow.nextElementSibling;
      detailRow.classList.toggle('section-table__details--open')
    }

    if (btnEdit !== null) {
      const id = btnEdit.dataset.id; // Estamos pegando o atributo do html onde guardamos o id do aluno. Utilizamos a propriedade data-id=""
      const promise = findStudentToUpdate(id);

      promise
        .then((student) => {
          formEdit.studentName.value = student.fullName;
          formEdit.originCountry.value = student.originCountry;
          formEdit.house.value = student.house;
          formEdit.schoolYear.value = String(student.year);
          formEdit.wand.value = student.wand;
          formEdit.bloodStatus.value = student.bloodType;
          formEdit.pet.value = student.pet;
          formEdit.studentStatus.value = student.status;
          formEdit.headmasterNotes.value = student.notes;
          dialog.showModal();
        })
    }

    if (btnDelete !== null) {
      const id = btnDelete.dataset.id;
      deleteStudent(id);
    }
  })
  //#endregion

  //#region Ao abrir formulário encontra qual o aluno a editar
  async function findStudentToUpdate(id) {
    const responseStudentsGet = await fetch(`http://localhost:3000/students`);

    if (!responseStudentsGet.ok) {
      throw new Error(`Erro HTTP: ${responseStudentsGet.status}`);
    };

    const students = await responseStudentsGet.json();

    const student = students.find((s) => s.id === id);
    idStudentEdit = student.id;

    return student;
  }
  //#endregion

  //#region Calcular Total de Alunos
  async function getTotalStudents() {
    try {
      const responseStudentsGet = await fetch('http://localhost:3000/students');

      if (!responseStudentsGet.ok) {
        throw new Error(`Erro HTTP: ${responseStudentsGet.status}`);
      }

      const students = await responseStudentsGet.json();
      let qtyStudents = 0;

      students.forEach(() => {
        qtyStudents++
      })

      const tfoot = document.querySelector('.section-table__tfoot');
      tfoot.innerHTML = `
        <tr>
          <td colspan="10">Quantidade de Alunos: 
            <span>
              ${qtyStudents}
            </span></td>
        </tr>
      `

      return qtyStudents;

    } catch (error) {
      alert(error);
    }
  }
  //#endregion

  //#region Listar Todos os Alunos
  async function getStudents(currentPage) {
    const houseName = {
      'grifinoria': 'Grifnória',
      'sonserina': 'Sonserina',
      'corvinal': 'Corvinal',
      'lufalufa': 'Lufa-Lufa'
    }

    const houseStyles = {
      'grifinoria': 'section-table__tbody--gryffindor',
      'sonserina': 'section-table__tbody--slytherin',
      'corvinal': 'section-table__tbody--ravenclaw',
      'lufalufa': 'section-table__tbody--hufflepuff'
    }

    const statusName = {
      'matriculado': 'Matriculado',
      'afastado': 'Afastado',
      'intercambio': 'Intercâmbio',
      'expulso': 'Expulso',
      'formado': 'Formado'
    }
    const studentStatuses = {
      'matriculado': 'section-table__tbody--registered',
      'afastado': 'section-table__tbody--absent',
      'intercambio': 'section-table__tbody--interchange',
      'expulso': 'section-table__tbody--expelled',
      'formado': 'section-table__tbody--formed'
    }

    const tableBody = document.querySelector('.section-table__tbody');

    try {
      const totalStudents = await getTotalStudents();
      const limitPerPage = 10;
      const start = (currentPage - 1) * limitPerPage;

      const responseStudentsGet = await fetch(`http://localhost:3000/students?_start=${start}&_limit=${limitPerPage}`);
      if (!responseStudentsGet.ok) {
        throw new Error(`Erro HTTP: ${responseStudentsGet.status}`);
      }
      const students = await responseStudentsGet.json();

      tableBody.innerHTML = '';

      students.forEach((student) => {
        const mainTr = document.createElement('tr');

        mainTr.innerHTML = `
          <td>${student.fullName}</td>
          <td>
            <span class="${houseStyles[student.house]}">
              ${houseName[student.house]}
            </span>
          </td>

          <td class="section-table--hide-in-mobile">${student.year}º ano</td>
          <td class="section-table--hide-in-mobile">${student.notes}</td>
          <td class="section-table--hide-in-mobile">${student.bloodType}</td>
          <td class="section-table--hide-in-mobile">${student.pet}</td>

          <td class="section-table--hide-in-mobile">
            <span class="${studentStatuses[student.status]}">
              ${statusName[student.status]}
            </span>
          </td>

          <td class="section-table--hide-in-mobile">
            <button class="section-table__button-edit" data-id="${student.id}">
              <img src="/assets/img/img-list/img_edit.png" alt="pena escrevendo num papel indicando edição">
            </button>
          </td>

          <td class="section-table--hide-in-mobile">
            <button class="section-table__button-delete" data-id="${student.id}">
              <img src="/assets/img/img-list/img_delete.png"
                alt="uma varinha e uma vassoura cruzados num formato de x e um chapéu sob as duas indicando deletar">
            </button>
          </td>

          <td class="section-table--hide-in-desktop">
            <button class="section-table__arrow-down">
              <img src="/assets/img/img-list/img_arrow_down.png"
                alt="pena com uma ponta de flecha apontando para baixo indicando expansão da tabela">
            </button>
          </td>
          `
        tableBody.appendChild(mainTr);

        const detailsTr = document.createElement('tr');
        detailsTr.classList.add('section-table__details');
        detailsTr.classList.add('section-table--hide-in-desktop');

        detailsTr.innerHTML = `
          <td colspan="10">
              <div class="section-table__container-mobile">
                  <p>Ano: <span class="section-table__color-span">${student.year}º ano</span></p>
                  <p>Observações: <span class="section-table__color-span">${student.notes}</span></p>
                  <p>Sangue: <span class="section-table__color-span">${student.bloodType}</span></p>
                  <p>Animal: <span class="section-table__color-span">${student.pet}</span></p>
                  <p>Situação: 
                    <span class="${studentStatuses[student.status]}">
                    ${statusName[student.status]}
                    </span>
                  </p>

                  <p class="section-table__buttons-mobile">
                      <button class="section-table__button-edit" data-id="${student.id}">
                        <img src="/assets/img/img-list/img_edit.png" alt="pena escrevendo num papel indicando edição">
                      </button>

                      <button class="section-table__button-delete" data-id="${student.id}">
                        <img src="/assets/img/img-list/img_delete.png"
                            alt="uma varinha e uma vassoura cruzados num formato de x e um chapéu sob as duas indicando deletar">
                      </button>
                  </p>
              </div>
          </td>
          `
        tableBody.appendChild(detailsTr);
      });

      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = (limitPerPage * currentPage) >= totalStudents;
    } catch (error) {
      alert(error);
    }
  }
  //#endregion

  //#region Editar Informações
  async function editStudentInformations(event) {
    event.preventDefault();

    try {
      const requiredFields = [
        { name: 'studentName', label: 'Nome Completo' },
        { name: 'originCountry', label: 'Origem' },
        { name: 'house', label: 'Casa de Hogwarts' },
        { name: 'schoolYear', label: 'Ano' },
        { name: 'wand', label: 'Varinha' },
        { name: 'bloodStatus', label: 'Sangue' },
        { name: 'pet', label: 'Animal de Estimação' },
        { name: 'studentStatus', label: 'Status do Aluno' }
      ];

      const errors = [];
      let hasError = false;

      requiredFields.forEach((field) => {
        const value = formEdit[field.name].value;

        if (value === '') {
          errors.push(field.label);
          hasError = true;
        }
      })

      if (hasError) {
        throw new Error(
          alert(
            errors
              .map((e) => `-${e}`)
              .join('\n')
          )
        )
      }

      const newInformations = {
        id: idStudentEdit,
        fullName: formEdit.studentName.value,
        originCountry: formEdit.originCountry.value,
        house: formEdit.house.value,
        year: Number(formEdit.schoolYear.value),
        wand: formEdit.wand.value,
        bloodType: formEdit.bloodStatus.value,
        pet: formEdit.pet.value,
        status: formEdit.studentStatus.value,
        notes: formEdit.headmasterNotes.value || 'N/A'
      }

      const response = await fetch(`http://localhost:3000/students/${idStudentEdit}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newInformations)
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      alert('Feitiço lançado. Atualização realizada');

      dialog.close();

    } catch (error) {
      alert(error)
    }


    console.log(formEdit.studentName.value)
  }
  //#endregion

  //#region Excluir aluno
  async function deleteStudent(id) {
    console.log(id)

    try {
      const wantDelete = confirm('Tem certeza que deseja excluir o aluno?');

      if (wantDelete) {
        const response = await fetch(`http://localhost:3000/students/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        alert('Malfeito feito. Aluno excluído.');
      }

    } catch (error) {
      alert(error);
    }
  }
  //#endregion

  //#region Botões Paginação
  prevBtn.addEventListener('click', () => {
    currentPage--;
    getStudents(currentPage);
  })

  nextBtn.addEventListener('click', () => {
    currentPage++;

    getStudents(currentPage);
  })
  //#endregion

  //#region Fechar modal
  function closeModal() {
    dialog.close();
  }
  //#endregion

  btnCloseFormEdit.addEventListener('click', closeModal);
  btnSaveAlterationsFormEdit.addEventListener('click', editStudentInformations);
  btnCancelFormEdit.addEventListener('click', closeModal);

  getStudents(currentPage);
})