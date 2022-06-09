import { Menta, Soja } from '../main/plantas'
import { ParcelaEcologica } from '../main/parcelas'

describe("Parcelas", () => {
    const soja = new Soja(1.0, 2019)
    const menta = new Menta(1.0, 2008)

    const parcela1 = new ParcelaEcologica(20.0, 1.0, 10.0)
    parcela1.plantar(soja)
    parcela1.plantar(soja)
    parcela1.plantar(soja)
    parcela1.plantar(soja)

    it("deberia retornar la superficie", () => {
        expect(parcela1.superficie()).toEqual(20)
    })

    it("la cantidad maxima de plantas debe ser 4", () => {
        expect(parcela1.maxDePlantas()).toEqual(4)
    })

    it("para una parcela con un ancho de 2 y un largo de 5 la cantidad maxima es de 8", () => {
        const parcela2 = new ParcelaEcologica(2.0, 5.0, 5.0)
        expect(parcela2.maxDePlantas()).toEqual(8)
    })

    it("una parcela vacia no debe tener complicaciones", () => {
        const parcela2 = new ParcelaEcologica(5.0, 2.0, 6.0)
        expect(parcela2.tieneComplicaciones()).toBeFalsy()
    })

    it("una parcela con plantas que toleran mas sol del que ella recibe no tiene complicaciones", () => {
        const horasDeSolParcela = parcela1.horasDeSol
        expect(soja.horasDeSol() > horasDeSolParcela).toBeTruthy()
        expect(parcela1.tieneComplicaciones()).toBeFalsy()
    })

    it("una parcela que reciba mas sol del que alguna de sus plantas tolera tiene complicaciones", () => {
        const parcela2 = new ParcelaEcologica(5.0, 2.0, 8.0)
        parcela2.plantar(menta)
        parcela2.plantar(soja)

        expect(parcela2.tieneComplicaciones()).toBeTruthy()
    })

    it("debe arrojar una excepcion si se intenta superar el maximo de plantas", () => {
        expect(() => parcela1.plantar(soja)).toThrow("No puede ser plantada")
    })

})
