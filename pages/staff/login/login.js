document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form-login');
    form.addEventListener('submit', login);

    async function login(event) {
        event.preventDefault();
        
        const responseStaffGet = await fetch('http://localhost:3000/staff');
        
        if (!responseStaffGet.ok) {
            throw new Error(`Erro HTTP: ${responseStaffGet.status}`);
        }

        const staff = await responseStaffGet.json();
        let hasNotAccess = true;
        const form = event.target;

        staff.forEach((staffMember) => {
            if (staffMember.wizardName === form.wizardName.value && 
                staffMember.password === form.password.value) {
                    hasNotAccess = false;
                    localStorage.setItem('name', staffMember.wizardName)
                    alert('Malfeito, feito');
                    form.reset();
                    window.location.href = '/pages/witches-and-wizards/list/list.html';
            }
        })

        if (hasNotAccess) {
            alert('Feitiço de bloqueio ativo. Acesso não autorizado')
        }
    }
})