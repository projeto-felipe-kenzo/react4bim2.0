import {useState, useEffect} from 'react'
import {useLocation } from 'react-router-dom'

import Message from "../layout/Message"
import styles from './Projects.module.css'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from "../project/ProjectCard"

function Projects () {
    const location = useLocation()
    let message =''
    if (location.state) {
        message = location.state.message
    }
    const [projects, setProjects] = useState ([])

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },

        }).then (resp => resp.json())
        .then((data) => {
            console.log(data)
            setProjects(data)
        })

        .catch((err) => console.log(err))

    }, [])

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>  
                <LinkButton to="/newprojects" text="Criar Projeto" />
            </div>
            {message && <Message type="sucess" msg={message} /> }
            
             
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => <ProjectCard
                    name={project.name}
                    budget={project.budget}
                    category={project.category.name}
                    key={project.id}
                    /> )}
            </Container>
        </div>
    )
}

export default Projects