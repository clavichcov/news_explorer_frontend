import './SuccessRegister.css';

export default function SuccessRegister(props) {
    const { title, link, onClose } = props;
  
    const handleButtonClick = () => {

    }
  
    return (
    <>
      <h2 
      className="popup__succes-title" 
      id="popup--succes-title">{title}
      </h2>
      <a className="popup__succes--link" onClick={handleButtonClick}>

      </a>
      
    </>
  );
}