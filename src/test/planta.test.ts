import { Menta, Quinoa, Soja, SojaTransgenica, Peperina } from '../main/plantas'
import { Parcela } from '../main/parcelas'

describe("plantas", () => {
    const menta = new Menta(1.0, 2008)
    const peperina = new Menta(1.0, 2008)
    const mentaPequenia = new Menta(0.3, 2018)
    const soja = new Soja(0.6, 2009)
    const soja2 = new Soja(0.8, 2010)
    const quinoa = new Quinoa(1.0, 2010, 0.2)
    const sojaTrans = new SojaTransgenica(0.8, 2010)

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
            // const sojaTrans = new SojaTransgenica(0.8, 2010)

            expect(sojaTrans.daSemillas()).toBeFalsy()
        })

        it("La peperina debe ocupar el doble de espacio que una menta con igual caracteristicas", () => {
            const peperina = new Peperina(1.0, 2008)
            expect(peperina.espacio()).toBe(menta.espacio() * 2)
        })
    })

    describe("Parcelas ideales", () => {
        //menta y peperina
        it("una parcela mayor a 6m2 de superficie deberia ser ideal para la menta y la peperina", () => {
            const parcela = new Parcela(3.0, 3.0, 5.0)

            expect(menta.esParcelaIdeal(parcela)).toBeTruthy()
            expect(peperina.esParcelaIdeal(parcela)).toBeTruthy()
        })

        it("una parcela de 6m2 no es ideal para la menta y peperina", () => {
            const parcela = new Parcela(3.0, 2.0, 5.0)
            expect(menta.esParcelaIdeal(parcela)).toBeFalsy()
            expect(peperina.esParcelaIdeal(parcela)).toBeFalsy()
        })

        it("una parcela menor a 6m2 no es ideal para la menta y la peperina", () => {
            const parcela = new Parcela(2.0, 1.5, 5.0)

            expect(menta.esParcelaIdeal(parcela)).toBeFalsy()
        })

        //quinoa
        it("una parcela vacia deberia ser ideal para la quinoa", () => {
            const parcela = new Parcela(4.0, 2.0, 5.0)

            expect(quinoa.esParcelaIdeal(parcela)).toBeTruthy()
        })

        it("una parcela con plantas menores a 1.5mts es ideal para la quinoa", () => {
            const parcela = new Parcela(4.0, 2.0, 5.0)
            parcela.plantar(menta)
            parcela.plantar(soja)

            expect(quinoa.esParcelaIdeal(parcela)).toBeTruthy()
        })

        it("una parcela con una planta de 1.5mts es ideal para la quinoa", () => {
            const parcela = new Parcela(4.0, 4.0, 5.0)
            const menta2 = new Menta(1.5, 2005)

            parcela.plantar(menta)
            parcela.plantar(menta2)

            expect(quinoa.esParcelaIdeal(parcela)).toBeTruthy()
        })

        it("una parcela con una planta mayor a 1.5mts no es ideal para la quinoa", () => {
            const parcela = new Parcela(4.0, 4.0, 5.0)
            const menta2 = new Menta(2.0, 2005)

            parcela.plantar(menta)
            parcela.plantar(menta2)

            expect(quinoa.esParcelaIdeal(parcela)).toBeFalsy()
        })

        //soja comun
        it("una parcela que reciba la misma cantidad de sol que ella, deberia ser ideal para soja", () => {
            const parcela = new Parcela(4.0, 4.0, 8.0)

            expect(soja.esParcelaIdeal(parcela)).toBeTruthy()
        })

        it("una parcela que reciba la misma cantidad de sol que ella, deberia ser ideal para soja", () => {
            const parcela = new Parcela(4.0, 4.0, 8.0)

            expect(soja.esParcelaIdeal(parcela)).toBeTruthy()
        })

        it("una parcela que reciba mayor cantidad de sol que ella, no deberia ser ideal para soja", () => {
            const parcela = new Parcela(4.0, 4.0, 10.0)

            expect(soja.esParcelaIdeal(parcela)).toBeFalsy()
        })

        it("una parcela que reciba la menor cantidad de sol que ella, no deberia ser ideal para soja", () => {
            const parcela = new Parcela(4.0, 4.0, 6.0)

            expect(soja.esParcelaIdeal(parcela)).toBeFalsy()
        })

        //saja transgenica
        it("para la soja transgenica deberia ser ideal una parcela con un maximo de plantas de 1", () => {
            const parcela = new Parcela(5.0, 1.0, 5.0)
            expect(parcela.maxDePlantas()).toEqual(1)

            expect(sojaTrans.esParcelaIdeal(parcela)).toBeTruthy()
        })

        it("una parcela con un maximo de plantas mayor a 1 no deberia ser ideal para la soja transgenica", () => {
            const parcela = new Parcela(5.0, 5.0, 5.0)
            expect(parcela.maxDePlantas() > 1).toBeTruthy()

            expect(sojaTrans.esParcelaIdeal(parcela)).toBeFalsy()
        })

    })
})




