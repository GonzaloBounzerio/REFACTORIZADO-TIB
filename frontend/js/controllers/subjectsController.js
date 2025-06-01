import { subjectsAPI } from '../api/subjectsAPI.js';
import { hideLoadingScreen, showLoadingScreen } from '../function.js';

document.addEventListener('DOMContentLoaded', () => 
{
    loadSubjects();
    setupSubjectFormHandler();
});

function setupSubjectFormHandler() 
{
  const form = document.getElementById('subjectForm');
  form.addEventListener('submit', async e => 
  {
        showLoadingScreen();
        e.preventDefault();
        const subject = 
        {
            id: document.getElementById('subjectId').value.trim(),
            name: document.getElementById('name').value.trim()
        };

        try 
        {
            if (subject.id) 
            {
                await subjectsAPI.update(subject);
                alert("Materia actualizada");
            }
            else
            {
                await subjectsAPI.create(subject);
                alert("Materia agregada");
            }
            
            loadSubjects();
        }
        catch (err)
        {
            if(err.status === 409){ //como hago que detecte el 409!!
                alert("Ya existe una materia con dicho nombre - No se puede actualizar");
            }else{
                alert("No se pudo agregar");
            }
            console.error(err.message);
        }
        form.reset();
        hideLoadingScreen();
  });
}

async function loadSubjects()
{
    showLoadingScreen();
    try
    {
        const subjects = await subjectsAPI.fetchAll();
        renderSubjectTable(subjects);
    }
    catch (err)
    {
        console.error('Error cargando materias:', err.message);
    }
    hideLoadingScreen();
}

function renderSubjectTable(subjects)
{
    const tbody = document.getElementById('subjectTableBody');
    tbody.replaceChildren();

    subjects.forEach(subject =>
    {
        const tr = document.createElement('tr');

        tr.appendChild(createCell(subject.name));
        tr.appendChild(createSubjectActionsCell(subject));

        tbody.appendChild(tr);
    });
}

function createCell(text)
{
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}

function createSubjectActionsCell(subject)
{
    const td = document.createElement('td');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'w3-button w3-blue w3-small';
    editBtn.addEventListener('click', () => 
    {
        document.getElementById('subjectId').value = subject.id;
        document.getElementById('name').value = subject.name;
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Borrar';
    deleteBtn.className = 'w3-button w3-red w3-small w3-margin-left';
    deleteBtn.addEventListener('click', () => confirmDeleteSubject(subject.id));

    td.appendChild(editBtn);
    td.appendChild(deleteBtn);
    return td;
}

async function confirmDeleteSubject(id)
{
    if (!confirm('¿Seguro que deseas borrar esta materia?')) return;

    try
    {
        showLoadingScreen();
        await subjectsAPI.remove(id);
        loadSubjects();
        hideLoadingScreen();
                //agrego pantalla de carga para avisar que esta borrando
    }
    catch (err)
    {
        console.error('Error al borrar materia:', err.message);
    }
}
