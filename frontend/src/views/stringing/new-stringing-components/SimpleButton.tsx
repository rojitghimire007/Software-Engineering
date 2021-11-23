import React from 'react';
import styles from './style-modules/simpleButtons.module.css';
import Button from '@mui/material/Button';

const SimpleButton = ({ btnName, btnStyle, buttonProps }: any) => {
  // const buttonInformation = { ...buttonProps };
  const buttonInformation = { ...buttonProps };
  const getButtonStyle = (style: any) => {
    if (style === 'refresh') return styles.refresh;
    else if (style === 'move') return styles.move;
    else if (style === 'add') return styles.add;
    else if (style === 'delete') return styles.delete;
    else {
      console.log('invalid style for button');
      return styles.unStyled;
    }
  };
  return (
    <div>
      {btnName != '' ? (
        <Button
          className={getButtonStyle(btnStyle)}
          disabled={buttonInformation.disabled}
          onClick={buttonInformation.onClick}
          //   color="success"
          size="small"
          variant="contained"
        >
          {!buttonInformation.disabled ? <>{btnName}</> : <>DISABLED</>}
        </Button>
      ) : (
        <Button>name missing</Button>
      )}
    </div>
  );
};

export default SimpleButton;
