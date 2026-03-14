const AppLoader = () => {
  return (
    <div className="fixed inset-0 z-[999] overflow-hidden bg-[#0a0f0d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.16),transparent_42%),linear-gradient(180deg,#0b1411_0%,#0a0f0d_100%)]" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-3xl" />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-[#d4af37]/25 bg-[#101814]/80 shadow-[0_0_60px_rgba(212,175,55,0.18)]">
          <div className="absolute inset-3 rounded-full border border-[#d4af37]/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#d4af37] border-r-[#d4af37]/40 animate-spin" />
          <span className="font-serif text-2xl tracking-[0.22em] text-[#d4af37]">AE</span>
        </div>

        <p className="text-xs uppercase tracking-[0.55em] text-[#d4af37]/70">AltaEsencia</p>
        <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">Estilo y Exclusividad</h1>
        <p className="mt-4 max-w-xl text-sm uppercase tracking-[0.22em] text-gray-400 md:text-base">
          Cargando experiencia premium
        </p>

        <div className="mt-8 h-px w-44 overflow-hidden rounded-full bg-[#d4af37]/15">
          <div className="h-full w-1/2 animate-[loaderSweep_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default AppLoader;
