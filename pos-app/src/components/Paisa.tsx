import { useState } from "react";
import QRCode from "qrcode";
import { ethers } from "ethers";
import Image from "next/image";

export default function Paisa() {
  const [soulName, setsoulName] = useState("0xshivansh.eth");
  const [amount, setAmount] = useState(10);
  // prettier-ignore
  const [qr, setQR] = useState("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIHZpZXdCb3g9IjAgMCA1MDAgNTAwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2ZmZmZmZiIvPjxnIHRyYW5zZm9ybT0ic2NhbGUoMTUuMTUyKSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwwKSI+PGc+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMy41LDMuNSkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTS0zLjUgLTMuNUwzLjUgLTMuNUwzLjUgMy41TC0zLjUgMy41Wk0tMi41IC0yLjVMLTIuNSAyLjVMMi41IDIuNUwyLjUgLTIuNVoiIGZpbGw9IiMwMDAwMDAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0tMS41IC0xLjVMMS41IC0xLjVMMS41IDEuNUwtMS41IDEuNVoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9nPjxnPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI5LjUsMy41KSI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoOTApIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0tMy41IC0zLjVMMy41IC0zLjVMMy41IDMuNUwtMy41IDMuNVpNLTIuNSAtMi41TC0yLjUgMi41TDIuNSAyLjVMMi41IC0yLjVaIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNLTEuNSAtMS41TDEuNSAtMS41TDEuNSAxLjVMLTEuNSAxLjVaIiBmaWxsPSIjMDAwMDAwIi8+PC9nPjwvZz48L2c+PGc+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMy41LDI5LjUpIj48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtOTApIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0tMy41IC0zLjVMMy41IC0zLjVMMy41IDMuNUwtMy41IDMuNVpNLTIuNSAtMi41TC0yLjUgMi41TDIuNSAyLjVMMi41IC0yLjVaIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNLTEuNSAtMS41TDEuNSAtMS41TDEuNSAxLjVMLTEuNSAxLjVaIiBmaWxsPSIjMDAwMDAwIi8+PC9nPjwvZz48L2c+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTAgMEwxMCAyTDExIDJMMTEgMFpNMTIgMEwxMiAxTDEzIDFMMTMgMkwxMiAyTDEyIDRMMTMgNEwxMyAzTDE0IDNMMTQgNUwxMSA1TDExIDZMMTAgNkwxMCA0TDExIDRMMTEgM0w4IDNMOCA0TDkgNEw5IDVMOCA1TDggN0w5IDdMOSA4TDYgOEw2IDlMNSA5TDUgOEwwIDhMMCAxM0wxIDEzTDEgMTRMMiAxNEwyIDE1TDAgMTVMMCAxNkwxIDE2TDEgMThMMiAxOEwyIDE5TDAgMTlMMCAyNUwxIDI1TDEgMjBMMiAyMEwyIDIyTDQgMjJMNCAyNEwzIDI0TDMgMjNMMiAyM0wyIDI1TDggMjVMOCAyN0w5IDI3TDkgMjVMOCAyNUw4IDIzTDkgMjNMOSAyNEwxMCAyNEwxMCAyM0wxMSAyM0wxMSAyNUwxMCAyNUwxMCAyN0wxMSAyN0wxMSAyNUwxMiAyNUwxMiAyNkwxMyAyNkwxMyAyN0wxMiAyN0wxMiAyOUwxMyAyOUwxMyAyOEwxNCAyOEwxNCAyOUwxNSAyOUwxNSAzMEwxNiAzMEwxNiAzMUwxOCAzMUwxOCAzMkwxNyAzMkwxNyAzM0wxOCAzM0wxOCAzMkwyMCAzMkwyMCAzMUwyMSAzMUwyMSAzM0wyOCAzM0wyOCAzMkwyOSAzMkwyOSAzMUwzMCAzMUwzMCAzMEwzMiAzMEwzMiAyOUwzMyAyOUwzMyAyN0wzMiAyN0wzMiAyNkwzMSAyNkwzMSAyNEwzMyAyNEwzMyAyMkwzMiAyMkwzMiAyMEwzMyAyMEwzMyAxOUwzMiAxOUwzMiAxNkwzMyAxNkwzMyAxNUwzMiAxNUwzMiAxNEwzMSAxNEwzMSAxM0wzMiAxM0wzMiAxMkwzMyAxMkwzMyAxMEwzMiAxMEwzMiAxMkwzMSAxMkwzMSAxMUwyOSAxMUwyOSAxMEwzMSAxMEwzMSA5TDMyIDlMMzIgOEwzMSA4TDMxIDlMMzAgOUwzMCA4TDI5IDhMMjkgOUwyOCA5TDI4IDhMMjcgOEwyNyAxMEwyOCAxMEwyOCAxMUwyNyAxMUwyNyAxNEwyOCAxNEwyOCAxNUwyMCAxNUwyMCAxN0wxOCAxN0wxOCAxOEwxNyAxOEwxNyAxNUwxOCAxNUwxOCAxNkwxOSAxNkwxOSAxNUwxOCAxNUwxOCAxNEwxNyAxNEwxNyAxMkwxOCAxMkwxOCAxM0wxOSAxM0wxOSAxMkwyMCAxMkwyMCAxM0wyMSAxM0wyMSAxNEwyMyAxNEwyMyAxMkwyNSAxMkwyNSAxM0wyNCAxM0wyNCAxNEwyNiAxNEwyNiAxMkwyNSAxMkwyNSAxMUwyNiAxMUwyNiA4TDI1IDhMMjUgNkwyNCA2TDI0IDVMMjUgNUwyNSAyTDIzIDJMMjMgMUwyNSAxTDI1IDBMMjEgMEwyMSAxTDIyIDFMMjIgMkwyMCAyTDIwIDRMMTggNEwxOCA1TDIwIDVMMjAgN0wxOSA3TDE5IDZMMTggNkwxOCA4TDIwIDhMMjAgMTBMMjIgMTBMMjIgOEwyNSA4TDI1IDlMMjMgOUwyMyAxMEwyNSAxMEwyNSAxMUwxOSAxMUwxOSAxMEwxNyAxMEwxNyA2TDE2IDZMMTYgOEwxNSA4TDE1IDZMMTQgNkwxNCA1TDE1IDVMMTUgNEwxNiA0TDE2IDVMMTcgNUwxNyA0TDE2IDRMMTYgM0wxNyAzTDE3IDJMMTggMkwxOCAzTDE5IDNMMTkgMkwxOCAyTDE4IDFMMTcgMUwxNyAwTDE1IDBMMTUgMkwxNCAyTDE0IDFMMTMgMUwxMyAwWk04IDFMOCAyTDkgMkw5IDFaTTE1IDJMMTUgM0wxNiAzTDE2IDJaTTIyIDJMMjIgM0wyMyAzTDIzIDVMMjEgNUwyMSA0TDIwIDRMMjAgNUwyMSA1TDIxIDdMMjAgN0wyMCA4TDIyIDhMMjIgNkwyMyA2TDIzIDdMMjQgN0wyNCA2TDIzIDZMMjMgNUwyNCA1TDI0IDNMMjMgM0wyMyAyWk05IDZMOSA3TDEwIDdMMTAgNlpNMTEgNkwxMSA3TDEyIDdMMTIgOUwxMSA5TDExIDhMMTAgOEwxMCA5TDYgOUw2IDEwTDggMTBMOCAxMUw5IDExTDkgMTJMNyAxMkw3IDExTDYgMTFMNiAxMkw0IDEyTDQgMTFMNSAxMUw1IDEwTDQgMTBMNCA5TDEgOUwxIDEwTDIgMTBMMiAxMUwxIDExTDEgMTNMMiAxM0wyIDExTDMgMTFMMyAxNEw0IDE0TDQgMTNMNiAxM0w2IDE0TDcgMTRMNyAxNUw1IDE1TDUgMTZMNCAxNkw0IDE1TDIgMTVMMiAxN0wzIDE3TDMgMTZMNCAxNkw0IDE3TDUgMTdMNSAxOEw0IDE4TDQgMTlMMyAxOUwzIDIxTDUgMjFMNSAyMkw3IDIyTDcgMjFMOSAyMUw5IDIzTDEwIDIzTDEwIDIxTDExIDIxTDExIDIyTDEzIDIyTDEzIDIzTDEyIDIzTDEyIDI1TDE1IDI1TDE1IDI3TDE0IDI3TDE0IDI4TDE2IDI4TDE2IDMwTDE4IDMwTDE4IDMxTDIwIDMxTDIwIDMwTDIxIDMwTDIxIDI5TDIyIDI5TDIyIDMwTDIzIDMwTDIzIDMxTDIyIDMxTDIyIDMyTDIzIDMyTDIzIDMxTDI0IDMxTDI0IDMyTDI4IDMyTDI4IDMxTDI5IDMxTDI5IDMwTDMwIDMwTDMwIDI5TDI4IDI5TDI4IDMxTDI3IDMxTDI3IDI5TDI2IDI5TDI2IDMxTDI0IDMxTDI0IDMwTDI1IDMwTDI1IDI5TDI0IDI5TDI0IDI0TDE5IDI0TDE5IDI1TDIzIDI1TDIzIDI3TDIyIDI3TDIyIDI4TDE5IDI4TDE5IDI5TDE3IDI5TDE3IDI4TDE4IDI4TDE4IDI3TDIxIDI3TDIxIDI2TDE4IDI2TDE4IDI1TDE3IDI1TDE3IDI2TDE4IDI2TDE4IDI3TDE2IDI3TDE2IDI1TDE1IDI1TDE1IDI0TDE2IDI0TDE2IDIzTDE3IDIzTDE3IDI0TDE4IDI0TDE4IDIzTDIzIDIzTDIzIDIyTDI0IDIyTDI0IDIzTDI3IDIzTDI3IDI0TDI5IDI0TDI5IDIzTDI4IDIzTDI4IDIyTDI3IDIyTDI3IDIwTDI2IDIwTDI2IDE5TDI4IDE5TDI4IDIxTDI5IDIxTDI5IDE5TDMxIDE5TDMxIDIwTDMyIDIwTDMyIDE5TDMxIDE5TDMxIDE4TDI5IDE4TDI5IDE3TDMxIDE3TDMxIDE2TDMwIDE2TDMwIDE1TDMxIDE1TDMxIDE0TDMwIDE0TDMwIDE1TDI4IDE1TDI4IDE2TDI3IDE2TDI3IDE3TDI2IDE3TDI2IDE2TDIzIDE2TDIzIDE3TDIyIDE3TDIyIDE2TDIxIDE2TDIxIDE3TDIwIDE3TDIwIDE4TDE4IDE4TDE4IDE5TDE3IDE5TDE3IDE4TDE1IDE4TDE1IDE2TDE2IDE2TDE2IDE1TDE3IDE1TDE3IDE0TDE2IDE0TDE2IDEzTDE1IDEzTDE1IDEyTDE2IDEyTDE2IDExTDE1IDExTDE1IDEwTDE0IDEwTDE0IDlMMTUgOUwxNSA4TDE0IDhMMTQgNkwxMyA2TDEzIDdMMTIgN0wxMiA2Wk0xMCA5TDEwIDExTDExIDExTDExIDlaTTEyIDlMMTIgMTBMMTMgMTBMMTMgMTFMMTIgMTFMMTIgMTNMMTMgMTNMMTMgMTFMMTQgMTFMMTQgMTJMMTUgMTJMMTUgMTFMMTQgMTFMMTQgMTBMMTMgMTBMMTMgOVpNMTggMTFMMTggMTJMMTkgMTJMMTkgMTFaTTI4IDExTDI4IDE0TDI5IDE0TDI5IDExWk02IDEyTDYgMTNMNyAxM0w3IDEyWk05IDEyTDkgMTRMOCAxNEw4IDE1TDcgMTVMNyAxNkw1IDE2TDUgMTdMOCAxN0w4IDE4TDkgMThMOSAyMUwxMCAyMUwxMCAyMEwxMSAyMEwxMSAxOEw5IDE4TDkgMTRMMTAgMTRMMTAgMTNMMTEgMTNMMTEgMTJaTTExIDE0TDExIDE3TDEyIDE3TDEyIDE4TDEzIDE4TDEzIDE5TDEyIDE5TDEyIDIxTDEzIDIxTDEzIDIwTDE0IDIwTDE0IDIxTDE1IDIxTDE1IDIzTDE0IDIzTDE0IDI0TDE1IDI0TDE1IDIzTDE2IDIzTDE2IDIxTDE4IDIxTDE4IDIyTDE5IDIyTDE5IDIxTDE4IDIxTDE4IDIwTDIwIDIwTDIwIDE5TDIxIDE5TDIxIDIxTDIwIDIxTDIwIDIyTDIyIDIyTDIyIDIwTDI0IDIwTDI0IDIyTDI2IDIyTDI2IDIxTDI1IDIxTDI1IDE5TDI2IDE5TDI2IDE3TDI1IDE3TDI1IDE5TDIxIDE5TDIxIDE4TDIyIDE4TDIyIDE3TDIxIDE3TDIxIDE4TDIwIDE4TDIwIDE5TDE4IDE5TDE4IDIwTDE3IDIwTDE3IDE5TDE2IDE5TDE2IDIwTDE0IDIwTDE0IDE5TDE1IDE5TDE1IDE4TDE0IDE4TDE0IDE3TDEyIDE3TDEyIDE1TDEzIDE1TDEzIDE0Wk0yNyAxN0wyNyAxOEwyOCAxOEwyOCAxOUwyOSAxOUwyOSAxOEwyOCAxOEwyOCAxN1pNNSAxOEw1IDE5TDcgMTlMNyAxOFpNNSAyMEw1IDIxTDcgMjFMNyAyMFpNMzAgMjJMMzAgMjNMMzEgMjNMMzEgMjJaTTYgMjNMNiAyNEw3IDI0TDcgMjNaTTI1IDI1TDI1IDI4TDI4IDI4TDI4IDI1Wk0yNiAyNkwyNiAyN0wyNyAyN0wyNyAyNlpNMjkgMjZMMjkgMjdMMzAgMjdMMzAgMjhMMzEgMjhMMzEgMjlMMzIgMjlMMzIgMjdMMzEgMjdMMzEgMjZaTTggMjhMOCAzM0w5IDMzTDkgMzJMMTEgMzJMMTEgMzNMMTIgMzNMMTIgMzFMMTMgMzFMMTMgMzBMOSAzMEw5IDI5TDEwIDI5TDEwIDI4Wk0yMiAyOEwyMiAyOUwyMyAyOUwyMyAzMEwyNCAzMEwyNCAyOUwyMyAyOUwyMyAyOFpNMTkgMjlMMTkgMzBMMjAgMzBMMjAgMjlaTTE0IDMxTDE0IDMyTDE1IDMyTDE1IDMzTDE2IDMzTDE2IDMyTDE1IDMyTDE1IDMxWk0zMSAzMUwzMSAzM0wzMiAzM0wzMiAzMkwzMyAzMkwzMyAzMVoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9nPjwvc3ZnPgo=");

  const handleQR = async () => {
    if (soulName === "") return console.error("empty address");
    let address = soulName;
    // if soulName is not an address, fetch it
    if (soulName.indexOf("0x") === -1) address = await fetch(`/api?soulName=${soulName}`).then((res) => res.json().then((res) => res.address));
    if (!ethers.utils.isAddress(address)) return console.error("invalid address");
    const urlAmount = amount ? `&amount=${amount}` : "";
    const url = `ethereum:${address}?amount=${urlAmount}`;
    const qr = await QRCode.toDataURL(url, { errorCorrectionLevel: "H", type: "image/png", width: 400, margin: 3});
    setQR(qr);
    console.log({ url, qr });
  };

  return (
    <div className="m-auto">
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex ">
          <p className="text-3xl text-gray-600">Paisa POS system</p>
        </div>
        <div className="max-w-2xl">
          <div className="relative">
            <p className="text-base text-gray-600">Enter your address or .eth name</p>
            <input onChange={(e) => setsoulName(e.target.value)} value={soulName} placeholder={soulName} type="text" className="block w-1/2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-600 text-center" />
          </div>
          <div className="relative">
            <p className="text-base text-gray-600">Enter Amount</p>
            <input onChange={(e) => setAmount(Number(e.target.value))} value={amount} type="number" className="block w-1/2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-600 text-center" />
          </div>
          <div>
            <div className="flex  m-6">
              <button onClick={handleQR} className="flex bg-gray-200 px-3 py-1.5 text-base text-gray-900 ">
                REQUEST
              </button>
            </div>
          </div>
          <div className="flex">
            <Image alt="qr" width="300" height="300" src={qr} />
          </div>
        </div>
      </div>
    </div>
  );
}
