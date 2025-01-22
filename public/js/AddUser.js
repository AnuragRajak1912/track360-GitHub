const form = document.getElementById('AddUser');
const alertPlaceholder = document.getElementById('alert-placeholder');

form.addEventListener('submit',async function (e){
    e.preventDefault(); 

    const emp_name = document.getElementById('emp_name').value;
    const emp_email = document.getElementById('emp_email').value;
    const emp_password = document.getElementById('emp_password').value;

    const response = await fetch(postTo,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({emp_name,emp_email,emp_password})
    });

    const result = await response.json();

    if(result.status==='SUCCESS'){
        alertPlaceholder.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show fontError" role="alert">
        <strong>${result.status}</strong> -> ${result.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
    } else if(result.status === 'ERROR'){
        alertPlaceholder.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show fontError" role="alert">
        <strong>${result.status}</strong> -> ${result.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
    }

});