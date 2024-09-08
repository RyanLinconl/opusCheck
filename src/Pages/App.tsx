import React, { useEffect, useState } from 'react';
import Cronometro from '../components/Cronometro';
import Formulario from '../components/Formulario';
import Lista from '../components/Lista';
import { ITarefa } from '../types/tarefa';
import style from './App.module.scss';
import Banner from '../components/Banner';
import DarkMode from '../components/DarkMode';

const somConcluido = new Audio('/sounds/checkMark.mp3');
somConcluido.volume = 0.3;

function App() {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [selecionado, setSelecionado] = useState<ITarefa>();

  function selecionaTarefa(tarefaSelecionada: ITarefa) {
    setSelecionado(tarefaSelecionada);
    setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => ({
      ...tarefa,
      selecionado: tarefa.id === tarefaSelecionada.id ? true : false
    })));
  }

  function finalizarTarefa() {
    if (selecionado) {
      somConcluido.play();

      if(Notification.permission === "granted") {
        new Notification("Tarefa Finalizada!", {
          body: `A tarefa "${selecionado.id}" foi concluída!`
        });
      }

      setSelecionado(undefined);
      setTarefas(tarefasAnteriores =>
        tarefasAnteriores.map(tarefa => {
          if (tarefa.id === selecionado.id) {
            return {
              ...tarefa,
              selecionado: false,
              completado: true
            }
          }
          return tarefa
        }))
    }
  }

  React.useEffect(() => {
    if(Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className={style.AppStyle}>
      <div>
        <Banner />
      </div>
      <DarkMode />
      <Formulario setTarefas={setTarefas} />
      <Lista
        Tarefas={tarefas}
        selecionaTarefa={selecionaTarefa}
      />
      <Cronometro
        selecionado={selecionado}
        finalizarTarefa={finalizarTarefa}
      />
    </div>   
  );
}

export default App;