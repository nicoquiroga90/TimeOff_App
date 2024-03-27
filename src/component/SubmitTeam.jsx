import { useState } from 'react';
import '../index.css';

const SubmitTeam = () => {
  const [inputCode, setInputCode] = useState('');

  const handleInputChange = (event) => {
    setInputCode(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4050/api/teams');
      if (!response.ok) {
        throw new Error('Failed to fetch teams');
      }
      const teams = await response.json();

      const team = teams.find((team) => team.team_code === inputCode);
      if (team) {
        window.alert(`Logged in to ${team.team_name}`);
      } else {
        window.alert('Invalid team code');
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
      window.alert('Failed to fetch teams');
    }
  };

  return (
    <div className="submitTeam-container">
      <label htmlFor="teamCodeInput">Join With:</label>
      <input
        type="text"
        id="teamCodeInput"
        value={inputCode}
        onChange={handleInputChange}
        placeholder=" Enter Team Code"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubmitTeam;