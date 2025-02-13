"use client"
import style from "@/app/Style/style.module.css"
import { useState } from "react";

export interface typePergunta {
    title: string;
    alternativas: string[];
    alternativaCorreta: number;
}

interface prop {
    title: string;
    questions: typePergunta[];
}

const Card = ({ title, questions }: prop) => {

    const handleAlternativeClick = (key: number) => {
        if (selected.includes(key) || finalizado) return
        else if (questions[questNumber].alternativaCorreta === key) setFinalizado(true)

        let novoSelecionado = [...selected, key]
        setSelected(novoSelecionado)

        setStoryAcerts(prev => {
            let novoHistorico = [...prev];
            novoHistorico[questNumber] = novoSelecionado;
            return novoHistorico;
        })
    }

    const handleClickNext = () => {
        if (questNumber >= questions.length - 1) {
            setShowResults(true);
            return;
        }

        if (finalizado === true) {
            setFinalizado(false)
            setStoryAcerts(prev => {
                let novoHistorico = [...prev];
                novoHistorico[questNumber] = [...selected];
                return novoHistorico;
            });
            setSelected([])
        }

        setQuestNumber(questNumber + 1)

        let proximaSelecao = storyAcerts[questNumber + 1] || []
        setSelected(proximaSelecao)
        setFinalizado(proximaSelecao.includes(questions[questNumber + 1]?.alternativaCorreta))
    }

    const handleClickBack = () => {
        if (questNumber <= 0) return

        setQuestNumber(questNumber - 1)

        const previousSelection = storyAcerts[questNumber - 1] || []
        setSelected(previousSelection)

        setFinalizado(previousSelection.includes(questions[questNumber - 1]?.alternativaCorreta))
    }

    const handleRestart = () => {
        setQuestNumber(0)
        setSelected([])
        setFinalizado(false)
        setStoryAcerts(Array(questions.length).fill([]))
        setShowResults(false)
    }

    const [storyAcerts, setStoryAcerts] = useState<number[][]>(Array(questions.length).fill([]))
    const [questNumber, setQuestNumber] = useState(0)
    const [selected, setSelected] = useState<number[]>([])
    const [finalizado, setFinalizado] = useState<boolean>(false)
    const [showResults, setShowResults] = useState<boolean>(false)

    const totalAcertos = storyAcerts.filter((respostas, index) =>
        respostas.includes(questions[index].alternativaCorreta)
    ).length

    if (showResults) {
        return (
            <div className={style.containerResultados}>
                <h2>Resultado Final</h2>
                <p>✅ Acertos: {totalAcertos}</p>
                <p>❌ Erros: {questions.length - totalAcertos}</p>
                <button className={style.buttonNextEndBack} onClick={handleRestart}>🔄 Refazer Quiz</button>
            </div>
        )
    }

    return (
        <>
            <button className={style.buttonNextEndBack} onClick={handleClickBack}> ⬅ </button>
            <div className={style.containerCard}>
                <header className={style.header}>{title}</header>
                <div className={style.bodyCard}>
                    <div>{questions[questNumber].title}</div>
                    <div className={style.containerAlternativas}>
                        {questions[questNumber].alternativas.map((item, key) =>
                            <div
                                className={`${style.alternativa} 
                                    ${selected.includes(key) ? key === questions[questNumber].alternativaCorreta ? style.certa : style.errada : ""} 
                                    ${finalizado ? key === questions[questNumber].alternativaCorreta ? style.certo : style.errada : ""}`}
                                key={key}
                                onClick={() => handleAlternativeClick(key)}
                            >
                                <p>{item}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="rodape">{questNumber + 1} de {questions.length} pergunta(s)</div>
            </div>
            <button className={style.buttonNextEndBack} onClick={handleClickNext}> ⮕</button>
        </>
    )
}

export default Card; // qual css eu devo por para que os botões next e back fiquem em baixo do card quando for em uma resolução a baixo de 480px(celulares) ?
