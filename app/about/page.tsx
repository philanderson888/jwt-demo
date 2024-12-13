'use client';
import { Navigation } from '@/components/Navigation';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">About JWT Authentication Demo</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">What is JWT?</h2>
            <p className="text-gray-300 leading-relaxed">
              JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and 
              self-contained way for securely transmitting information between parties as a JSON object. 
              This information can be verified and trusted because it is digitally signed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">How This Demo Works</h2>
            <div className="space-y-3 text-gray-300">
              <p>This demo application showcases JWT authentication with the following features:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>User registration with password hashing</li>
                <li>Secure login with JWT token generation</li>
                <li>Protected routes accessible only to authenticated users</li>
                <li>Session logging for all authentication events</li>
                <li>Local storage persistence for demonstration purposes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Security Note</h2>
            <p className="text-gray-300 leading-relaxed">
              This is a demonstration application. In a production environment, you would want to implement 
              additional security measures such as:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3 text-gray-300">
              <li>Secure password policies</li>
              <li>Rate limiting</li>
              <li>HTTPS enforcement</li>
              <li>Server-side session management</li>
              <li>Secure token storage</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}