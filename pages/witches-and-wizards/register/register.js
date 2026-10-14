document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.querySelector('#form-register-student');

    form.addEventListener('submit', registerStudent);

    async function registerStudent(event) {
        event.preventDefault();
        
        try {
            const form = event.target;
            
            const requiredFields = [
                {name: 'studentName', label: 'Nome Completo'},
                {name: 'originCountry', label: 'Origem'},
                {name: 'house', label: 'Casa de Hogwarts'},
                {name: 'schoolYear', label: 'Ano'},
                {name: 'wand', label: 'Varinha'},
                {name: 'bloodStatus', label: 'Sangue'},
                {name: 'pet', label: 'Animal de Estimação'},
                {name: 'studentStatus', label: 'Status do Aluno'}
            ];
    
            const errors = [];
            const hasError = false;
            
            requiredFields.forEach((field) => {
                const value = form[field.name].value;
                
                if (value === '') {
                    errors.push(field.label);
                    hasError = true;
                }
            });
            
            if (hasError) {
                throw new Error(
                    errors
                    .map((e) => `-${e}`)
                    .join('\n')
                )
            };  
            
            const newStudent = {
                fullName: form.studentName.value,
                originCountry: form.originCountry.value,
                house: form.house.value,
                year: Number(form.schoolYear.value),
                wand: form.wand.value,
                bloodType: form.bloodStatus.value,
                pet: form.pet.value,
                status: form.studentStatus.value,
                notes: form.headmasterNotes.value !== '' ? form.headmasterNotes.value : 'N/A'
            };
            console.log(newStudent)

            const responseHousesPointsPost = await fetch('http://localhost:3000/students', {
                method: 'POST',
                headers: {
                    'Content-Tyoe': 'application/json'
                },
                body: JSON.stringify(newStudent)
            });

            if (!responseHousesPointsPost.ok) {
                throw new Error(`Erro HTTP: ${responseHousesPointsPost.status}`);
            }

            alert('Aluno cadastrado com Sucesso');

            form.reset();
    
        } catch (error) {
            alert(error);
        }
    }
})