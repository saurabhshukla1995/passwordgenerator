import { useCallback, useEffect, useState, useRef } from "react";

function PasswordGenerator() {
    const [length, setLength] = useState(8);
    const [number, setNumber] = useState(false);
    const [charcter, setCharcter] = useState(false);
    const [password, setPassword] = useState('');
    
    const passwordGen = useCallback(() => {
        let pass = '';
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        if (number) str += '0123456789';
        if (charcter) str += '!@#$%^&*()_';

        for (let i = 1; i <= length; i++) {          
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);            
        }
        setPassword(pass);
    }, [length, number, charcter, setPassword]);

    const passwordRef = useRef(null);

    const copyPasswordToClipBoard = useCallback(() => {
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0, 999);
        window.navigator.clipboard.writeText(password)
    }, [password])

    useEffect(() => {
            passwordGen();
    }, [length, number, charcter, passwordGen]);
    
    return (
        <div className="text-center">
            <h2 className="font-bold text-3xl m-10">Generate password</h2>
            <div>
                <input type='text' value={password} className="px-20 py-1" placeholder="password" readOnly ref={passwordRef}/>
                <button className="rounded-tr-xl bg-black text-white w-20 h-8 text-center" onClick={copyPasswordToClipBoard}>Copy</button>
            </div>
            <div className="m-3">                
            <input type="range" min={6} max={100} value={length}
            onChange={(e) => {setLength(e.target.value)}} />
            <label>Length : {length}</label>
            <input type="checkbox" defaultChecked={number} className="" 
            onChange={() => {setNumber((prev) => !prev)}} />
            <label>Numebers</label>
            <input type="checkbox" defaultChecked={number} className="" 
            onChange={() => {setCharcter((prev) => !prev)}} />
            <label>Charcter</label>
            </div>
        </div>
    )
}
export default PasswordGenerator;