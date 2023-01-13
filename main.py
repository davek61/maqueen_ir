def on_ir_datagram():
    serial.write_line(makerbit.ir_datagram())
    maqueen.motor_stop(maqueen.Motors.ALL)
    basic.show_icon(IconNames.YES)
    if convert_to_text(makerbit.ir_datagram()).includes("FF02FD"):
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 100)
        basic.show_leds("""
            . . # . .
                        . # # # .
                        # . # . #
                        . . # . .
                        . . # . .
        """)
    elif convert_to_text(makerbit.ir_datagram()).includes("FF22DD"):
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CCW, 100)
        basic.show_leds("""
            . . # . .
                        . . # . .
                        # . # . #
                        . # # # .
                        . . # . .
        """)
    elif convert_to_text(makerbit.ir_datagram()).includes("FFA25D"):
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 70)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 70)
        basic.show_leds("""
            . . # . .
                        . . . # .
                        # # # # #
                        . . . # .
                        . . # . .
        """)
        basic.pause(300)
        maqueen.motor_stop(maqueen.Motors.ALL)
    elif convert_to_text(makerbit.ir_datagram()).includes("FFE21D"):
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 70)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 70)
        basic.show_leds("""
            . . # . .
                        . # . . .
                        # # # # #
                        . # . . .
                        . . # . .
        """)
        basic.pause(300)
        maqueen.motor_stop(maqueen.Motors.ALL)
    else:
        maqueen.motor_stop(maqueen.Motors.ALL)
        basic.show_icon(IconNames.NO)
makerbit.on_ir_datagram(on_ir_datagram)

# This program uses the Maqueen extension and also the MakerBit IR Receiver extension.
# 
# It is necessary to use the NEC format and ensure the IR receiver is connected to P16
makerbit.connect_ir_receiver(DigitalPin.P16, IrProtocol.NEC)
basic.show_icon(IconNames.HAPPY)