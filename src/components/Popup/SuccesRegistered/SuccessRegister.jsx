import './SuccessRegister.css';

export function SuccesRegister(props) {
    const { title, link, onClose } = props;
  
    handleButtonClick = () => {

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