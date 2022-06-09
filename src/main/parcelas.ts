import { Planta } from './plantas'

abstract class Parcela {
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
    abstract asociaBienA(planta: Planta): boolean
}

class ParcelaEcologica extends Parcela {
    constructor(ancho: number, largo: number, horasDeSol: number) {
        super(ancho, largo, horasDeSol)
    }

    override asociaBienA(planta: Planta): boolean {
        return !this.tieneComplicaciones() && planta.esParcelaIdeal(this)
    }
}

class ParcelaIndustrial extends Parcela {
    constructor(ancho: number, largo: number, horasDeSol: number) {
        super(ancho, largo, horasDeSol)
    }

    override asociaBienA(planta: Planta): boolean {
        return this.plantas.length <= 2 && planta.esFuerte()
    }
}

export { Parcela, ParcelaEcologica, ParcelaIndustrial }