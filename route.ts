import { NextRequest, NextResponse } from 'next/server';
import { mockStudents } from '@/lib/mock-data';

// In-memory record for session scans (prevents duplicate scans in active session)
const sessionScans = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const { qrToken, sessionId = 'ses-active-001', classId = 'cls-10a', subject = 'Mathematics', period = 1 } = await req.json();

    if (!qrToken) {
      return NextResponse.json({ success: false, error: 'QR Token is required' }, { status: 400 });
    }

    // Step 1: Securely locate the student using token
    const student = mockStudents.find((s) => s.qr_token === qrToken || s.student_id === qrToken);

    if (!student) {
      return NextResponse.json({
        success: false,
        error: 'Invalid QR Token. Student record not found.',
      }, { status: 404 });
    }

    // Step 2: Validate student belongs to class
    if (student.standard !== 10 || student.section !== 'A') {
      return NextResponse.json({
        success: false,
        error: `Student ${student.profile.full_name} is enrolled in ${student.standard}-${student.section}, not in class 10-A.`,
      }, { status: 403 });
    }

    // Step 3: Duplicate scan prevention
    const scanKey = `${sessionId}_${student.id}`;
    if (sessionScans.has(scanKey)) {
      return NextResponse.json({
        success: false,
        duplicate: true,
        message: `Attendance already recorded for ${student.profile.full_name} (Roll #${student.roll_number}) in this session.`,
        student: {
          id: student.id,
          name: student.profile.full_name,
          rollNumber: student.roll_number,
          studentId: student.student_id,
          class: `${student.standard}-${student.section}`,
        },
      }, { status: 409 });
    }

    // Step 4: Record attendance
    sessionScans.add(scanKey);

    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedDate = now.toISOString().split('T')[0];

    return NextResponse.json({
      success: true,
      message: 'Attendance Marked ✓',
      record: {
        id: `att-rec-${Date.now()}`,
        studentId: student.id,
        studentName: student.profile.full_name,
        rollNumber: student.roll_number,
        studentCode: student.student_id,
        class: `${student.standard}-${student.section}`,
        subject: subject,
        period: period,
        date: formattedDate,
        time: formattedTime,
        status: 'Present',
        method: 'QR Code',
      }
    });
  } catch (error: unknown) {
    console.error('QR Scan verification error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error processing scan' }, { status: 500 });
  }
}
