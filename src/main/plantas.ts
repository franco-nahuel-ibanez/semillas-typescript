
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
    abstract espacio(): number

}

class Menta extends Planta {
    constructor(altura: number, anioSemilla: number) {
        super(altura, anioSemilla)
    }

    override daSemillas(): boolean { return this.altura > 0.4 || super.daSemillas() }
    override espacio(): number { return this.altura + 1.0 }
}

class Soja extends Planta {
    constructor(altura: number, anioSemilla: number) {
        super(altura, anioSemilla)
    }

    horasDeSol(): number { if (this.altura < 0.5) { return 6 } else if (this.altura < 1) { return 8 } else { return 12 } }
    override daSemillas(): boolean { return this.esFuerte() || (this.anioSemilla > 2007 && (this.altura > 0.75 && this.altura < 0.9)) }
    espacio(): number { return this.altura / 2 }
}

class Quinoa {
    public altura: number
    public anioSemilla: number
    public espacio: number

    constructor(altura: number, anioSemilla: number, espacio: number) {
        this.altura = altura
        this.anioSemilla = anioSemilla
        this.espacio = espacio
    }

    horasDeSol(): number { return this.espacio < 0.3 ? 10 : 7 }
    esFuerte(): boolean { return this.horasDeSol() > 9 }
    daSemillas(): boolean { return this.esFuerte() || (this.anioSemilla > 2001 && this.anioSemilla < 2008) }
}

class SojaTransgenica extends Soja {
    constructor(altura: number, anioSemilla: number) {
        super(altura, anioSemilla)
    }

    override daSemillas(): boolean { return false }
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