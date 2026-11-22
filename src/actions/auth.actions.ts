'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function forgotPassword(data: { email: string }) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/forgotPasswords`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to send code');
    return result;
  } catch (error: any) {
    return { statusMsg: 'fail', message: error.message };
  }
}

export async function verifyResetCode(data: { resetCode: string }) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/verifyResetCode`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to verify code');
    return result;
  } catch (error: any) {
    return { status: 'fail', message: error.message };
  }
}

export async function resetPassword(data: {
  email: string;
  newPassword: string;
}) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/resetPassword`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to reset password');
    return result;
  } catch (error: any) {
    return { status: 'fail', message: error.message };
  }
}
