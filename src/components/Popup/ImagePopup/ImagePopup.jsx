import ' ./ImagePopup.css';

export function ImagePopup(props) {
    const { name, link, onClose } = props;
  
  
    return (
    <>
      <img 
      className="popup__image-background" 
      id="popup--image-background" 
      src={link} 
      alt={name} 
      />
      
      <h2 
      className="popup__image-title" 
      id="popup--image-title">{name}
      </h2>
      
    </>
  );
}