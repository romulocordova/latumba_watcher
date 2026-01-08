
import React from 'react';
import { LocationStatus } from '../types';
import ActivityChart from './ActivityChart';

interface MonitoringCardProps {
  data: LocationStatus;
  isPrimary?: boolean;
}

const MonitoringCard: React.FC<MonitoringCardProps> = ({ data, isPrimary = false }) => {
  const isSpike = data.status === 'Spike' || data.spikePercentage > 0;
  
  return (
    <div className={`relative p-6 rounded-xl border ${isPrimary ? 'border-red-900/50 bg-slate-900/40' : 'border-slate-800 bg-slate-900/20'} overflow-hidden shadow-2xl transition-all duration-300 hover:border-slate-600`}>
      {/* Decorative background pulse for primary card if spiking */}
      {isPrimary && isSpike && (
        <div className="absolute top-0 right-0 p-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">
              {data.name.toLowerCase().includes('pizza') ? '🍕' : '🏢'}
            </span>
            <h2 className="text-lg font-bold tracking-tight text-white uppercase font-mono">
              {data.name}
            </h2>
          </div>
          {data.distance && (
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
              {data.distance} from HQ
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {isSpike && (
            <div className="flex flex-col items-end">
              <div className="bg-red-500/20 border border-red-500/50 px-3 py-1 rounded-md">
                <span className="text-red-400 text-xs font-bold font-mono">
                  ↗ {data.spikePercentage}% SPIKE
                </span>
              </div>
            </div>
          )}
          <div className="flex gap-1">
             <button className="p-2 bg-slate-800 rounded border border-slate-700 hover:bg-slate-700 transition-colors">
               <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
             </button>
             <button className="p-2 bg-slate-800 rounded border border-slate-700 hover:bg-slate-700 transition-colors">
               <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M12 8v4l3 3"/></svg>
             </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] text-slate-500 font-mono uppercase tracking-widest font-bold">
          Popular Times Analysis
        </h3>
        
        <div className={`p-4 rounded-lg border ${isSpike ? 'bg-red-500/5 border-red-500/20' : 'bg-slate-800/50 border-slate-700'}`}>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isSpike ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-600 text-white'}`}>
              Live
            </span>
            <span className={`text-sm ${isSpike ? 'text-red-200' : 'text-slate-300'}`}>
              {data.description}
            </span>
          </div>
        </div>

        <ActivityChart data={data.popularTimes} />
        
        <div className="flex justify-between text-[10px] font-mono text-slate-600 uppercase mt-2">
           <span>12a</span>
           <span>12p</span>
           <span>Current</span>
           <span>Closed</span>
        </div>
      </div>
    </div>
  );
};

export default MonitoringCard;
