import React, { useState } from 'react';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Student',
        department: '',
        year: '',
        rollNumber: ''
    });
    const [statusMessage, setStatusMessage] = useState(null);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage("Ergaa iccitii terminal sarvariitti ergaa jira...");
        
        // Render Environment Variable irraa URL sarvarii backend fudhachuu
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const endpoint = isLogin ? `${baseUrl}/api/auth/login` : `${baseUrl}/api/auth/register`;
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                if (isLogin) {
                    localStorage.setItem('hub_token', data.token);
                    localStorage.setItem('user_role', data.user.role);
                    setStatusMessage("✅ Seensi kee milkaa'eera! Gara dashboard terminal'tti si geessaa jira...");
                    // Gara dashboard'tti fiduuf window refreshing sequence jalqabsiisuu
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    setStatusMessage("✅ Galmeessi kee milkaa'eera! Amma seensa hojjechiisuu dandeessa.");
                    setIsLogin(true);
                }
            } else {
                setStatusMessage(`❌ Dogoggora: ${data.message || "Hojichi hin milkoofne."}`);
            }
        } catch (err) {
            setStatusMessage("❌ Sarvarii wajjin wal-qunnamtii uumuun hin danda'amne.");
        }
    };

    return (
        <div className="bg-[#0f172a] min-h-screen text-slate-200 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-[#1e293b] rounded-2xl border border-slate-700 p-6 shadow-2xl">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-400">Smart Student Hub</h2>
                    <p className="text-xs text-slate-400 mt-1">
                        {isLogin ? 'Baga Nagaan Deebitee • Seensa Herregaa' : 'Hawaasa Barnootaa Haaraa Galmeessu'}
                    </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Maqaa Guutuu</label>
                            <input 
                                type="text" name="name" required 
                                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500 text-white"
                                value={formData.name} onChange={handleInputChange} placeholder="Maqaa kee galchi" 
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">E-mail Dhaabbataa</label>
                        <input 
                            type="email" name="email" required 
                            className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500 text-white"
                            value={formData.email} onChange={handleInputChange} placeholder="example@hub.edu" 
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Koodii Iccitii (Password)</label>
                        <input 
                            type="password" name="password" required 
                            className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500 text-white"
                            value={formData.password} onChange={handleInputChange} placeholder="••••••••" 
                        />
                    </div>

                    {!isLogin && (
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Gahee Hojii</label>
                                <select 
                                    name="role" className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none text-white"
                                    value={formData.role} onChange={handleInputChange}
                                >
                                    <option value="Student">Student (Barataa)</option>
                                    <option value="Teacher">Teacher (Barsiisaa)</option>
                                    <option value="Admin">Admin (To'ataa)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Koodii Eenyummaa</label>
                                <input 
                                    type="text" name="rollNumber" required
                                    className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none text-white"
                                    value={formData.rollNumber} onChange={handleInputChange} placeholder="ID ykn Roll No" 
                                />
                            </div>
                        </div>
                    )}

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-3 rounded-lg text-sm transition-colors mt-2 shadow-lg">
                        {isLogin ? 'Gara Terminal Seeni' : 'Herrega Haaraa Uumi'}
                    </button>
                </form>

                <div className="mt-5 text-center border-t border-slate-800 pt-4">
                    <button onClick={() => { setIsLogin(!isLogin); setStatusMessage(null); }} className="text-xs text-blue-400 hover:underline">
                        {isLogin ? "Herrega hin qabduu? Asitti galmaayi" : "Duraan herrega qabda? Gara seensatti deebi'i"}
                    </button>
                </div>

                {statusMessage && (
                    <div className="mt-4 p-2 bg-[#0f172a] border border-slate-800 rounded text-center text-xs font-mono text-slate-300">
                        {statusMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
