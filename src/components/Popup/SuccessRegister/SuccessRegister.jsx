import './SuccessRegister.css';

export function SuccessRegister(title, onClose) {
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