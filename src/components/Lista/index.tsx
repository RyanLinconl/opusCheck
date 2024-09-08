import { ITarefa } from '../../types/tarefa';
import style from './List.module.scss';
import Item from "./item";

interface Props {
    Tarefas: ITarefa[],
    selecionaTarefa: (tarefaSelecionada: ITarefa) => void
}


function Lista ({Tarefas, selecionaTarefa}: Props) {
    
    return (
        <aside className={style.listaTarefas}>
           <h2> Tarefas do dia: </h2>
            <ul>
                {Tarefas.map(item => (
                    <Item 
                        selecionaTarefa={selecionaTarefa}
                        key={item.id}
                        {...item}
                    />
                ))}
            </ul>
        </aside>
    )
}

export default Lista;