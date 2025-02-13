"use client"
import { title } from "process";
import Card, { typePergunta } from "./Componentes/Card";
import style from "./Style/style.module.css"

function Page() {

  let asks: typePergunta[] = [
    {
      title: "Qual o nome do processo de derrentimento do gelo?",
      alternativas: ['Ebulição', 'Água', 'Geleira', 'fusão'],
      alternativaCorreta: 3
    },
    {
      title: "Qual país tem a bandeira verde?",
      alternativas: ['Brasil', 'Estados Unidos', 'Espanha', 'Portugal'],
      alternativaCorreta: 0
    },
    {
      title: "Qual a capital do Brasil?",
      alternativas: ['Paquistão', 'Ceará', 'Brasília', 'João Pessoa'],
      alternativaCorreta: 2
    }

  ]

  return (
    <>
      <Card title="Quiz de culinária" questions={asks} />
    </>
  )
}

export default Page;

