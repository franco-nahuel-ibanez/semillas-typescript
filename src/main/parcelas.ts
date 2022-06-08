import { Planta } from './plantas'


class Parcela {
    private ancho: number
    private largo: number
    public horasDeSol: number
    public plantas: Array<Planta> = []

    constructor(ancho: number, largo: number, horasDeSol: number) {
        this.ancho = ancho
        this.largo = largo
        this.horasDeSol = horasDeSol
    }

    superficie(): number { return this.largo * this.ancho }

    maxDePlantas(): number {
        let cantidad = (this.superficie() / 3) + this.largo
        if (this.ancho > this.largo) {
            cantidad = this.superficie() / 5
        }
        return Math.round(cantidad)
    }
    tieneComplicaciones(): boolean { return this.plantas.some(p => p.horasDeSol() < this.horasDeSol) }
    puedePlantar(planta: Planta): boolean {
        const diferencia = this.horasDeSol - planta.horasDeSol()
        return diferencia < 2 && this.plantas.length < this.maxDePlantas()
    }

    plantar(planta: Planta): void {
        if (!this.puedePlantar(planta)) {
            throw Error("No puede ser plantada")
        }
        this.plantas.push(planta)
    }
}

export { Parcela }