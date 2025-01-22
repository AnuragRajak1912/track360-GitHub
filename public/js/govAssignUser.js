document.addEventListener('DOMContentLoaded', function() {
    const form1 = document.getElementById('govAddUser');
    const alertPlaceholder = document.getElementById('alert-placeholder');
    
    if(form1){
    
    form1.addEventListener('submit', async function (e) {
        e.preventDefault();

        const govQA_elements = document.querySelectorAll('#gov_QA_Emails input[name="govQA_email[]"]');
        const govHR_Emails = document.querySelectorAll('#gov_HR_Emails input[name="govHR_email[]"]');
    
        const govQA_email = Array.from(govQA_elements)
                            .map(input => input.value)
                            .filter(email => email);
        const govHR_email = Array.from(govHR_Emails)
                            .map(input => input.value)
                            .filter(email => email);
    
    
        const response = await fetch(`/gov/admin/addUser/project/${projectId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                govQA_email,
                govHR_email
            })
        });
    
        const result = await response.json();
    
        if (result.status === 'SUCCESS') {
            alertPlaceholder.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show fontError" role="alert">
                <strong>${result.status}</strong> -> ${result.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        } else if (result.status === 'ERROR') {
            alertPlaceholder.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show fontError" role="alert">
                <strong>${result.status}</strong> -> ${result.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        }
    });
    }
    });
    
    