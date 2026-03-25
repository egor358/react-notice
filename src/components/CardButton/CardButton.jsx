import './CardButton.css';

function CardButton({ children, className, ...props }) {
  //console.log({ ...props }); // onClick: ()=>setItem(item)
  const cl = 'card-button' + (className ? ' ' + className : '');
  return (
    <button {...props} className={cl}>
      {children}
    </button>
  );
}

export default CardButton;
