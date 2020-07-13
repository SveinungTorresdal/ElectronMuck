import { ipcRenderer } from "electron";
window.ipcRenderer = ipcRenderer;

window.Telnet = require("telnet-client");
