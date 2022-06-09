import { Parcela } from './parcelas'

abstract class Planta {
    public altura: number
    public anioSemilla: number

    constructor(altura: number, anioSemilla: number) {
        this.altura = altura
        this.anioSemilla = anioSemilla
    }

    horasDeSol(): number { return 7 }
    esFuerte(): boolean { return this.horasDeSol() > 9 }
    daSemillas(): boolean { return this.esFuerte() }
    seAsociaBien(parcela: Parcela): boolean { return parcela.asociaBienA(this) }
    abstract espacio(): number
    abstract esParcelaIdeal(parcela: Parcela): boolean
}

class Menta extends Planta {
    constructor(altura: number, anioSemilla: number) {
        super(altura, anioSemilla)
    }

    override daSemillas(): boolean { return this.altura > 0.4 || super.daSemillas() }
    override espacio(): number { return this.altura + 1.0 }
    override esParcelaIdeal(parcela: Parcela): boolean {
        return parcela.superficie() > 6.0
    }
}

class Soja extends Planta {
    constructor(altura: number, anioSemilla: number) {
        super(altura, anioSemilla)
    }

    horasDeSol(): number { if (this.altura < 0.5) { return 6 } else if (this.altura < 1) { return 8 } else { return 12 } }
    override daSemillas(): boolean { return this.esFuerte() || (this.anioSemilla > 2007 && (this.altura > 0.75 && this.altura < 0.9)) }
    espacio(): number { return this.altura / 2 }
    override esParcelaIdeal(parcela: Parcela): boolean {
        return parcela.horasDeSol == this.horasDeSol()
    }
}

class Quinoa extends Planta {
    public espacioOcupa: number

    constructor(altura: number, anioSemilla: number, espacio: number) {
        super(altura, anioSemilla)
        this.espacioOcupa = espacio
    }

    horasDeSol(): number { return this.espacio() < 0.3 ? 10 : 7 }
    esFuerte(): boolean { return this.horasDeSol() > 9 }
    daSemillas(): boolean { return this.esFuerte() || (this.anioSemilla > 2001 && this.anioSemilla < 2008) }
    override espacio(): number { return this.espacioOcupa }
    override esParcelaIdeal(parcela: Parcela): boolean {
        return !parcela.plantas.some(p => p.altura > 1.5)
    }
}

class SojaTransgenica extends Soja {
    constructor(altura: number, anioSemilla: number) {
        super(altura, anioSemilla)
    }

    override daSemillas(): boolean { return false }
    override esParcelaIdeal(parcela: Parcela): boolean {
        return parcela.maxDePlantas() == 1
    }
}

class Peperina extends Menta {
    constructor(altura: number, anioSemilla: number) {
        super(altura, anioSemilla)
    }

    override espacio(): number {
        return super.espacio() * 2
    }
}

export { Planta, Menta, Soja, Quinoa, SojaTransgenica, Peperina }