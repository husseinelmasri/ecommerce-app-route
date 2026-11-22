import { LoginSchemaType, RegisterSchemaType } from '@/lib/schemas/auth.schema';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log(baseUrl);

export async function SignupUser(formData: RegisterSchemaType) {
  const response = await fetch(`${baseUrl}/api/v1/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}

export async function SigninUser(formData: LoginSchemaType) {
  const response = await fetch(`${baseUrl}/api/v1/auth/signin`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return data;
}
