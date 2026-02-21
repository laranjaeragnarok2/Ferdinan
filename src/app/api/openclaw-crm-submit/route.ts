
import { NextRequest, NextResponse } from 'next/server';

// This is a placeholder for your actual CRM integration.
// In a real application, you would make an API call to openclaw-crm here.
async function sendToOpenClawCRM(leadData: any): Promise<boolean> {
  console.log('Simulating sending lead to openclaw-crm:', leadData);
  // Simulate a successful response for now
  return true; 
  // In a real scenario, you might have:
  // try {
  //   const response = await fetch('YOUR_OPENCLAW_CRM_API_ENDPOINT', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Add any necessary authentication headers
  //     },
  //     body: JSON.stringify(leadData),
  //   });
  //
  //   if (!response.ok) {
  //     const errorData = await response.json();
  //     console.error('Error from openclaw-crm:', errorData);
  //     return false;
  //   }
  //   return true;
  // } catch (error) {
  //   console.error('Failed to connect to openclaw-crm:', error);
  //   return false;
  // }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const role = formData.get('role') as string;

    // 1. Basic Validation
    if (!name || !email || !phone || !company || !role) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    // Basic email format validation (more robust validation should be done server-side)
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Formato de e-mail inválido.' }, { status: 400 });
    }

    // 2. Extract firstName and lastName from name
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // 3. Construct payload for openclaw-crm
    const crmPayload = {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle: role, // Mapping 'role' to 'jobTitle' as per spec
      source: 'Lead Magnet: Blueprint da Elite Digital',
    };

    // 4. Call openclaw-crm API (simulated)
    const crmSuccess = await sendToOpenClawCRM(crmPayload);

    if (crmSuccess) {
      // 5. Redirect on successful submission
      const redirectUrl = new URL('/thank-you-blueprint', request.url);
      return NextResponse.redirect(redirectUrl);
    } else {
      // 6. Handle CRM submission error
      return NextResponse.json({ message: 'Erro ao salvar o lead no CRM. Por favor, tente novamente.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Erro na submissão do formulário:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
