import '../index.css';

const CreateTeam = ({ setTeamsDatabase }) => {
  const handleCreateTeam = async () => {
    try {
      const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      const newName = prompt("Enter new team name:");

      if (!newName) {
        return;
      }

      const response = await fetch('http://localhost:4050/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ team_name: newName, team_code: randomCode })
      });

      if (!response.ok) {
        throw new Error('Failed to create team');
      }

      setTeamsDatabase(prevTeams => [...prevTeams, { id: prevTeams.length + 1, name: newName, code: randomCode }]);
      window.alert(`New team created: ${newName} (Code: ${randomCode})`);
    } catch (error) {
      console.error('Error creating team:', error);
      window.alert('Failed to create team');
    }
  };
  return (
    <button className="create-button" onClick={handleCreateTeam}>Create Team</button>
  );
};

export default CreateTeam;