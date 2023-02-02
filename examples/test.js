const {add} = require("nodemon/lib/rules");
const ThermalPrinter = require("../lib").default

const printer = new ThermalPrinter("/dev/usb/lp0", 17)

// in debug mode module will print commands, not execute
printer._DEBUG = true

printer.addLine("Testing print")
printer.addLine("node-thermal-printer")
printer.addSpace()
printer.addSpace()
printer.addLine("bold", {
    emphasis: true
})
printer.addLine("bold + d.height", {
    emphasis: true,
    double_height: true
})
printer.addLine("bold + d.width", {
    emphasis: true,
    double_width: true
})
printer.addLine("d.height", {
    double_height: true
})
printer.addLine("d.width", {
    double_width: true
})

printer.addLine("bold + d.height", {
    emphasis: true,
    double_height: true
})
printer.addLine("italic", {
    italic: true
})

printer.addLine("underline", {
    underline: true
})

printer.addSpace()
printer.addSpace()

printer.addLine("Hola Mundo!", {})
printer.addLine("Привет мир!", {})

printer.addQRCode("http://idkncc.ru")

printer.addLine("Test completed", {
    double_width: true
})

printer.addSpace()
printer.addSpace()
printer.addSpace()

