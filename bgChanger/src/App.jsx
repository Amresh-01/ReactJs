import React, { useState, useCallback, useEffect, useRef } from "react";
import "./index.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // jab user copy kare to select ho jae
    passwordRef.current?.setSelectionRange(0);
    window.navigator.clipboard.writeText(password);
  }, [password]); // password pr dependecy hai..

  // ye run hoga baar baar jab dependency change hogi..
  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-700">
        <h1 className="text-3xl font-semibold text-center mb-6 text-white tracking-wide">
          Password Generator
        </h1>

        <div className="flex items-center justify-between bg-gray-900/60 rounded-full px-3 py-2 mb-6 border border-gray-700 focus-within:border-blue-500 transition">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-grow bg-transparent outline-none text-gray-100 placeholder-gray-500 text-lg px-3"
            placeholder="Your secure password..."
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all px-4 py-2 rounded-full text-white font-medium shadow-md cursor-pointer"
          >
            Copy
          </button>
        </div>
        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-300">
              Length: {length}
            </label>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className="cursor-pointer accent-blue-600 w-2/3"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-300">Include Numbers</label>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-300">
              Include Special Characters
            </label>
            <input
              type="checkbox"
              id="charInput"
              defaultChecked={charAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={passwordGenerator}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all text-white font-semibold py-2.5 rounded-full shadow-lg active:scale-95"
        >
          Generate New Password
        </button>
      </div>
    </div>
  );
}

export default App;
