
import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'
import {useHistory} from 'react'

function NewProject () {

    const history = useHistory()

    function createPost(project){
        //initialize cost and service

        project.cost = 0
        project.services=[]

        fetch('http:/localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)

            history.push('/projects', {message:'Projeto Criado com Sucesso"'})
        })
        .catch((err) => console.log(err))
    }
    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject