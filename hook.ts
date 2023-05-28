import {attach, getUsbDevice, Device, Message} from 'frida';
import fs from "fs";
import path from "path";
import util from "util";
import {print} from "./utils/common";

const readFile = util.promisify(fs.readFile);

function onMessage(message: Message, data: Buffer | null) {
    if (message.type === 'send') {
        console.log(message.payload);
    } else if (message.type === 'error') {
        console.error(message.stack);
    }
}

function onError(error: Error) {
    console.error(error.stack);
}

(async () => {
    const source = await readFile(path.join(__dirname, '_agent.js'), 'utf8');
    const device: Device = await getUsbDevice();
    const process = await device.getProcess("猿人学2022");
    const session = await attach(process.pid);
    const script = await session.createScript(source)
    script.message.connect(onMessage);
    print('[*] Running CTF')
    await script.load();
})().catch(onError)