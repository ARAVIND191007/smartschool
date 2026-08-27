'use client';

import React from 'react';
import { Search, Filter, Mail, Phone, Eye } from 'lucide-react';

const mockStudents = [
  { id: '101', name: 'Aarav Sharma', class: '10-A', attendance: '92%', grade: 'A', contact: '+91 9876543210' },
  { id: '102', name: 'Aditi Gupta', class: '10-A', attendance: '88%', grade: 'B+', contact: '+91 9876543211' },
  { id: '103', name: 'Arjun Nair', class: '10-A', attendance: '95%', grade: 'A+', contact: '+91 9876543212' },
  { id: '104', name: 'Ananya Verma', class: '10-A', attendance: '78%', grade: 'B', contact: '+91 9876543213' },
  { id: '105', name: 'Dev Patel', class: '10-A', attendance: '90%', grade: 'A', contact: '+91 9876543214' },
];

export default function TeacherStudents() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Directory</h1>
          <p className="text-slate-500">View and manage students in your classes.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Search name or roll no..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        <div className="w-full md:w-auto">
          <select className="w-full md:w-48 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 bg-white">
            <option>Class 10-A</option>
            <option>Class 9-B</option>
            <option>Class 11-A</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-600">Roll No</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Student Name</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Attendance</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Avg. Grade</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Parent Contact</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-600 font-medium">{student.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-800">{student.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      parseInt(student.attendance) >= 90 ? 'bg-emerald-100 text-emerald-700' :
                      parseInt(student.attendance) >= 75 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {student.attendance}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-700">{student.grade}</td>
                  <td className="p-4 text-sm text-slate-600 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" /> {student.contact}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-1 text-sm font-medium">
                      <Eye className="w-4 h-4" /> Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
