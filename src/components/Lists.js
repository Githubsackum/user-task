import React, { useEffect, useState } from 'react';

function Lists() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Fetch lists from the API and update the state
    // This should be called only once when the component mounts
    const fetchLists = async () => {
      try {
        const response = await fetch('/api/lists');
        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLists();
  }, []);

  return (
    <div>
      <h1>Lists</h1>
      {lists.map((list) => (
        <div key={list.id}>
          <h3>{list.name}</h3>
          {/* Render tasks for each list */}
        </div>
      ))}
    </div>
  );
}

export default Lists;
