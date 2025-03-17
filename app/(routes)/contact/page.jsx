'use client';

import { useState } from 'react';
import TerminalWindow from '@/components/ui/TerminalWindow';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className='space-y-8'>
      <TerminalWindow title='~/contact'>
        <div className='space-y-6'>
          <p className='text-xl text-terminal-muted font-terminus'>
            Drop me a line, say hi, or ask me a question. I'll get back to you
            as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label htmlFor='name' className='block text-terminal-text mb-1'>
                Name
              </label>
              <input
                type='text'
                id='name'
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className='w-full bg-terminal-light border border-terminal-border rounded px-3 py-2 text-terminal-text focus:outline-none focus:border-terminal-green'
                required
              />
            </div>

            <div>
              <label htmlFor='email' className='block text-terminal-text mb-1'>
                Email
              </label>
              <input
                type='email'
                id='email'
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className='w-full bg-terminal-light border border-terminal-border rounded px-3 py-2 text-terminal-text focus:outline-none focus:border-terminal-green'
                required
              />
            </div>

            <div>
              <label
                htmlFor='subject'
                className='block text-terminal-text mb-1'
              >
                Subject
              </label>
              <input
                type='text'
                id='subject'
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
                }
                className='w-full bg-terminal-light border border-terminal-border rounded px-3 py-2 text-terminal-text focus:outline-none focus:border-terminal-green'
                required
              />
            </div>

            <div>
              <label
                htmlFor='message'
                className='block text-terminal-text mb-1'
              >
                Message
              </label>
              <textarea
                id='message'
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className='w-full bg-terminal-light border border-terminal-border rounded px-3 py-2 text-terminal-text focus:outline-none focus:border-terminal-green h-32'
                required
              />
            </div>

            <Button
              type='submit'
              disabled={status === 'loading'}
              className='w-full'
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>

            {status === 'success' && (
              <p className='text-terminal-green'>Message sent successfully!</p>
            )}

            {status === 'error' && (
              <p className='text-terminal-red'>
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </TerminalWindow>
    </div>
  );
}
