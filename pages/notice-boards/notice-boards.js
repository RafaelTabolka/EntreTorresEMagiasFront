document.addEventListener('DOMContentLoaded', () => {
    const listUl = document.querySelector('.section-list__ul');
    const dialogEdit = document.querySelector('.dialog-edit');
    const dialogRegister = document.querySelector('.dialog-register');
    const btnNewNotice = document.querySelector('.button-plus');
    const btnCloseDialogEdit = document.querySelector('.dialog-edit__button-close');
    const btnCloseDialogRegister = document.querySelector('.dialog-register__button-close');
    const btnDeleteDialogEdit = document.querySelector('.dialog-edit__button-delete');
    const btnConfirmDialogEdit = document.querySelector('.dialog-edit__button-edit');
    const btnConfirmDialogRegister = document.querySelector('.dialog-register__button-register');
    const btnCancelDialogEdit = document.querySelector('.dialog-edit__button-cancel');
    const btnCancelDialogRegister = document.querySelector('.dialog-register__button-cancel');
    const formEdit = document.querySelector('#form-edit');
    const formRegister = document.querySelector('#form-register');
    let idNotice;

    // Funções
    //#region Lista os avisos
    async function getNotices() {
        try {
            const response = await fetch('http://localhost:3000/notices');

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const notices = await response.json();

            notices.forEach((notice) => {
                // Abaixo está sendo criada uma nova data utilizando a data vinda do objeto. Utiliza-se T00:00:00 para tratar como horário local
                const formatedDate = new Date(`${notice.day}T00:00:00`).toLocaleDateString('pt-BR');
                
                const li = document.createElement('li');
                li.classList.add('section-list__li');

                li.innerHTML = `
                    <article class="article-selected" data-id="${notice.id}">
                        <header>
                            <h3>${notice.title}</h3>
                            <p>
                                <time datetime="2025-09-01">${formatedDate} &mdash;</time>
                                ${notice.updatedBy === 'N/A' ? notice.createdBy : notice.updatedBy}
                            </p>
                            </header>
                        
                        <p class="section-list__text-bottom">
                            ${notice.content}
                        </p>
                    </article>
                `
                listUl.appendChild(li);
            })


        } catch (error) {
            alert(error);
        };
    };
    //#endregion

    //#region Fecha formulário de edição
    function closeDialogEdit() {
        dialogEdit.close();
    }
    //#endregion

    //#region Fecha formulário de registro
    function closeDialogRegister() {
        dialogRegister.close();
    }
    //#endregion

    //#region Cadastrar aviso
    async function registerNotice(event) {
        event.preventDefault();

        try {
            const requiredFields = [
                { name: 'noticeTitle', label: 'Título' },
                { name: 'noticeDay', label: 'Data' },
                { name: 'noticeContent', label: 'Conteúdo' }
            ];
    
            const errors = [];
            let hasError = false;
    
            requiredFields.forEach((field) => {
                const value = formRegister[field.name].value.trim();
    
                if (value === '') {
                    errors.push(field.label);
                    hasError = true;
                }
            })
    
            if (hasError) {
                throw new Error(
                    alert(
                        'Campos Obrigatórios:\n' +
                        errors
                        .map((e) => `-${e}`)
                        .join('\n')
                    )
                )
            };

            const newNotice = {
                title: formRegister.noticeTitle.value,
                day: formRegister.noticeDay.value,
                createdBy: localStorage.getItem('name'),
                updatedBy: 'N/A',
                content: formRegister.noticeContent.value
            }

            const response = await fetch('http://localhost:3000/notices', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(newNotice)
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            alert('Aviso cadastrado.');

        } catch (error) {
            console.log(error);
        }
    }
    //#endregion

    //#region Editar avisos
    async function editNotice(event) {
        event.preventDefault();

        const requiredFields = [
            { name: 'noticeTitle', label: 'Título' },
            { name: 'noticeDay', label: 'Data' },
            { name: 'noticeContent', label: 'Conteúdo' }
        ];

        const errors = [];
        let hasError = false;

        requiredFields.forEach((field) => {
            const value = formEdit[field.name].value.trim();

            if (value === '') {
                errors.push(field.label);
                hasError = true;
            }
        })

        if (hasError) {
            throw new Error(
                alert(
                    'Campos Obrigatórios:\n' +
                    errors
                        .map((e) => `-${e}`)
                        .join('\n')
                )
            )
        }

        const newInformations = {
            content: formEdit.noticeContent.value,
            day: formEdit.noticeDay.value,
            title: formEdit.noticeTitle.value,
            updatedBy: localStorage.getItem('name') || 'N/A'
        }

        try {
            const response = await fetch(`http://localhost:3000/notices/${idNotice}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newInformations)
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            alert('Dados Atualizados.');

        } catch (error) {
            alert(error);
        }
    }
    //#endregion

    //#region Encontra aviso que vai ser editado
    async function findNoticeToUpdate(id) {
        try {
            const response = await fetch(`http://localhost:3000/notices/${id}`);

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const notice = await response.json();
            idNotice = notice.id;

            return notice;
        } catch (error) {
            alert(error);
        }
    }
    //#endregion

    //#region Deletar avisos
    async function deleteNotice() {
        const wantDelete = confirm('Tem certeza que deseja excluir aviso?');

        try {
            if (wantDelete) {
                const response = await fetch(`http://localhost:3000/notices/${idNotice}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }

                alert('Aviso excluído.')
            }
        } catch (error) {
            alert(error);
        }

    }
    //#endregion

    // Eventos
    //#region Abrir e fechar form de edição
    listUl.addEventListener('click', (event) => {
        event.preventDefault();
        const article = event.target.closest('.article-selected');

        if (article !== null) {
            const id = article.dataset.id;
            const response = findNoticeToUpdate(id);
            response
                .then((notice) => {
                    formEdit.noticeTitle.value = notice.title.trim();
                    formEdit.noticeDay.value = notice.day;
                    formEdit.noticeContent.value = notice.content.trim();
                    dialogEdit.showModal();
                })
        };
    });

    btnConfirmDialogEdit.addEventListener('click', editNotice);
    btnDeleteDialogEdit.addEventListener('click', deleteNotice);
    btnCloseDialogEdit.addEventListener('click', closeDialogEdit);
    btnCancelDialogEdit.addEventListener('click', closeDialogEdit);
    //#endregion

    //#region Abrir e fechar form de registro
    btnNewNotice.addEventListener('click', (event) => {
        event.preventDefault();
        dialogRegister.showModal();
    })

    btnConfirmDialogRegister.addEventListener('click', registerNotice);
    btnCloseDialogRegister.addEventListener('click', closeDialogRegister);
    btnCancelDialogRegister.addEventListener('click', closeDialogRegister);
    //#endregion

    getNotices();
})