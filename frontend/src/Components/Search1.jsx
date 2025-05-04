import './Search1.css';
import { useNavigate } from 'react-router-dom';

function Search(){
  const navigate = useNavigate();
  function gotoSearch(){
    navigate('/Integrated')
  }
  function gotoDiscussion(){
    navigate('/Chatbot');

  }
  function gotoDecision(){
    navigate('/Decision');

  }
  
  return (
    <div className='searchBar' >
      <input
        type="text"
        placeholder="   Search here"  

        className='searchInput'
        onClick={gotoSearch}
      />
      <button className='decisionButton' onClick={gotoDecision}>  

        
        Decision Facilitator
      </button>
      <button className='decisionButton' onClick={gotoDiscussion}>  

        
        Discussion Engine
      </button>
      <button className='searchButton'>  
        <div className='searchIcon'></div>

        
        Search
      </button>
      
    </div>
    
  );
};

export default Search;