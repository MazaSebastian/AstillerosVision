"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminLogin() {
  const { login } = useAdmin();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(user, pass);
    if (!ok) setError(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dark-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-3xl p-8 md:p-10">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-red flex items-center justify-center shadow-lg shadow-brand-500/30">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">Panel de Administración</h1>
          <p className="text-dark-400 text-sm text-center mb-8">Ingresá tus credenciales para acceder</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Usuario</label>
              <input
                type="text"
                value={user}
                onChange={(e) => { setUser(e.target.value); setError(false); }}
                placeholder="admin"
                className="w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={pass}
                  onChange={(e) => { setPass(e.target.value); setError(false); }}
                  placeholder="••••••••"
                  className="w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 transition-colors">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center">
                Credenciales incorrectas
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full gradient-red text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-brand-500/20"
            >
              Ingresar
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
