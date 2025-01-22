const Project = require('../models/projectSchema');

exports.empRole = async (ID) => {
    try {
        const roles = ['PM', 'QA', 'HR', 'SE', 'FO', 'govQA', 'govHR'];
        for (const role of roles) {
            const query = {};
            query[`empRoles.${role}`] = ID; 
            const project = await Project.findOne(query);
            if (project) {
                return({
                    status : "Success",
                    projectName : project.projectName,
                    projectID : project._id,
                    projectDescription :project.projectDescription,
                    role : role,
                })
            }
        }
        return({
            status : 'ERROR 403'
        })

    } catch (error) {
        console.error('Error fetching employee role:', error);
        throw error;
    }
};
