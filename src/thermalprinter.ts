import {Buffer} from "buffer";
import {execSync} from "child_process";

export type AddLineOptions = {
	font: "A" | "B"
	emphasis: boolean,
	double_height: boolean,
	double_width: boolean,
	italic: boolean,
	underline: boolean,


}


export default class ThermalPrinter {
	private readonly linux_file: string
	public _DEBUG = false

	constructor(linux_file: string) {
		this.linux_file = linux_file
	}

	exec(...buffer: number[] | string[]) {
		let command = ""
		if (buffer.some((c) => typeof c === "string")) { // if it has any string
			command = `echo "${buffer.join("")}" > ${this.linux_file}`
		} else {
			command = `echo -en "${buffer.map((n) => '\\x' + n.toString(16)).join("")}" > ${this.linux_file}`
		}

		if (this._DEBUG) {
			console.log("$ " + command)
		} else {
			execSync(command)
		}
	}

	addOptions(options: Partial<AddLineOptions>) {
		this.exec(0x1b, 0x21, 0x00)

		if (options.font === "B") {
			this.exec(0x1b, 0x21, 0x01)
		}
		if (options.emphasis) {
			this.exec(0x1b, 0x21, 0x08)
		}
		if (options.double_height) {
			this.exec(0x1b, 0x21, 0x10)
		}
		if (options.double_width) {
			this.exec(0x1b, 0x21, 0x20)
		}
		if (options.italic) {
			this.exec(0x1b, 0x21, 0x40)
		}
		if (options.underline) {
			this.exec(0x1b, 0x21, 0x80)
		}
	}

	addLine(text: string, options?: Partial<AddLineOptions>) {
		if (options) {
			this.addOptions(options)
		}

		this.exec(text)
	}

	addSpace() {
		this.exec(0x0A)
	}

}