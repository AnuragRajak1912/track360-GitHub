const employee = require('../models/empSchema');
const PROJECT = require('../models/projectSchema')
const XLSX = require('xlsx');
const { validateToken } = require('../utility/jwt');
const { decode } = require('punycode');

exports.HRpage = async (req, res) => {
    const token = req.cookies.authToken;
    if (!token) return res.redirect('/login');

    try {
        const decoded = validateToken(token);
        const emp = await employee.findOne({ _id: decoded.ID });
        const companyID = emp.companyID;

        const perPage = 10;
        const page = req.query.page || 1; 
        const allEmp = await employee.find({ companyID: companyID })
                                     .skip((perPage * page) - perPage)
                                     .limit(perPage);
        const count = await employee.countDocuments({ companyID: companyID });

        const empNames = allEmp.map(e => e.empName);
        const empEmails = allEmp.map(e => e.empEmail);
        const empPasswords = allEmp.map(e => e.empPassword);

        // Excel Sheet Download
        if (req.query.download === 'excel') {
            const excelData = allEmp.map((emp, index) => ({
                S_No: index + 1,
                Name: emp.empName,
                Email: emp.empEmail,
                Password: emp.empPassword
            }));
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(excelData);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
            res.setHeader('Content-Disposition', 'attachment; filename="employee_data.xlsx"');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return res.send(excelBuffer);
        }

        const project = await PROJECT.find({companyID:companyID});
        const projectName = project.map(e=>e.projectName);
        const projectID = project.map(e=>e._id);


        // Assuming 'employee' and 'PROJECT' schemas are already defined
// const project = await PROJECT.find({ companyID: companyID });

const projects = await PROJECT.find({ companyID: companyID });
const allEmployees = await employee.find({ companyID: companyID });
        const totalEmpCount = allEmployees.length;
        
        // Collecting employees assigned to each project
        let assignedEmpCount = 0;
        const projectData = projects.map(project => {
            const empCount = project.empsWorking.length;
            assignedEmpCount += empCount;
            return {
                projectName: project.projectName,
                empCount: empCount
            };
        });
        
        // Calculate unassigned employees
        const unassignedEmpCount = totalEmpCount - assignedEmpCount;

res.render("HR", {
    name: decoded.name,
    empNames, empEmails, empPasswords,
    currentPage: page,
    totalPages: Math.ceil(count / perPage),
    projectName, projectID,
    projectData,
    unassignedEmpCount,
            assignedEmpCount
});





        // res.render("HR", {
        //     name: decoded.name,
        //     empNames, empEmails, empPasswords,
        //     currentPage: page, 
        //     totalPages: Math.ceil(count / perPage) ,
        //     projectName,projectID,
        // });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};


exports.HRpageAddUserToProject = async (req,res)=>{
    const token = req.cookies.authToken;
    if (!token) return res.redirect('/login');
    const emp_email = req.body.emp_email;
    try {
        if(emp_email===''){
            return res.json({
                status : 'ERROR',
                message : 'No user entered'
            })
        }
        const emp = await employee.findOne({empEmail:emp_email})
        if (!emp) {
            return res.json({
                status: 'ERROR',
                message: 'No such user works for your organization'
            });
        }
        const decoded = validateToken(token);
        const HRemp = await employee.findOne({_id:decoded.ID});
        if (String(HRemp.companyID) !== String(emp.companyID)) { // Converting to string to ensure comparison
            return res.json({
                status: 'ERROR',
                message: 'No such user works for your organization'
            });
        }
        id = req.params.id;
        const checkUser = await PROJECT.findOne({'empsWorking':emp._id})
        if ( checkUser ){
            return res.json({
                status: 'ERROR',
                message: 'Employee already working in the Project'
            });
        }
        const addUser = await PROJECT.findByIdAndUpdate(
            id,
            {
                $push: { empsWorking: emp._id }
            },
            { new: true }
        );
        
    
        return res.json({
            status : 'SUCCESS',
            message : 'User entered'
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status : 'ERROR',
            message : 'An error occurred while adding user.'
        })
    }
}