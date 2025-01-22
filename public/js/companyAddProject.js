document.addEventListener('DOMContentLoaded', function() {
const form1 = document.getElementById('companyAddProject');
const alertPlaceholder = document.getElementById('alert-placeholder');

if(form1){

form1.addEventListener('submit', async function (e) {
    e.preventDefault();

    const project_name = document.getElementById('project_name').value;
    const project_description = document.getElementById('project_description').value;
    const gov_ministry = document.getElementById('gov_ministry').value;
    const project_startDate = document.getElementById('project_startDate').value;
    const project_forcasted_endDate = document.getElementById('project_forcasted_endDate').value;
    const budget_allotted = document.getElementById('budget_allotted').value;
    const isPrivate = document.getElementById('isPrivate').checked;
    const PM_email_elements = document.querySelectorAll('#pmEmails input[name="PM_email[]"]');
    const QA_email_elements = document.querySelectorAll('#qaEmails input[name="QA_email[]"]');
    const HR_email_elements = document.querySelectorAll('#hrEmails input[name="HR_email[]"]');
    const FO_email_elements = document.querySelectorAll('#foEmails input[name="FO_email[]"]');
    const SE_email_elements = document.querySelectorAll('#seEmails input[name="SE_email[]"]');

    const PM_email = Array.from(PM_email_elements)
                        .map(input => input.value)
                        .filter(email => email);
    const QA_email = Array.from(QA_email_elements)
                        .map(input => input.value)
                        .filter(email => email);
    const HR_email = Array.from(HR_email_elements)
                        .map(input => input.value)
                        .filter(email => email);
    const FO_email = Array.from(FO_email_elements)
                        .map(input => input.value)
                        .filter(email => email);
    const SE_email = Array.from(SE_email_elements)
                        .map(input => input.value)
                        .filter(email => email);


    const response = await fetch('/company/admin/addProject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            project_name,
            project_description,
            gov_ministry,
            project_startDate,
            project_forcasted_endDate,
            budget_allotted,
            isPrivate,
            PM_email,
            QA_email,
            HR_email,
            FO_email,
            SE_email
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

