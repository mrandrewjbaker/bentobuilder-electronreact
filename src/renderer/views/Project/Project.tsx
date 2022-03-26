import { ReactEventHandler, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import styles from './Project.module.scss';
import { ProjectDetails } from './Project.types';


export const Project = () => {
  const navigate = useNavigate()


  const initialProjectDetails: ProjectDetails = {
    id: 0,
    name: '',
    modules: [],
  }
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({...initialProjectDetails})
  const [showModuleTypeSelector, setShowModuleTypeSelector] = useState<boolean>(false)


  const onClick_createModuleTab = () => {
    const newProjectDetails = {...projectDetails};
    newProjectDetails.modules.push({ type: 'New Module'})
    setProjectDetails(newProjectDetails);
    setShowModuleTypeSelector(true);

  }

  const onChange_moduleTypeSelector = (e: any) => {
    const newProjectDetails = {...projectDetails};
    const latestModuleIndex = newProjectDetails.modules.length - 1;
    newProjectDetails.modules[latestModuleIndex].type = e.target.value
    setProjectDetails(newProjectDetails);


  }
  
  const onSubmit_moduleTypeSelector = () => {
    setShowModuleTypeSelector(false);
  }

  const establish_projectIpc = () => {
    window.electron.ipcRenderer.once('project', (arg: any) => {
      console.log(arg);
    });
  }

  const projectIpc_create = () => window.electron.ipcRenderer.projectCreate();


  useEffect(() => {
    establish_projectIpc();
    projectIpc_create();
  }, [])

  return (
    <div className={styles.Project}>
      <div className={styles.ProjectHeader}>
        <div className={styles.ProjectTitle}>
          <p>New Project</p>
        </div>
        <ul className={styles.ProjectTabs}>
          <li onClick={onClick_createModuleTab}><MdAdd /> Create a Module</li>
          {
            projectDetails.modules.map((module, index) => {
              return (
                <li key={index}>{module.type}</li>
              );
            })
          }
        </ul>
      </div>
      <div className={styles.ProjectBody}>
        {
          showModuleTypeSelector && (
            <div className={styles.ProjectModuleTypeSelector}>
              <h2>Select Module Type</h2>
              <select onChange={onChange_moduleTypeSelector} defaultValue={'New Module'}>
                <option value={'New Module'} disabled >Select Module Type</option>
                <option value={'Application'}>Application</option>
                <option value={'Back-End'}>Back-End</option>
                <option value={'Data Store'}>Data Storage</option>
                <option value={'General Services'}>General Service</option>
              </select>
              <br />
              <button className={styles.ProjectModuleTypeSelectorButton} onClick={onSubmit_moduleTypeSelector}>Submit</button>
            </div>
          )
        }
      </div>
    </div>
  )
}