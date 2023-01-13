makerbit.onIrDatagram(function () {
    serial.writeLine(makerbit.irDatagram())
    maqueen.motorStop(maqueen.Motors.All)
    basic.showIcon(IconNames.Yes)
    if (convertToText(makerbit.irDatagram()).includes("FF02FD")) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (convertToText(makerbit.irDatagram()).includes("FF22DD")) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 100)
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
    } else if (convertToText(makerbit.irDatagram()).includes("FFA25D")) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 70)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 70)
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        basic.pause(300)
        maqueen.motorStop(maqueen.Motors.All)
    } else if (convertToText(makerbit.irDatagram()).includes("FFE21D")) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 70)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 70)
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        basic.pause(300)
        maqueen.motorStop(maqueen.Motors.All)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
        basic.showIcon(IconNames.No)
    }
})
/**
 * This program uses the Maqueen extension and also the MakerBit IR Receiver extension.
 * 
 * It is necessary to use the NEC format and ensure the IR receiver is connected to P16
 */
makerbit.connectIrReceiver(DigitalPin.P16, IrProtocol.NEC)
basic.showIcon(IconNames.Happy)
