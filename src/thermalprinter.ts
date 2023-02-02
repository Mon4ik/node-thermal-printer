import {spawnSync} from "child_process";

export type AddLineOptions = {
	font: "A" | "B"
	emphasis: boolean,
	double_height: boolean,
	double_width: boolean,
	italic: boolean,
	underline: boolean,
}

export enum CharacterCodePages {
	ASCII = 0,
	CP437 = 3,
	CP808 = 17,
	GeorgianMkhedruli = 18
}


export default class ThermalPrinter {
	private readonly linux_file: string

	public _DEBUG = false

	constructor(linux_file: string, encoding: CharacterCodePages = 0) {
		this.linux_file = linux_file

		this.exec(0x1B, 0x40)
		this.exec(0x1B, 0x74, encoding)
	}

	exec(...buffer: number[] | string[]) {
		let command = ""
		if (buffer.some((c) => typeof c === "string")) { // if it has any string
			command = `echo "${buffer.join("")}" > ${this.linux_file}`
		} else {
			command = `echo -en "${buffer.map((n) => '\\x' + n.toString(16)).join('')}" > ${this.linux_file}`
		}

		if (this._DEBUG) {
			console.log("$ " + command)
		} else {
			spawnSync("bash", ["-c", command])
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
		this.exec("")
	}

	addQRCode(data: string) {
		this.addSpace()

		this.exec(0x1c, 0x7d, 0x25)
		this.exec(data.length)
		this.exec(data)

		this.addSpace()
	}

}