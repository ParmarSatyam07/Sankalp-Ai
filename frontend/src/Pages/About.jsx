import axios from "axios";
import './About.css';
import img2 from "../Bssets/SIH.jpg"
const About = () => {


  return (
    <>
    <div className="container">
    <div className='about-img'>
      <img src={img2} alt="" />
    </div>
    <div className="apicall">
    <button  className='btnn'>
                Prabha
            </button>
    </div>
    
    </div>
    
    </>
    
  )
}

export default About