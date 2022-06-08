import { Menta, Quinoa, Soja, SojaTransgenica, Peperina } from '../main/plantas'

describe("plantas", () => {
    const menta = new Menta(1.0, 2008)
    const mentaPequenia = new Menta(0.3, 2018)
    const soja = new Soja(0.6, 2009)
    const soja2 = new Soja(0.8, 2010)
    const quinoa = new Quinoa(1.0, 2010, 0.2)

    it("verificar si da semillas", () => {
        expect(menta.daSemillas()).toBeTruthy()
        expect(mentaPequenia.daSemillas()).toBeFalsy()
        expect(soja.daSemillas()).toBeFalsy()
        expect(soja2.daSemillas()).toBeTruthy()
        expect(quinoa.daSemillas()).toBeTruthy()
    })

    it("verificar las horas de sol toleradas", () => {
        expect(menta.horasDeSol()).toBe(7)
        expect(soja.horasDeSol()).toBe(8)
        expect(quinoa.horasDeSol()).toBe(10)
    })

    it("verificar si es fuerte", () => {
        expect(menta.esFuerte()).toBeFalsy()
        expect(soja.esFuerte()).toBeFalsy()
        expect(quinoa.esFuerte()).toBeTruthy()
    })

    it("verificar el espacio que ocupa", () => {
        expect(menta.espacio()).toBe(2)
        expect(mentaPequenia.espacio()).toBe(1.3)
        expect(soja.espacio()).toBe(0.3)
    })

    describe("variedades de plantas: soja Trangenica y peperina", () => {
        it("La soja Trangenica no deberia dar semillas", () => {
            const sojaTrans = new SojaTransgenica(0.8, 2010)

            expect(sojaTrans.daSemillas()).toBeFalsy()
        })

        it("La peperina debe ocupar el doble de espacio que una menta con igual caracteristicas", () => {
            const peperina = new Peperina(1.0, 2008)
            expect(peperina.espacio()).toBe(menta.espacio() * 2)
        })
    })

})


