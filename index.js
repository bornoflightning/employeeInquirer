const inquirer = require('inquirer');
const fs = require('fs');




const managerQuestions = [
    {
        type: 'string',
        message: 'confirm role please:',
        name: 'role',
        default: 'manager'
    },
    {
        type: 'input',
        message: 'Who is the team leader?',
        name: 'name'
    },
    {
        type: 'input',
        message: "what is the manager's employee ID?",
        name: 'id' 
    },
    {
        type: 'input',
        message: "What is the team manager's e-mail?",
        name: 'email'
    },
    {
        type: 'input',
        message: "what is the manager's office number?",
        name: 'additional'
    },
    {
        type: 'confirm',
        message: 'would you like to add another employee?',
        name: 'confirm',
        
    }

];

const employeeQuestions = [
    {
        type: 'list',
        message: 'Which type of team member would you like to add?',
        name: 'teamMember',
        choices: ['Engineer', 'Intern']
    }
];

const engineerQuestions = [
    {
        type: 'string',
        message: 'confirm role please:',
        name: 'role',
        default: 'engineer'
    },
    {
        type: 'input',
        message: 'What is the name of the engineer?',
        name: 'name'
    },
    {
        type: 'input',
        message: 'What is the ID number of the engineer?',
        name: 'id'
    },
    {
        type: 'input',
        message: 'What is the e-mail address of the engineer?',
        name: 'email'
    },
    {
        type: 'input',
        message: 'What is the github username of the engineer?',
        name: 'additional'
    },
    {
        type: 'confirm',
        message: 'would you like to add another employee?',
        name: 'confirm',   
    }

]

const internQuestions = [
    {
        type: 'string',
        message: 'confirm role please:',
        name: 'role',
        default: 'intern'
    },
    {
        type: 'input',
        message: 'What is the name of the intern?',
        name: 'name'
    },
    {
        type: 'input',
        message: 'What is the ID number of the intern?',
        name: 'id'
    },
    {
        type: 'input',
        message: 'What is the e-mail address of the intern?',
        name: 'email'
    },
    {
        type: 'input',
        message: 'What is the name of the school of the intern?',
        name: 'additional'
    },
    {
        type: 'confirm',
        message: 'would you like to add another employee?',
        name: 'confirm',   
    }
]

const generateCard = ({name, id, email, additional, role}) => {
     function roleInfo(role) {
        if (role == 'manager') {
            return `<p class="bottom">office number: ${additional}</p>`

        } else if (role == 'engineer') {
            return `<p class="bottom"><a href="http://github.com/${additional}">github: github.com/${additional}</a></p>`
        } else {
            return `<p class="bottom">School: ${additional}</p>`
        }
    }

    let paragraph = roleInfo(role)
    const div = 
    `<div class="card" id="card">
        <div class="cardHeader" id="cardHeader">
            <h1>${name}</h1>
            <h2>${role}</h2>
        </div>
        <div class="cardInfo">
            <div class="employeeCardDetails">
                <p class="top">ID: ${id}</p>
                <p class="middle"><a href="mailto:${email}">email: ${email}</a></p>\n`
                + paragraph +      
            `\n</div>
        </div>
    </div>
    `;
    return div
};

function writeToFile(fileName, data) {
    fs.appendFile(fileName, data, (err)=> {
        err ? console.log(err) : console.log("Your card was added!!");
    });
}
inquirer.prompt([
    ...managerQuestions
])
.then((answers) => {
    const card = generateCard(answers);
    writeToFile('index.html', card);
    if (answers.confirm === true) {
        return inquirer.prompt([
            ...employeeQuestions
            
        ])
    }
})
.then(answers => {
    if(answers.teamMember === 'Engineer') {
        return inquirer.prompt([
            ...engineerQuestions
        ])
    } else {
        return inquirer.prompt([
            ...internQuestions
        ])
    }
})
.then(answers => {
    const card = generateCard(answers);
    writeToFile('index.html', card);
    if (answers.confirm === true) {
        return inquirer.prompt([
            ...employeeQuestions
            
        ])
    }
})
.then(answers => {
    if(answers.teamMember === 'Engineer') {
        return inquirer.prompt([
            ...engineerQuestions
        ])
    } else {
        return inquirer.prompt([
            ...internQuestions
        ])
    }
})
.then(answers => {
    const card = generateCard(answers);
    writeToFile('index.html', card);
});