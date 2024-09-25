'use client';
import { useState } from 'react';

export default function CreateTeam() {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);  // Reset any previous errors

    fetch('/api/createTeam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamName: 'Your Team Name',
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Team created:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create a New Team</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Team Name:</label>
          <input
            id="name"
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Create Team
        </button>
      </form>

      {success && (
        <p className="mt-4 text-green-600">Team created successfully!</p>
      )}

      {error && (
        <p className="mt-4 text-red-600">Error: {error}</p>
      )}
    </div>
  );
}
