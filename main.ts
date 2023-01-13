function Left (num: number) {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, num)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, num)
    basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        `)
    basic.pause(300)
    maqueen.motorStop(maqueen.Motors.All)
}
function Forward (num: number, sprite2: game.LedSprite) {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, num)
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
}
function Right (num: number) {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, num)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, num)
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    basic.pause(300)
    maqueen.motorStop(maqueen.Motors.All)
}
makerbit.onIrDatagram(function () {
    maqueen.motorStop(maqueen.Motors.All)
    music.playTone(262, music.beat(BeatFraction.Whole))
    basic.showIcon(IconNames.Yes)
    if (convertToText(makerbit.irDatagram()).includes("FF02FD")) {
        let sprite: game.LedSprite = null
        Forward(100, sprite)
    } else if (convertToText(makerbit.irDatagram()).includes("FF22DD")) {
        Backward(100)
    } else if (convertToText(makerbit.irDatagram()).includes("FFA25D")) {
        Left(100)
    } else if (convertToText(makerbit.irDatagram()).includes("FFE21D")) {
        Right(100)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
        basic.showIcon(IconNames.No)
    }
})
function Backward (num: number) {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, num)
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
}
// This program uses the Maqueen extension and also the MakerBit IR Receiver extension.
// 
// It is necessary to use the NEC format and ensure the IR receiver is connected to P16
makerbit.connectIrReceiver(DigitalPin.P16, IrProtocol.NEC)
basic.showIcon(IconNames.Happy)
