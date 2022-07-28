import success from "../../images/success.svg";
import fail from "../../images/fail.svg";

function InfoTooltipUpdateUser(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className='popup__container'>
        <button
          className='popup__close-button link'
          type='button'
          aria-label='closePopup'
          onClick={props.onClose}
        ></button>
        <img className='popup__image-info' src={`${props.isUpdateUser ? success : fail}`} alt='' />
        <p className='popup__text'>{`${
          props.isUpdateUser ? "Данные профиля успешно обновлены" : "Что-то пошло не так!Попробуйте ещё раз."
        }`}</p>
      </div>
    </div>
  );
}

export default InfoTooltipUpdateUser;
