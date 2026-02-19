import './SuccessRegister.css';

export function SuccessRegister(props) {
  const {title, onClose, handleSuccessRegister} = props;
  const handleButtonClick = () => {
            if (handleSuccessRegister) {
                  handleSuccessRegister();
            }
            if (onClose) {
                  onClose();
            }
    }
    
  return (
    <>
      <h2 
      className="popup__succes-title" 
      id="popup--succes-title">{title}
      </h2>
      <a className="popup__succes--link" onClick={handleButtonClick}>
        Iniciar sesión
      </a>
      
    </>
  );
}