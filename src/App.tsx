import { useState } from "react"
import { calculateIMC, imcResult } from "./IMC"


function App() {

  const [IMCData, setIMCData] = useState<null | { weight: number, height: number, imc: number, imcResult: string }>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData) as { weight: string, height: string }
    console.log(data)

    // handle empty fields
    const { weight, height } = data
    if (!weight || !height) {
      alert('Ops... você precisa preencher todos os campos')
      return
    }

    // parse and handle string to number
    const weightNumber = parseFloat(weight.replace(',', '.'))
    const heightNumber = parseFloat(height.replace(',', '.')) / 100

    if (isNaN(weightNumber) || isNaN(heightNumber)) {
      alert('Você precisa preencher os campos com números validos')
      return
    }

    // handle invalid numbers
    if (weightNumber < 1 || weightNumber > 300) {
      alert('O peso precisa ficar entre 1kg e 300kg')
    }

    else if (heightNumber < 0.5 || heightNumber > 2.5) {
      alert('A altura precisa ser maior que 50cm e menor que 2.5 metros ')
    }

    const imc = calculateIMC(weightNumber, heightNumber)
    const imcresult = imcResult(imc)
    console.log(imc)
    console.log(imcresult)

    //set result

    setIMCData({
      weight: weightNumber,
      height: heightNumber,
      imc: imc,
      imcResult: imcresult
    })


  }

  return (
    <main className="bg-white max-w-4xl mx-auto py-24 px-48">
      <section id="form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="weight" className="block text-neuttral-600 font-light text-sm">Peso (kg)</label>
            <input type="text" id="weight" name="weight" className=" mt-2 block w-full border border-orange-600 rounded p-3" placeholder="Insira o Peso" />
          </div>
          <div className="mt-4">
            <label htmlFor="height" className="block text-neuttral-600 font-light text-sm">Altura (cm)</label>
            <input type="text" id="height" name="height" className=" mt-2 block w-full border border-orange-600 rounded p-3" placeholder="Insira a altura" />
          </div>
          <button type="submit" className="mt-6 bg-orange-400 text-white font-bold w-full p-3">Calcular</button>
        </form>
      </section>
      <section id="result" className=" py-10 px-4 h-40">
        {IMCData ? (
          <div>
            <p className="text-center text-neutral-400 text-xl">Seu IMC é: {IMCData.imc.toFixed(2)}</p>
            <p className="text-center text-neutral-400 text-xl">Você está: {IMCData.imcResult}</p>
          </div>
        ) : (
          <p className="text-center text-neutral-400 text-xl">Saiba agora se está no seu peso ideal</p>
        )}
      </section>
      <section id="reference-table">
        <table className="mx-auto text-neutral-600 text-left">
          <thead className="bg-zinc-100 test-orange-400">
            <tr>
              <th className="px-6 py-2 ">IMC</th>
              <th className="px-6 py-2 ">Classificação</th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-orange-100 &>tr:nth-child (odd)]:bg-white [&>tr>td]:px-6 [&>tr>td]:py-1">
            <tr>
              <td>Menor que 17</td>
              <td>Muito abaixo do peso</td>
            </tr>
            <tr>
              <td>Menor que 18,5</td>
              <td>Abaixo do peso</td>
            </tr>
            <tr>
              <td>Entre 18,5 e 24,9</td>
              <td>Peso normal</td>
            </tr>
            <tr>
              <td>Entre 25 e 29,9</td>
              <td>Sobrepeso</td>
            </tr>
            <tr>
              <td>Entre 30 e 34,9</td>
              <td>Obesidade grau 1</td>
            </tr>
            <tr>
              <td>Entre 35 e 39,9</td>
              <td>Obesidade grau 2</td>
            </tr>
            <tr>
              <td>Maior que 40</td>
              <td>Obesidade grau 3</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default App
