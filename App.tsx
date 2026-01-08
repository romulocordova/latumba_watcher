
import React, { useState, useEffect, useCallback } from 'react';
import { fetchMonitoringData } from './services/geminiService';
import { MonitorData } from './types';
import MonitoringCard from './components/MonitoringCard';

const App: React.FC = () => {
  const [data, setData] = useState<MonitorData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showNearby, setShowNearby] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const monitorData = await fetchMonitoringData();
      setData(monitorData);
    } catch (err) {
      setError("Unable to establish secure uplink to Plaza Venezuela. Signal interference detected.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 300000); // 5 min refresh
    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-lg text-white font-mono">S</div>
            <div>
              <h1 className="text-sm font-bold tracking-tighter uppercase font-mono">SEBIN Watch</h1>
              <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Plaza Venezuela HQ</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {data && (
              <div className="hidden md:block">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mr-2">Status Log</span>
                <span className="text-[10px] text-emerald-400 font-mono">{data.timestamp}</span>
              </div>
            )}
            <button 
              onClick={loadData}
              disabled={loading}
              className="p-2 bg-slate-900 rounded-full hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              <svg className={`w-4 h-4 text-slate-400 ${loading ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/><path d="M22 2v6h-6"/></svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-12">
        {loading && !data ? (
          <div className="flex flex-col items-center justify-center pt-20 space-y-6">
            <div className="w-16 h-16 border-t-2 border-r-2 border-red-500 rounded-full animate-spin"></div>
            <div className="text-center space-y-2">
              <h2 className="text-lg font-mono text-slate-400 animate-pulse">CONNECTING TO TORRE SEBIN...</h2>
              <p className="text-xs text-slate-600 uppercase tracking-widest font-mono">Encrypted satellite link in progress</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-950/20 border border-red-900 p-6 rounded-lg text-center mt-12">
            <p className="text-red-400 font-mono text-sm mb-4">{error}</p>
            <button onClick={loadData} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded transition-colors uppercase font-mono">Recalibrate Signal</button>
          </div>
        ) : data && (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest">Fixed Target: HQ</h3>
                <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest">Active Monitoring</span>
                </div>
              </div>
              <MonitoringCard data={data.primary} isPrimary={true} />
            </div>

            <div className="pt-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest">Area Activity (Pizza/Food)</h3>
                <label className="flex items-center cursor-pointer">
                  <span className="mr-3 text-[10px] text-slate-500 font-mono uppercase">Toggle Peripheral View</span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={showNearby} 
                      onChange={() => setShowNearby(!showNearby)} 
                    />
                    <div className={`block w-10 h-5 rounded-full transition-colors ${showNearby ? 'bg-red-600' : 'bg-slate-800'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${showNearby ? 'translate-x-5' : ''}`}></div>
                  </div>
                </label>
              </div>

              {showNearby && (
                <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-2">
                  {data.nearby.map((place, idx) => (
                    <MonitoringCard key={idx} data={place} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/90 border-t border-slate-900 py-3 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 flex justify-between items-center text-[8px] md:text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em]">
          <span>© S-NET SURVEILLANCE SYSTEMS</span>
          <span className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
             Fixed Target Lock
          </span>
          <span>Venezuela Terminal 01</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
