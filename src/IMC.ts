export function calculateIMC(weight: number, height: number): number {
    return weight / (height * height)
}

export function imcResult(imc: number): string {
    if(imc < 0) {
        return 'Muito abaixo do peso'
    } else if(imc < 18.5) {
        return 'Abaixo do peso'
    } else if(imc < 24.9) {
        return 'Peso normal'
    } else if(imc < 29.9) {
        return 'Sobrepeso'
    } else if(imc < 34.9) {
        return 'Obesidade grau 1'
    } else if(imc < 39.9) {
        return 'Obesidade grau 2'
    } else {
        return 'Obesidade grau 3'
    }

}