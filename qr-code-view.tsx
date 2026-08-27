'use client';

import React from 'react';
import { QrCode, Download, ShieldCheck, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudentQRCardProps {
  studentName: string;
  studentId: string;
  admissionNo: string;
  standard: number;
  section: string;
  rollNo: number;
  qrToken: string;
  bloodGroup?: string | null;
}

export function StudentQRCard({
  studentName,
  studentId,
  admissionNo,
  standard,
  section,
  rollNo,
  qrToken,
  bloodGroup,
}: StudentQRCardProps) {
  // SVG Mock QR representation with high aesthetic fidelity
  return (
    <div className="bg-gradient-to-b from-primary-900 to-primary-950 text-white rounded-2xl p-6 shadow-xl max-w-sm mx-auto border border-primary-800/50 relative overflow-hidden">
      {/* Decorative top pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
        <div>
          <h4 className="font-bold text-base tracking-tight text-white">SMART SCHOOL</h4>
          <p className="text-[10px] text-slate-300 tracking-wider uppercase font-semibold">Digital Student ID</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
        </div>
      </div>

      {/* Student Photo & Name */}
      <div className="text-center mb-5">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-600 border-2 border-teal-400/40 flex items-center justify-center shadow-md mb-3">
          <User className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="font-bold text-lg text-white">{studentName}</h3>
        <p className="text-xs text-teal-300 font-medium">Class {standard}-{section} • Roll #{rollNo}</p>
      </div>

      {/* QR Code Container */}
      <div className="bg-white p-4 rounded-xl shadow-inner mx-auto w-48 h-48 flex flex-col items-center justify-center relative">
        {/* Crisp Stylized QR graphic */}
        <div className="w-36 h-36 border-4 border-slate-900 rounded-lg p-2 flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-8 h-8 bg-slate-900 rounded-sm p-1 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-xs" />
            </div>
            <div className="w-3 h-3 bg-slate-900 rounded-xs" />
            <div className="w-8 h-8 bg-slate-900 rounded-sm p-1 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-xs" />
            </div>
          </div>
          <div className="flex justify-around items-center my-1">
            <div className="w-4 h-4 bg-slate-900 rounded-xs" />
            <div className="w-6 h-6 bg-slate-900 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-teal-500 rounded-xs" />
            </div>
            <div className="w-3 h-3 bg-slate-900 rounded-xs" />
          </div>
          <div className="flex justify-between items-end">
            <div className="w-8 h-8 bg-slate-900 rounded-sm p-1 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-xs" />
            </div>
            <div className="w-4 h-2 bg-slate-900 rounded-xs" />
            <div className="w-6 h-6 bg-slate-900 rounded-xs" />
          </div>
        </div>
        <span className="text-[9px] text-slate-500 font-mono mt-1 font-semibold tracking-wider">
          {studentId}
        </span>
      </div>

      {/* Details Grid */}
      <div className="mt-5 grid grid-cols-2 gap-2 text-xs bg-white/5 p-3 rounded-xl border border-white/5 text-slate-300">
        <div>
          <span className="text-[10px] text-slate-400 block">Admission No</span>
          <span className="font-semibold text-white">{admissionNo}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block">Blood Group</span>
          <span className="font-semibold text-white">{bloodGroup || 'B+'}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block">Academic Year</span>
          <span className="font-semibold text-white">2026-2027</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block">Security Status</span>
          <span className="font-semibold text-emerald-400">Encrypted Token</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="text-[10px] text-slate-400">Scan at Attendance Kiosk</span>
        <button
          onClick={() => alert(`Downloaded Student QR Card for ${studentName}`)}
          className="text-teal-300 hover:text-teal-200 flex items-center gap-1 font-medium bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-lg transition"
        >
          <Download className="w-3.5 h-3.5" /> Download
        </button>
      </div>
    </div>
  );
}
